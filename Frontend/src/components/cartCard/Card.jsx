import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import "./CardCart.css";

const CartCard = ({ product }) => {
  const { cartId, setItem, setTotalPrice } = useContext(CartContext);

  const handleChangeQuantity = (qty) => {
    if (product.quantity + qty > product.product.quantity) {
      toast.error("Out of stock");
      return;
    }
    if (product.quantity + qty < 1) {
      handleRemoveFromCart();
    } else {
      axiosInstance
        .post(`/cart/${cartId}/add?productId=${product.product.id}&quantity=${qty}`)
        .then((response) => {
          setItem(response.data.listCartItem);
          setTotalPrice(response.data.totalPrice);
          toast.success("Quantity updated");
        })
        .catch((error) => {
          console.error("Error updating quantity", error);
        });
    }
  };

  const handleRemoveFromCart = () => {
    axiosInstance
      .delete(`/cart/${cartId}/remove?productId=${product.product.id}`)
      .then((response) => {
        setItem(response.data.listCartItem);
        setTotalPrice(response.data.totalPrice);
        toast.success("Removed from cart");
      })
      .catch((error) => {
        console.error("Error removing from cart", error);
      });
  };

  return (
    <div className="card mb-3 shadow-sm border-light">
      <div className="row g-3">
        {/* Image Section */}
        <div className="col-md-3">
          <div className="card-img">
            <img
              src={product.product.imageURL || "https://via.placeholder.com/150"}
              alt={product.product.title}
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{product.product.title}</h5>
            <p className="card-text text-muted">{product.product.description}</p>
            <p className="card-text fw-bold text-primary">${product.product.sellPrice}</p>
            <p className="card-text text-secondary">Stock: {product.product.quantity}</p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="col-md-3 d-flex justify-content-end align-items-center">
          <div className="actions-container d-flex gap-3 align-items-center">
            {/* Smaller buttons */}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleChangeQuantity(-1)}
            >
              -
            </button>

            {/* Larger quantity */}
            <div className="quantity">{product.quantity}</div>

            {/* Smaller buttons */}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleChangeQuantity(1)}
            >
              +
            </button>

            {/* Remove button */}
            <button
              className="btn btn-outline-danger"
              onClick={handleRemoveFromCart}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
