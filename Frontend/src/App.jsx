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
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Shipping from "./pages/Shipping";
import RushOrder from "./pages/RushOrder";
import OrderManager from "./pages/OrderManager";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Payment from "./pages/Payment";
import Result from "./pages/Result";
// Import CSS cho toastify
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        {/* ToastContainer với các thiết lập phù hợp */}
        <ToastContainer
          position="top-right" // Vị trí hiển thị
          autoClose={3000} // Thời gian tự động đóng (ms)
          hideProgressBar={false} // Hiển thị thanh tiến trình
          newestOnTop={true} // Toast mới nhất xuất hiện ở trên
          closeOnClick // Đóng khi click
          rtl={false} // Không hiển thị từ phải sang trái
          pauseOnFocusLoss={false} // Không dừng khi mất tiêu điểm
          draggable // Kéo thả được
          pauseOnHover // Dừng khi hover vào
          theme="light" // Có thể đổi sang "dark"
          limit={3} // Giới hạn số lượng toast hiển thị đồng thời
        />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="rush-order" element={<RushOrder />} />
              <Route path="login" element={<Login />} />
              <Route path="order" element={<OrderManager />} />
              <Route path="payment" element={<Payment />} />
              <Route path="result" element={<Result />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
