import { Link } from "react-router-dom";
import { useContext } from "react";
import CartCard from "../components/CartCard";
import Summary from "../components/Summary";
import { CartContext } from "../providers/CartContext";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2.5rem 10rem;
`;

const StepWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 0;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const StepTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StepInactive = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d1d5db; /* Tailwind gray-300 */
`;

const CartWrapper = styled.div`
  padding-left: 10rem;
`;

const CartTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2.5rem 0;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-left: 2.5rem;
  margin-top: 2.5rem;
`;

const Button = styled.div`
  padding: 0.5rem 5rem;
  border-radius: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;

  &:first-child {
    background-color: black;
    color: white;
  }

  &:last-child {
    padding: 0.5rem 5rem;
    border: 1px solid black;
  }
`;

const Cart = () => {
  const { item } = useContext(CartContext);

  return (
    <div>
      <StepWrapper>
        <StepTitle>1. Shopping Cart</StepTitle>
        <StepInactive>2. Shipping Details</StepInactive>
        <StepInactive>3. Payment Options</StepInactive>
      </StepWrapper>

      <CartWrapper>
        <CartTitle>Shopping Cart</CartTitle>

        <div>
          {item?.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>

        <FlexRow>
          <Summary />
        </FlexRow>

        <ButtonWrapper>
          <Link to="/shipping">
            <Button>Place Order</Button>
          </Link>

          <Link to="/">
            <Button>Cancel all</Button>
          </Link>
        </ButtonWrapper>
      </CartWrapper>
    </div>
  );
};

export default Cart;
