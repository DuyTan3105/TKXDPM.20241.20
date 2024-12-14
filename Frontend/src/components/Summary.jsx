import { useContext } from "react";
import { CartContext } from "../providers/CartContext";
import { convertToVND } from "../utils";
import styled from "styled-components";

const SummaryWrapper = styled.div`
  margin-top: 2.5rem;
  width: 13rem; /* w-52 */
`;

const Title = styled.h1`
  font-weight: 700; /* font-bold */
`;

const Section = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => (props.mt ? "0.5rem" : "0")};
`;

const Total = styled.div`
  font-weight: 700; /* font-bold */
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Summary = (props) => {
  const { totalPrice, shippingPrice } = useContext(CartContext);

  const taxPrice = totalPrice / 10;
  const checkoutPrice = totalPrice + taxPrice + shippingPrice;

  return (
    <SummaryWrapper>
      <Title>Summary</Title>
      <Section>
        <Row>
          <div>Sub-total</div>
          <div className="font-bold">{convertToVND(totalPrice)}</div>
        </Row>
        <Row mt>
          <div>Tax (10%)</div>
          <div>{convertToVND(taxPrice)}</div>
        </Row>
        <Row mt>
          <div>Shipping fee</div>
          <div>{convertToVND(shippingPrice)}</div>
        </Row>
      </Section>
      <Total>
        <div>Total</div>
        <div>{convertToVND(checkoutPrice)}</div>
      </Total>
    </SummaryWrapper>
  );
};

export default Summary;
