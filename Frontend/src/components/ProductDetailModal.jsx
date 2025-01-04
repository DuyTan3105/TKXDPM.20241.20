import React, { useContext, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../services/axiosInstance";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import styled from "styled-components";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
    margin: 0;
    padding: 1rem;
    border: 2px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    overflow-y: auto;
    //height: 100vh;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.25rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.125rem;
    margin-top: 1rem;
`;

const CloseButton = styled.button`
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #6b7280;
    color: white;
    border-radius: 0.375rem;
`;

const QuantityButton = styled.button`
    border: 1px solid #d1d5db;
    background-color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
`;

const QuantityInput = styled.input`
    border: 1px solid #d1d5db;
    padding: 0.25rem 0.5rem;
    width: 3rem;
    text-align: center;
    margin: 0 0.5rem;
`;

const AddToCartButton = styled.button`
    background-color: ${(props) => (props.disabled ? '#d1d5db' : '#6b7280')};
  color: ${(props) => (props.disabled ? '#9ca3af' : 'white')};
  font-weight: 600;
  padding: 0.25rem 0.75rem; /* Nhỏ lại */
  border-radius: 1.5rem;
  margin-top: 1rem;
  width: ${(props) => (props.disabled ? 'auto' : '100%')}; /* Nếu hết hàng thì không chiếm hết chiều rộng */
  display: block;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) =>
    props.disabled ? '#d1d5db' : '#4b5563'};
  }
`;

const ModalContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const ProductImage = styled.img`
    max-width: 50%;
    height: auto;
    margin-right: 2rem;
`;

const ProductInfo = styled.div`
    flex: 1;
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
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Product Details">
            <Title>Product Details</Title>
            <ModalContent>
                <ProductImage src={product.imageURL} alt={product.title} />
                <ProductInfo>
                    <p><strong>Title:</strong> {product.title}</p>
                    <p><strong>Import Price:</strong> {product.importPrice}</p>
                    <p><strong>Sell Price:</strong> {product.sellPrice}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Rush Delivery Support:</strong> {product.rushDeliverySupport ? "Yes" : "No"}</p>

                    {product.type === "book" && (
                        <>
                            <p><strong>Author:</strong> {product.author}</p>
                            <p><strong>Cover Type:</strong> {product.coverType}</p>
                            <p><strong>Publisher:</strong> {product.publisher}</p>
                            <p><strong>Publish Date:</strong> {product.publishDate}</p>
                            <p><strong>Number of Pages:</strong> {product.numOfPages}</p>
                            <p><strong>Language:</strong> {product.language}</p>
                            <p><strong>Book Category:</strong> {product.bookCategory}</p>
                        </>
                    )}

                    {product.type === "cd" && (
                        <>
                            <p><strong>Artist:</strong> {product.artist}</p>
                            <p><strong>Record Label:</strong> {product.recordLabel}</p>
                            <p><strong>Music Type:</strong> {product.musicType}</p>
                            <p><strong>Released Date:</strong> {product.releasedDate}</p>
                            <p><strong>Form:</strong> {product.form}</p>
                        </>
                    )}

                    {product.type === "dvd" && (
                        <>
                            <p><strong>Form:</strong> {product.form}</p>
                            <p><strong>Disc Type:</strong> {product.discType}</p>
                            <p><strong>Director:</strong> {product.director}</p>
                            <p><strong>Runtime:</strong> {product.runtime}</p>
                            <p><strong>Movie Category:</strong> {product.movieCategory}</p>
                        </>
                    )}

                    <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                        <QuantityButton onClick={decrementQty}>-</QuantityButton>
                        <QuantityInput type="number" value={qty} onChange={(e) => setQty(parseInt(e.target.value) || 1)} />
                        <QuantityButton onClick={incrementQty}>+</QuantityButton>
                    </div>

                    <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                </ProductInfo>
            </ModalContent>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <CloseButton type="button" onClick={onRequestClose}>Close</CloseButton>
            </div>
        </StyledModal>
    );
};

export default ProductDetailModal;
