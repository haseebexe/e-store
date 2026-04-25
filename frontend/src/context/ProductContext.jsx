import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProd, setNewProd] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const categoryQuery = category === "all" ? "" : category;
      const { data } = await axios.get(
        `${server}/api/product/all?search=${search}&category=${categoryQuery}&sortByPrice=${price}&page=${page}`,
      );

      setProducts(data.products);
      setNewProd(data.newProduct);
      setLoading(false);
      setTotalPages(data.totalPages);
      setCategories(data.categories);
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, category, page, price]);

  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  async function fetchProduct(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/product/${id}`);
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        newProd,
        search,
        setSearch,
        categories,
        category,
        setCategory,
        totalPages,
        price,
        setPrice,
        page,
        setPage,
        fetchProduct,
        product,
        relatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductData = () => useContext(ProductContext);
