import { Link } from "react-router-dom";
import { useContext } from "react";
import CartCard from "../components/CartCard";
import Summary from "../components/Summary";
import { CartContext } from "../providers/CartContext";
const Cart = () => {
  const { item } =  useContext(CartContext);

  return (
    <div>
      <div css="flex px-40 justify-between shadow-sm py-10">
        <div css="text-2xl font-bold">1. Shopping Cart</div>
        <h1 css="text-2xl font-bold text-gray-300	 ">
          2. Shipping Details
        </h1>
        <h1 css="text-2xl font-bold text-gray-300	">3. Payment Options</h1>
      </div>

      <div css="px-40 ">
        <div css="flex justify-between">
          <div>
            <div css=" font-bold my-10 text-xl">Shopping Cart</div>

            <div>
              {item?.map((product) => (
                <CartCard product={product} />
              ))}
            </div>
          </div>
          <Summary />
        </div>

        <div css="flex pl-10 mt-10">
          <Link to="/shipping">
            <div css="bg-black text-white px-20 py-2 rounded-xl mr-4">
              Place Order
            </div>
          </Link>

          <Link to="/">
            <div css="px-20 py-2 rounded-xl border">Cancel all</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
