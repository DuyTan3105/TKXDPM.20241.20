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
  max-width: 1000px;
  max-height: 90vh;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 2fr) 3fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 12px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
`;

const InfoItem = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: translateX(4px);
  }

  strong {
    color: #64748b;
    font-weight: 500;
  }

  span {
    color: #1e293b;
    font-weight: 600;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #2563eb;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: ${(props) => (props.disabled ? "#e2e8f0" : "#2563eb")};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.disabled ? "#e2e8f0" : "#1d4ed8")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const CloseButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
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
        setItem(response.data.listCartItem);
        setTotalPrice(response.data.totalPrice);
        toast.success("Added to cart");
      })
      .catch(() => {
        toast.error("Error adding to cart");
      });
  };

  if (!product) return null;

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
    >
        <>
        <Title>Product Details</Title>
        
        </>
      
      <ModalContent>
        <ProductImage src={product.imageURL} alt={product.title} />
        <ProductInfo>
          <InfoGrid>
            <InfoItem>
              <strong>Title:</strong>
              <span>{product.title}</span>
            </InfoItem>
            <InfoItem>
              <strong>Price:</strong>
              <span>${product.sellPrice}</span>
            </InfoItem>
            <InfoItem>
              <strong>Stock:</strong>
              <span>{product.quantity}</span>
            </InfoItem>
            <InfoItem>
              <strong>Rush Delivery:</strong>
              <span>
                {product.rushDeliverySupport ? "Available" : "Not Available"}
              </span>
            </InfoItem>

            {product.type === "book" && (
              <>
                <InfoItem>
                  <strong>Author:</strong>
                  <span>{product.author}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Cover Type:</strong>
                  <span>{product.coverType}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Publisher:</strong>
                  <span>{product.publisher}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Publish Date:</strong>
                  <span>{product.publishDate}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Pages:</strong>
                  <span>{product.numOfPages}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Language:</strong>
                  <span>{product.language}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Category:</strong>
                  <span>{product.bookCategory}</span>
                </InfoItem>
              </>
            )}

            {product.type === "cd" && (
              <>
                <InfoItem>
                  <strong>Artist:</strong>
                  <span>{product.artist}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Record Label:</strong>
                  <span>{product.recordLabel}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Music Type:</strong>
                  <span>{product.musicType}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Released Date:</strong>
                  <span>{product.releasedDate}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Form:</strong>
                  <span>{product.form}</span>
                </InfoItem>
              </>
            )}

            {product.type === "dvd" && (
              <>
                <InfoItem>
                  <strong>Form:</strong>
                  <span>{product.form}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Disc Type:</strong>
                  <span>{product.discType}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Director:</strong>
                  <span>{product.director}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Runtime:</strong>
                  <span>{product.runtime}</span>
                </InfoItem>
                <InfoItem>
                  <strong>Category:</strong>
                  <span>{product.movieCategory}</span>
                </InfoItem>
              </>
            )}
          </InfoGrid>

          <QuantityControl>
            <QuantityButton onClick={decrementQty}>-</QuantityButton>
            <QuantityInput
              type="number"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
            <QuantityButton onClick={incrementQty}>+</QuantityButton>
          </QuantityControl>

          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ModalContent>

      {/* <ButtonContainer>
        <CloseButton onClick={onRequestClose}>Close</CloseButton>
      </ButtonContainer> */}
    </StyledModal>
  );
};

export default ProductDetailModal;
