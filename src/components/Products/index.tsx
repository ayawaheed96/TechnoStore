"use client";
import { useEffect, useState } from "react";
import { Product } from "../../../interfaces/Product";
import ProductCard from "../Cards/ProductCard";
import SearchBox from "../SearchBox/SearchBox";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";

type TCat = `all` | `men` | `jewelery` | `electronics` | `women`;

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchedTxt, setSearchedTxt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const categories = [
    `all`,
    `men's clothing`,
    `women's clothing`,
    `jewelery`,
    `electronics`,
  ];

  const searchProduct = () => {
    let result = products.filter((product) => {
      if (selectedCat !== "all") {
        return (
          product.title.toLowerCase().includes(searchedTxt.toLowerCase()) &&
          product.category === selectedCat
        );
      } else {
        return product.title.toLowerCase().includes(searchedTxt.toLowerCase());
      }
    });
    setProductsList(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setProductsList(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchedTxt) {
      setTimeout(() => {
        searchProduct();
      }, 1000);
    } else {
      if (selectedCat === "all") setProductsList(products);
    }
  }, [searchedTxt, selectedCat]);

  useEffect(() => {
    let res;
    if (selectedCat !== "all") {
      res = products.filter((product) => product.category === selectedCat);
    } else {
      res = products;
    }
    setProductsList(res);
  }, [selectedCat]);

  return (
    <>
      <BreadCrumb />
      {isLoading ? (
        <div className="w-full flex items-center justify-center my-4 text-xl font-medium text-[#333]">
          {" "}
          Loading ...
        </div>
      ) : (
        <>
          <div className="w-full flex lg:flex-row flex-col items-center justify-between mb-4 mt-2 gap-4 overflow-x-auto">
            <div className="lg:w-3/4 w-full flex items-center gap-1 overflow-x-auto">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`text-xl px-6 py-2 rounded-2xl shadow capitalize w-fit cursor-pointer ${
                    selectedCat === cat
                      ? "bg-blue-400 text-white hover:bg-blue-400"
                      : "text-blue-400  border border-blue-400"
                  } hover:bg-gray-100`}
                  onClick={() => setSelectedCat(cat)}
                >
                  {cat === `men's clothing`
                    ? "men"
                    : cat === "women's clothing"
                    ? "women"
                    : cat}
                </div>
              ))}
            </div>
            <SearchBox
              searchedTxt={searchedTxt}
              setSearchedTxt={setSearchedTxt}
            />
          </div>
          {productsList.length === 0 ? (
            <div className="w-full flex justify-center items-center my-2">
              <h2 className="text-xl font-bold">No Results Related</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {productsList.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsList;
