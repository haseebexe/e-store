import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useProductData } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const Products = () => {
  const [show, setShow] = useState(false);
  const {
    products,
    loading,
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
  } = useProductData();

  const clearFilter = () => {
    setSearch("");
    setPrice("");
    setCategory("all");
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [search, category, price, setPage]);

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
        ${show ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="p-4 relative">
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 md:hidden"
          >
            <X />
          </button>

          <h2 className="text-lg font-bold mb-2">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              type="text"
              placeholder="Search Title"
              className="w-full p-2 border round-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <Select value={price} onValueChange={(value) => setPrice(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="lowToHigh">Low to High</SelectItem>
                  <SelectItem value="highToLow">High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-2" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <button
          onClick={() => setShow(true)}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          <Filter />
        </button>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.length > 0 ? (
                products.map((i) => (
                  <ProductCard key={i._id} product={i} latest="no" />
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-30">
                  <h3 className="text-xl text-center">
                    No products match your search results
                  </h3>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          prevPage();
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {page > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page - 1);
                          }}
                        >
                          {page - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {page}
                      </PaginationLink>
                    </PaginationItem>

                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                          }}
                        >
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {page + 1 < totalPages && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          nextPage();
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;