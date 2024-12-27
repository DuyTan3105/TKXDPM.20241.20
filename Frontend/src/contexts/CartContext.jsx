import { createContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const cartId = localStorage.getItem("cartId");

  const [item, setItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/cart/${cartId}`)
      .then((response) => {
        setItem(response.data.listCartItem);
        setTotalPrice(response.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        item,
        setItem,
        cartId,
        totalPrice,
        setTotalPrice,
        shippingPrice,
        setShippingPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
