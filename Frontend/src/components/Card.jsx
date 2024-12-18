import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import styled from "styled-components";

const CartCard = (props) => {
  const { product } = props;
  const { cartId, setItem, setTotalPrice } = useContext(CartContext);

  const handleChangeQuantity = (qty) => {
    if (product.quantity + qty > product.product.quantity) {
      toast.error("Out of stock");
      return;
    }
    if (product.quantity + qty < 1) {
      handleRemoveFromCart();
    } else {
      axios
        .post(
          `/cart/${cartId}/add?productId=${product.product.id}&quantity=${qty}`
        )
        .then((response) => {
          setItem(response.data.data.listCartItem);
          setTotalPrice(response.data.data.totalPrice);
          toast.success("Quantity updated");
        })
        .catch((error) => {
          console.error("Error updating quantity", error);
        });
    }
  };

  const handleRemoveFromCart = () => {
    axios
      .delete(`/cart/${cartId}/remove?productId=${product.product.id}`)
      .then((response) => {
        setItem(response.data.data.listCartItem);
        setTotalPrice(response.data.data.totalPrice);
        toast.success("Removed from cart");
      })
      .catch((error) => {
        console.error("Error removing from cart", error);
      });
  };

  return (
    <CardContainer>
      <ImageContainer>
        <img
          src={
            product.product.imageURL
              ? product.product.imageURL
              : "https://via.placeholder.com/150"
          }
          alt={product.product.title}
        />
      </ImageContainer>
      <ContentContainer>
        <ProductDetails>
          <p className="price">${product.product.sellPrice}</p>
          <h2 className="title">{product.product.title}</h2>
          <p className="stock">Stock: {product.product.quantity}</p>
        </ProductDetails>
        <ActionsContainer>
          <button onClick={() => handleChangeQuantity(-1)}>-</button>
          <div className="quantity">{product.quantity}</div>
          <button onClick={() => handleChangeQuantity(1)}>+</button>
          <button onClick={handleRemoveFromCart}>Remove from Cart</button>
        </ActionsContainer>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  width: fit-content;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 160px;
    width: 320px;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 24px;
  margin-top: 24px;
`;

const ProductDetails = styled.div`
  p {
    margin-bottom: 8px;
  }

  .price {
    color: #000;
    font-size: 1.5rem;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    width: 128px;
  }

  .stock {
    color: #6b7280;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 160px;
  margin-right: 40px;

  button {
    border: 1px solid #ccc;
    padding: 8px 12px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  .quantity {
    padding: 0 16px;
  }
`;

export default CartCard;
