import { Link } from "react-router-dom";
import { useContext } from "react";
import CartCard from "../../components/cartCard/Card";
import Summary from "../../components/Summary";
import { CartContext } from "../../contexts/CartContext";
import "./Cart.css";

const Cart = () => {
  const { item } = useContext(CartContext);

  return (
    <div className="cart-wrapper">
      <div className="step-wrapper">
        <div className="step-title">1. Shopping Cart</div>
        <div className="step-inactive">2. Shipping Details</div>
        <div className="step-inactive">3. Payment Options</div>
      </div>

      <div className="cart-content">
        <h2 className="cart-title">Shopping Cart</h2>

        <div className="cart-items">
          {item?.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>

        <div className="summary-wrapper">
          <Summary />
        </div>

        <div className="button-wrapper">
          <Link to="/shipping">
            <button className="btn primary">Place Order</button>
          </Link>
          <Link to="/">
            <button className="btn secondary">Cancel all</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;