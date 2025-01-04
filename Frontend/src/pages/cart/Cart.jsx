import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import CartCard from "../../components/cartCard/Card";
import Summary from "../../components/Summary";
import { CartContext } from "../../contexts/CartContext";

const Container = styled.div`
  padding: 40px;
  font-family: "Inter", sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const StepWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 48px;
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Step = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  color: ${(props) => (props.active ? "#2563eb" : "#94a3b8")};

  ${(props) =>
    props.active &&
    `
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #2563eb;
      transition: width 0.3s ease;
    }
  `}
`;

const Content = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const Items = styled.div`
  margin-bottom: 32px;
  flex: 1;
`;

const SummaryContainer = styled.div`
  background-color: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  margin-left: auto;
  border: 1px solid #e2e8f0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.primary
      ? `
    background-color: #2563eb;
    color: white;
    border: none;
    
    &:hover {
      background-color: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  `
      : `
    background-color: white;
    color: #475569;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
    }
  `}
`;

const Cart = () => {
  const { item } = useContext(CartContext);

  return (
    <Container>
      <StepWrapper>
        <Step active>1. Shopping Cart</Step>
        <Step>2. Shipping Details</Step>
        <Step>3. Payment Options</Step>
      </StepWrapper>

      <Content>
        <Title>Shopping Cart</Title>
        <div style={{display: "flex", justifyContent: "space-between", columnGap:"2rem"}}>
          <Items>
            {item?.map((product) => (
              <CartCard key={product.id} product={product} />
            ))}
          </Items>

          <SummaryContainer>
            <Summary />
            <ButtonWrapper>
              <Link to="/shipping">
                <Button primary>Place Order</Button>
              </Link>
              <Link to="/">
                <Button>Cancel all</Button>
              </Link>
            </ButtonWrapper>
          </SummaryContainer>
        </div>
      </Content>
    </Container>
  );
};

export default Cart;
