import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import ProductDetailModal from "../components/ProductDetailModal";
import { setItemsInLocalStorage } from "../utils";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("/product/all")
      .then((response) => {
        if(response.status) {
          setProductData(response.data.data);
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
    if (!localStorage.getItem("cartId")) {
      axios.get("/cart/new")
      .then((response) => {
        if(response.status) {
          console.log("cart id: ", response.data.data.id);
          setItemsInLocalStorage("cartId", response.data.data.id);
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
    }
    console.log("cart id: ", localStorage.getItem("cartId"));
  }, []);

  const handleSort = (type) => {
    let sortedData = [...productData];
    if (type === "priceAsc") {
      sortedData.sort((a, b) => a.sellPrice - b.sellPrice);
    } else if (type === "priceDesc") {
      sortedData.sort((a, b) => b.sellPrice - a.sellPrice);
    } else if (type === "default") {
      // Implement your default sorting logic if needed
    }
    setProductData(sortedData);
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = productData.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickItemCard = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div css="border-b-4">
        <div css="flex justify-between px-10 py-5">
          <h1 css="text-2xl font-bold">Products</h1>

          <div css="space-x-2 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by title"
              css="border rounded-3xl py-2 px-4"
            />
            <button
              css={`font-bold py-2 px-4 rounded-3xl ${sortType === "default" ? "bg-gray-500 text-white" : "border"}`}
              onClick={() => handleSort("default")}
            >
              Default
            </button>
            <button
              css={`font-bold py-2 px-4 rounded-3xl ${sortType === "priceAsc" ? "bg-gray-500 text-white" : "border"}`}
              onClick={() => handleSort("priceAsc")}
            >
              Price Asc
            </button>
            <button
              css={`font-bold py-2 px-4 rounded-3xl ${sortType === "priceDesc" ? "bg-gray-500 text-white" : "border"}`}
              onClick={() => handleSort("priceDesc")}
            >
              Price Desc
            </button>
          </div>
        </div>
      </div>
      <div css="mt-20 grid grid-cols-4 gap-8 px-10">
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product} onViewDetail={handleClickItemCard} />
        ))}
      </div>
      <ProductDetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Home;
