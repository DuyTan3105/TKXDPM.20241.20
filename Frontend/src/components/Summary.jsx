import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { convertToVND } from "../utils";
import styled from "styled-components";

const SummaryWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 320px;
  max-width: 400px;
  max-height: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const Section = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #e2e8f0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  margin-top: ${(props) => (props.mt ? "12px" : "0")};
  color: #475569;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    padding: 8px;
    margin: 0 -8px;
    border-radius: 8px;
  }

  div:last-child {
    font-weight: 500;
    color: #1e293b;
    font-size: 18px;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;

  div:last-child {
    color: #2563eb;
  }
`;

const Amount = styled.div`
  font-family: 'Roboto Mono', monospace;
  transition: color 0.2s ease;
`;
const Summary = (props) => {
  const { totalPrice, shippingPrice } = useContext(CartContext);

  const taxPrice = totalPrice / 10;
  const checkoutPrice = totalPrice + taxPrice + shippingPrice;

  return (
    <SummaryWrapper>
      <Title>Order Summary</Title>
      <Section>
        <Row>
          <div>Subtotal</div>
          <Amount>{convertToVND(totalPrice)}</Amount>
        </Row>
        <Row mt>
          <div>Tax (10%)</div>
          <Amount>{convertToVND(taxPrice)}</Amount>
        </Row>
        <Row mt>
          <div>Shipping fee</div>
          <Amount>{convertToVND(shippingPrice)}</Amount>
        </Row>
      </Section>
      <Total>
        <div>Total</div>
        <Amount>{convertToVND(checkoutPrice)}</Amount>
      </Total>
    </SummaryWrapper>
  );
};

export default Summary;
