import React, { useContext, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../services/axiosInstance";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import styled from "styled-components";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.75rem;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin: 1rem 0;
  background: #f3f4f6;
  padding: 1rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const InfoItem = styled.p`
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
  
  strong {
    color: #4b5563;
    margin-right: 0.5rem;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  justify-content: center;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4b5563;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-align: center;
  margin: 0 0.75rem;
  font-size: 1rem;
  color: #1f2937;

  &:focus {
    outline: 2px solid #60a5fa;
    border-color: transparent;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
  margin: 1rem 0;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #374151;
  color: white;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #4b5563;
  }
`;

const ProductSection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
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
      <Title>{product.title}</Title>
      
      <ProductImage src={product.imageURL} alt={product.title} />
      
      <InfoGrid>
        <InfoItem>
          <strong>Import Price:</strong> ${product.importPrice}
        </InfoItem>
        <InfoItem>
          <strong>Sell Price:</strong> ${product.sellPrice}
        </InfoItem>
        <InfoItem>
          <strong>Quantity:</strong> {product.quantity}
        </InfoItem>
        <InfoItem>
          <strong>Rush Delivery:</strong> {product.rushDeliverySupport ? "Available" : "Not Available"}
        </InfoItem>
      </InfoGrid>
  
      {product.type === "book" && (
        <ProductSection>
          <SectionTitle>Book Details</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <strong>Author:</strong> {product.author}
            </InfoItem>
            <InfoItem>
              <strong>Cover Type:</strong> {product.coverType}
            </InfoItem>
            <InfoItem>
              <strong>Publisher:</strong> {product.publisher}
            </InfoItem>
            <InfoItem>
              <strong>Publish Date:</strong> {product.publishDate}
            </InfoItem>
            <InfoItem>
              <strong>Pages:</strong> {product.numOfPages}
            </InfoItem>
            <InfoItem>
              <strong>Language:</strong> {product.language}
            </InfoItem>
            <InfoItem>
              <strong>Category:</strong> {product.bookCategory}
            </InfoItem>
          </InfoGrid>
        </ProductSection>
      )}
  
      {product.type === "cd" && (
        <ProductSection>
          <SectionTitle>CD Details</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <strong>Artist:</strong> {product.artist}
            </InfoItem>
            <InfoItem>
              <strong>Record Label:</strong> {product.recordLabel}
            </InfoItem>
            <InfoItem>
              <strong>Music Type:</strong> {product.musicType}
            </InfoItem>
            <InfoItem>
              <strong>Released Date:</strong> {product.releasedDate}
            </InfoItem>
            <InfoItem>
              <strong>Form:</strong> {product.form}
            </InfoItem>
          </InfoGrid>
        </ProductSection>
      )}
  
      {product.type === "dvd" && (
        <ProductSection>
          <SectionTitle>DVD Details</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <strong>Form:</strong> {product.form}
            </InfoItem>
            <InfoItem>
              <strong>Disc Type:</strong> {product.discType}
            </InfoItem>
            <InfoItem>
              <strong>Director:</strong> {product.director}
            </InfoItem>
            <InfoItem>
              <strong>Runtime:</strong> {product.runtime}
            </InfoItem>
            <InfoItem>
              <strong>Category:</strong> {product.movieCategory}
            </InfoItem>
          </InfoGrid>
        </ProductSection>
      )}
  
      <QuantityContainer>
        <QuantityButton onClick={decrementQty}>-</QuantityButton>
        <QuantityInput
          type="number"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          min="1"
          max={product.quantity}
        />
        <QuantityButton onClick={incrementQty}>+</QuantityButton>
      </QuantityContainer>
  
      <AddToCartButton onClick={handleAddToCart}>
        Add to Cart - ${(product.sellPrice * qty).toFixed(2)}
      </AddToCartButton>
  
      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <CloseButton onClick={onRequestClose}>Close</CloseButton>
      </div>
    </StyledModal>
  );
};

export default ProductDetailModal;
