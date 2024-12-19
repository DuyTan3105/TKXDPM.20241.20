import React, { useContext, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../services/axiosInstance";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";

const CardContainer = styled.div`
  background-color: #f3f4f6; /* Tailwind bg-gray-100 */
  border-radius: 0.5rem; /* Tailwind rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Tailwind shadow-md */
  padding: 1rem; /* Tailwind p-4 */
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 0.5rem; /* Tailwind rounded-lg */
  height: 15rem; /* Tailwind h-60 */
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem; /* Tailwind mt-6 */
  align-items: center;
`;

const ProductInfo = styled.div`
  h2 {
    font-size: 1.25rem; /* Tailwind text-xl */
    font-weight: 600; /* Tailwind font-semibold */
    margin-bottom: 0.5rem; /* Tailwind mb-2 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin-bottom: 0.5rem; /* Tailwind mb-2 */
    color: #4b5563; /* Tailwind text-gray-600 */
    font-size: 0.875rem; /* Tailwind text-sm */
  }

  .stock {
    font-size: 0.75rem; /* Tailwind text-xs */
    font-style: italic;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem; /* Tailwind mb-4 */

  button {
    background-color: #fff; /* Tailwind bg-white */
    border: 1px solid;
    padding: 0.25rem 0.5rem; /* Tailwind px-2 py-1 */
    border-radius: 0.25rem; /* Tailwind rounded */
  }

  input {
    border: 1px solid;
    padding: 0.25rem; /* Tailwind px-2 py-1 */
    width: 2.5rem; /* Tailwind w-10 */
    text-align: center;
    margin: 0 0.5rem; /* Tailwind mx-2 */
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Tailwind space-y-2 */

  button {
    font-weight: 600; /* Tailwind font-semibold */
    padding: 0.5rem 1rem; /* Tailwind py-2 px-4 */
    border-radius: 1.5rem; /* Tailwind rounded-3xl */
    height: 2.5rem; /* Tailwind h-10 */
  }

  .add-to-cart {
    background-color: #6b7280; /* Tailwind bg-gray-500 */
    color: #fff;
  }

  .view-detail {
    background-color: #3b82f6; /* Tailwind bg-blue-500 */
    color: #fff;
  }
`;

const ItemCard = (props) => {
  const { product, onViewDetail } = props; // Receive onViewDetail as a prop
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
      })
      .catch(() => {
        toast.error("Error adding to cart");
      });
  };

  return (
    <CardContainer>
      <ProductImage
        src={product.imageURL || "https://via.placeholder.com/150"}
        alt={product.title}
      />
      <ProductDetails>
        <ProductInfo>
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <p>${product.sellPrice}</p>
          <p className="stock">
            Stock: {product.quantity ? `Available(${product.quantity})` : "Out of stock"}
          </p>
        </ProductInfo>
        <div>
          <QuantityControls>
            <button onClick={decrementQty}>-</button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            />
            <button onClick={incrementQty}>+</button>
          </QuantityControls>
          <ActionButtons>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="view-detail" onClick={() => onViewDetail(product)}>
              View Detail
            </button>
          </ActionButtons>
        </div>
      </ProductDetails>
    </CardContainer>
  );
};

export default ItemCard;
