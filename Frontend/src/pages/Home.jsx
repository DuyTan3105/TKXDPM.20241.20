import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import axiosInstance from "../services/axiosInstance";
import ProductDetailModal from "../components/ProductDetailModal";
import { setItemsInLocalStorage } from "../utils";
import styled from "styled-components";
import { getAllProducts } from "../services/productApi";
import { createNewCart } from "../services/cartApi";

// Styled components
const Wrapper = styled.div`
  border-bottom: 1px solid #e5e7eb; /* Tailwind gray-300 */
  padding: 1rem 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 0 2rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 1.5rem;
  background-color: ${(props) => (props.active ? "#6b7280" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: ${(props) => (props.active ? "#6b7280" : "#f3f4f6")};
    cursor: pointer;
  }

  &:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
  }
`;

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10; // Số sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(currentPage - 1, itemsPerPage);
        if (response.code === 200 && response.data) {
          setProductData(response.data.data);
          setTotalPages(Math.ceil(response.data.total_items / itemsPerPage)); // Tính tổng số trang
        } else {
          console.error("Failed to fetch products:", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();

    // Check if cartId exists in localStorage, else create a new one
    if (!localStorage.getItem("cartId")) {

      const fetchNewCart = async () => {
        try {
          const response = await createNewCart();
          if (response.code === 200 && response.data) {
            setItemsInLocalStorage("cartId", response.data.id);
          } else {
            console.error("Failed to fetch cart ID:", response.message);
          }
        } catch (error) {
          console.error("Error fetching cart ID:", error);
        }
      }
      fetchNewCart();

    }
  }, [currentPage]); // Gọi lại API khi trang thay đổi

  const handleSort = (type) => {
    let sortedData = [...productData];
    if (type === "priceAsc") {
      sortedData.sort((a, b) => a.sellPrice - b.sellPrice);
    } else if (type === "priceDesc") {
      sortedData.sort((a, b) => b.sellPrice - a.sellPrice);
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

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

      <PaginationWrapper>
        <PaginationButton onClick={() => changePage(1)} disabled={currentPage === 1}>
          First
        </PaginationButton>
        <PaginationButton onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </PaginationButton>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <PaginationButton onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PaginationButton>
        <PaginationButton onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>
          Last
        </PaginationButton>
      </PaginationWrapper>

      <ProductDetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
    </Wrapper>
  );
};

export default Home;
