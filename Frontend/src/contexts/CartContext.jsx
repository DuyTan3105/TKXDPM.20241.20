import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CartContext = createContext([]);

export const CartProvider = ({ children }) => { 
    const cartId = "665440a6ce247243f9072091";

    const [item, setItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    useEffect(() => {
      axios.get("/cart/" + cartId)
        .then((response) => { 
          setItem(response.data.data.listCartItem);
          setTotalPrice(response.data.data.totalPrice);
        })
        .catch((error) => {
          console.error("Error getting cart: ", error);
        });
     }, []);


    return (
        <CartContext.Provider
          value={{ item, setItem, cartId, totalPrice, setTotalPrice, shippingPrice, setShippingPrice}}
        >
          {children}
        </CartContext.Provider>
      );

}