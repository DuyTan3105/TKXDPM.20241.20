import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import './App.css';
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Shipping from "./pages/Shipping";
import RushOrder from "./pages/RushOrder";
import OrderManager from "./pages/OrderManager";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <Router >
        <Routes>
          <Route path="/" element = {<Layout />} >
            <Route index element = {<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="rush-order" element={<RushOrder />} />
            {/* <Route path="payment" element={<Payment />} /> */}
            {/* <Route path="result" element={<Result />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="order" element={<OrderManager/>} />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
