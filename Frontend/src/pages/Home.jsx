import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import ProductDetailModal from "../components/ProductDetailModal";
import { setItemsInLocalStorage } from "../utils";
import styled from "styled-components";

// Styled components
const Wrapper = styled.div`
  border-bottom: 4px solid #e5e7eb; /* Tailwind gray-300 */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb; /* Tailwind gray-300 */
`;

const SortButton = styled.button`
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  ${(props) =>
    props.active
      ? `background-color: #6b7280; color: white;` /* Tailwind gray-500 */
      : `border: 1px solid #e5e7eb;`};
`;

const ProductGrid = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2.5rem;
`;

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("/product/all")
      .then((response) => {
        if (response.status) {
          setProductData(response.data.data);
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });

    if (!localStorage.getItem("cartId")) {
      axios.get("/cart/new")
        .then((response) => {
          if (response.status) {
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
    <Wrapper>
      <Header>
        <Title>Products</Title>

        <SearchWrapper>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title"
          />
          <SortButton active={sortType === "default"} onClick={() => handleSort("default")}>
            Default
          </SortButton>
          <SortButton active={sortType === "priceAsc"} onClick={() => handleSort("priceAsc")}>
            Price Asc
          </SortButton>
          <SortButton active={sortType === "priceDesc"} onClick={() => handleSort("priceDesc")}>
            Price Desc
          </SortButton>
        </SearchWrapper>
      </Header>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product} onViewDetail={handleClickItemCard} />
        ))}
      </ProductGrid>

      <ProductDetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </Wrapper>
  );
};

export default Home;
