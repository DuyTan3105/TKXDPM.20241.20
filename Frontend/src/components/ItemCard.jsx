import React, { useContext, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../services/axiosInstance";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";

const CardContainer = styled.div`
  background-color: #ffffff; /* Nền trắng cho cảm giác chuyên nghiệp */
  border-radius: 0.75rem; /* Bo góc mềm mại hơn */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Đổ bóng mềm mại */
  padding: 1.5rem 1rem; /* Khoảng cách bên trong lớn hơn */
  display: flex;
  flex-direction: column; /* Xếp chồng theo chiều dọc */
  gap: 1rem; /* Khoảng cách giữa các thành phần */
  margin: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02); /* Hiệu ứng phóng to nhẹ khi hover */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  border-radius: 0.75rem;
  max-height: 15rem; /* Chiều cao tối đa của ảnh */
  object-fit: contain;
  width: 100%; /* Chiều rộng ảnh bằng với container */
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Khoảng cách giữa các phần thông tin */
`;

const ProductInfo = styled.div`
  align-items: center;
  h2 {
    font-size: 1.5rem; /* Cỡ chữ lớn hơn */
    font-weight: 700; /* Chữ đậm hơn */
    color: #1f2937; /* Màu đen nhạt */
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.25rem;
    color: #6b7280; /* Màu xám đậm hơn */
    font-size: 1rem; /* Cỡ chữ hợp lý hơn */
  }

  .stock {
    font-size: 0.875rem;
    font-style: italic;
    color: ${(props) =>
      props.inStock
        ? "#10b981"
        : "#ef4444"}; /* Màu xanh nếu còn hàng, đỏ nếu hết hàng */
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Khoảng cách giữa các nút */

  button {
    background-color: #e5e7eb; /* Nền xám nhạt */
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #d1d5db; /* Tô sáng khi hover */
    }
  }

  input {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    width: 3rem;
    text-align: center;
    border-radius: 0.25rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;

  button {
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    flex: 1;
    &:hover {
      transform: translateY(-2px);
    }
  }

  .add-to-cart {
    background-color: #3b82f6; /* Nền xanh */
    color: #ffffff;
    border: none;

    &:hover {
      background-color: #2563eb; /* Đậm hơn khi hover */
    }
  }

  .view-detail {
    background-color: #fbbf24; /* Nền vàng */
    color: #1f2937;
    border: none;

    &:hover {
      background-color: #f59e0b; /* Đậm hơn khi hover */
    }
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
          <div>
            <p>{product.category}</p>
            <p>${product.sellPrice}</p>
            <p className="stock">
              Stock:{" "}
              {product.quantity
                ? `Available(${product.quantity})`
                : "Out of stock"}
            </p>
          </div>
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
            <button
              className="view-detail"
              onClick={() => onViewDetail(product)}
            >
              View Detail
            </button>
          </ActionButtons>
        </div>
      </ProductDetails>
    </CardContainer>
  );
};

export default ItemCard;
