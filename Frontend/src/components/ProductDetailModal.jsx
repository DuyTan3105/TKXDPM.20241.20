import React, { useContext, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../services/axiosInstance";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import styled from "styled-components";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
  margin: 1rem; /* Tailwind m-4 */
  padding: 1rem; /* Tailwind p-4 */
  border: 2px solid #d1d5db; /* Tailwind border-gray-300 */
  border-radius: 0.375rem; /* Tailwind rounded-md */
  background-color: #f9fafb; /* Tailwind bg-gray-50 */
  overflow-y: scroll;
  height: 80%; /* Tailwind h-4/5 */
`;

const Title = styled.h2`
  margin-bottom: 1rem; /* Tailwind mb-4 */
  font-weight: bold; /* Tailwind font-bold */
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem; /* Tailwind text-lg */
  margin-top: 1rem; /* Tailwind mt-4 */
`;

const CloseButton = styled.button`
  margin-right: 0.5rem; /* Tailwind mr-2 */
  padding: 0.5rem 1rem; /* Tailwind px-4 py-2 */
  background-color: #6b7280; /* Tailwind bg-gray-500 */
  color: white;
  border-radius: 0.375rem; /* Tailwind rounded-md */
`;

const QuantityButton = styled.button`
  border: 1px solid #d1d5db; /* Tailwind border */
  background-color: white; /* Tailwind bg-white */
  padding: 0.25rem 0.5rem; /* Tailwind px-2 py-1 */
  border-radius: 0.375rem; /* Tailwind rounded */
`;

const QuantityInput = styled.input`
  border: 1px solid #d1d5db; /* Tailwind border */
  padding: 0.25rem 0.5rem; /* Tailwind px-2 py-1 */
  width: 2.5rem; /* Tailwind w-10 */
  text-align: center; /* Tailwind text-center */
  margin: 0 0.5rem; /* Tailwind mx-2 */
`;

const AddToCartButton = styled.button`
  background-color: #6b7280; /* Tailwind bg-gray-500 */
  color: white;
  font-weight: 600; /* Tailwind font-semibold */
  padding: 0.5rem 1rem; /* Tailwind py-2 px-4 */
  border-radius: 1.5rem; /* Tailwind rounded-3xl */
  margin-top: 1rem; /* Tailwind mt-4 */
`;

const ProductDetailModal = ({ isOpen, onRequestClose, product }) => {
  const { cartId, setItem, setTotalPrice } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  const incrementQty = () => {
    if (qty < product.quantity) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.quantity < qty) {
      toast.error("Out of stock");
      return;
    }

    axiosInstance
      .post(`/cart/${cartId}/add?productId=${product.id}&quantity=${qty}`)
      .then((response) => {
        setItem(response.data.data.listCartItem);
        setTotalPrice(response.data.data.totalPrice);
        toast.success("Added to cart");
        onRequestClose();
      })
      .catch((error) => {
        toast.error("Error adding to cart");
      });
  };

  if (!product) return null;

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Product Details">
      <Title>Product Details</Title>
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      <p>
        <strong>Import Price:</strong> {product.importPrice}
      </p>
      <p>
        <strong>Sell Price:</strong> {product.sellPrice}
      </p>
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p>
        <strong>Rush Delivery Support:</strong> {product.rushDeliverySupport ? "Yes" : "No"}
      </p>
      <img src={product.imageURL} alt={product.title} style={{ margin: "1rem 0", maxWidth: "100%", height: "auto" }} />

      {product.type === "book" && (
        <>
          <p>
            <strong>Author:</strong> {product.author}
          </p>
          <p>
            <strong>Cover Type:</strong> {product.coverType}
          </p>
          <p>
            <strong>Publisher:</strong> {product.publisher}
          </p>
          <p>
            <strong>Publish Date:</strong> {product.publishDate}
          </p>
          <p>
            <strong>Number of Pages:</strong> {product.numOfPages}
          </p>
          <p>
            <strong>Language:</strong> {product.language}
          </p>
          <p>
            <strong>Book Category:</strong> {product.bookCategory}
          </p>
        </>
      )}

      {product.type === "cd" && (
        <>
          <p>
            <strong>Artist:</strong> {product.artist}
          </p>
          <p>
            <strong>Record Label:</strong> {product.recordLabel}
          </p>
          <p>
            <strong>Music Type:</strong> {product.musicType}
          </p>
          <p>
            <strong>Released Date:</strong> {product.releasedDate}
          </p>
          <p>
            <strong>Form:</strong> {product.form}
          </p>
        </>
      )}

      {product.type === "dvd" && (
        <>
          <p>
            <strong>Form:</strong> {product.form}
          </p>
          <p>
            <strong>Disc Type:</strong> {product.discType}
          </p>
          <p>
            <strong>Director:</strong> {product.director}
          </p>
          <p>
            <strong>Runtime:</strong> {product.runtime}
          </p>
          <p>
            <strong>Movie Category:</strong> {product.movieCategory}
          </p>
        </>
      )}

      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
        <QuantityButton onClick={decrementQty}>-</QuantityButton>
        <QuantityInput
          type="number"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
        <QuantityButton onClick={incrementQty}>+</QuantityButton>
      </div>

      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <CloseButton type="button" onClick={onRequestClose}>
          Close
        </CloseButton>
      </div>
    </StyledModal>
  );
};

export default ProductDetailModal;
