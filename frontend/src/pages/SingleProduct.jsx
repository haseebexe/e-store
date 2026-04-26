import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProductData } from "@/context/ProductContext";
import { useUserData } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Edit, Loader, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { categories } from "@/main";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { server } from "@/main";

const SingleProduct = () => {
  const { id } = useParams();
  const { fetchProduct, fetchProducts , product, relatedProducts, loading } = useProductData();
  const { isAuth, user } = useUserData();
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    addToCart(id);
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const updateHandler = () => {
    setShow(!show);
    setCategory(product.category);
    setTitle(product.title);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/product/${id}`,
        { title, description, price, stock, category },
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      toast.success(data.message);
      fetchProduct(id);
      setShow(false);
      setBtnLoading(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const [updatedImages, setUpdatedImages] = useState(null);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (!updatedImages || updatedImages.length === 0) {
      toast.error("Please select new images.");
      setBtnLoading(false);
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < updatedImages.length; i++) {
      formData.append("files", updatedImages[i]);
    }

    try {
      const { data } = await axios.post(
        `${server}/api/product/${id}`,
        formData,
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      toast.success(data.message);
      fetchProduct(id);
      fetchProducts();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-6 md:py-10">
          {user && user.role === "admin" && (
            <div className="w-[300px] md:w-[450px] m-auto mb-5">
              <Button onClick={updateHandler}>{show ? <X /> : <Edit />}</Button>
              {show && (
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      placeholder="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      requierd
                      className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                    >
                      {categories.map((e) => (
                        <option value={e} key={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Price</Label>
                    <Input
                      placeholder="Product Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>Stock</Label>
                    <Input
                      placeholder="Product Stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      requierd
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={btnLoading}
                    onClick={submitHandler}
                  >
                    {btnLoading ? <Loader /> : "Update Product"}
                  </Button>
                </div>
              )}
            </div>
          )}
          {product && (
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div className="w-full">
                <div className="rounded-2xl border bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images?.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 sm:aspect-[4/3]">
                            <img
                              src={item.url}
                              alt={product.title}
                              className="h-full w-full object-contain p-3 sm:p-5"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-2 bg-white/90 shadow-md hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 " />
                    <CarouselNext className="right-2 bg-white/90 shadow-md hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 " />
                  </Carousel>
                  {user && user.role === "admin" && (
                    <form
                      onSubmit={handleSubmitImage}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <Label>Upload New Images:</Label>
                        <input
                          type="file"
                          name="files"
                          id="files"
                          multiple
                          accept="image/*"
                          onChange={(e) => setUpdatedImages(e.target.files)}
                          className="block w-full mt-1 text-sm"
                        />
                      </div>
                      <Button type="submit" disabled={btnLoading}>
                        Update Image
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </div>

                  <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                    {product.title}
                  </h1>

                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Price
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                    Rs{" "}
                    {product.price?.toLocaleString("en-PK", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <div className="mt-4">
                    {isAuth ? (
                      product.stock <= 0 ? (
                        <p className="text-lg font-semibold text-red-600">
                          Out of stock
                        </p>
                      ) : (
                        <Button
                          size="lg"
                          className="w-full cursor-pointer rounded-xl py-5 text-base"
                          onClick={addToCartHandler}
                        >
                          Add to cart
                        </Button>
                      )
                    ) : (
                      <p className="rounded-xl bg-blue-50 px-4 py-3 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                        Please login to add something in cart
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Availability
                  </h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                    {product.stock > 0
                      ? `${product.stock} item${product.stock > 1 ? "s" : ""} available`
                      : "Currently unavailable"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {relatedProducts?.length > 0 && (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="mt-12 md:mt-16">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          Related Products
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          More items you might like
                        </p>
                      </div>
                    </div>

                    <Carousel
                      opts={{
                        align: "start",
                        loop: false,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-4">
                        {relatedProducts.filter((item) => item.stock > 0).map((item) => (
                          <CarouselItem
                            key={item._id}
                            className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                          >
                            <div className="h-full transition duration-300 hover:-translate-y-1">
                              <ProductCard product={item} latest="no" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      {/* SAME ARROWS */}
                      <CarouselPrevious className="left-2 hidden sm:flex bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700" />
                      <CarouselNext className="right-2 hidden sm:flex bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700" />
                    </Carousel>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
