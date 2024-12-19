import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
  margin: 1rem;
  padding: 1rem;
  border: 2px solid #d1d5db; /* Tailwind border-gray-300 */
  border-radius: 0.375rem; /* Tailwind rounded-md */
  background-color: #f9fafb; /* Tailwind bg-gray-50 */
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid #d1d5db; /* Tailwind border */
  padding: 0.25rem 0.5rem; /* Tailwind px-2 py-1 */
  margin-bottom: 0.5rem; /* Tailwind mb-2 */
  border-radius: 0.25rem; /* Tailwind rounded */
`;

const Button = styled.button`
  padding: 0.5rem 1rem; /* Tailwind px-4 py-2 */
  border-radius: 0.375rem; /* Tailwind rounded-md */
  color: white;
  font-weight: bold;
  cursor: pointer;

  ${(props) =>
    props.variant === "primary" &&
    `
      background-color: #10b981; /* Tailwind bg-green-500 */
      &:hover {
        background-color: #059669; /* Tailwind hover:bg-green-600 */
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    `
      background-color: #6b7280; /* Tailwind bg-gray-500 */
      &:hover {
        background-color: #4b5563; /* Tailwind hover:bg-gray-600 */
      }
    `}

  margin-top: ${(props) => (props.mt ? "0.5rem" : "0")};
`;

const EditPriceModal = ({ isOpen, onRequestClose, productId, fetchProducts, currentPrice }) => {
  const [newPrice, setNewPrice] = useState("");

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleEditPrice = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/product/update-price/${productId}?newPrice=${newPrice}`);
      toast.success("Price updated successfully!");
      onRequestClose();
      fetchProducts();
    } catch (error) {
      toast.error("Error updating price. Please try again.");
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Price"
    >
      <Title>Edit Price</Title>
      <Paragraph>Current selling price: {currentPrice}</Paragraph>
      <form onSubmit={handleEditPrice}>
        <Input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          placeholder="New Price"
          required
        />
        <Button type="submit" variant="primary">
          Update Price
        </Button>
      </form>
      <Button onClick={onRequestClose} variant="secondary" mt>
        Cancel
      </Button>
    </StyledModal>
  );
};

export default EditPriceModal;
