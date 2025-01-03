import styled from "styled-components";
import Summary from "../components/Summary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { paymentApi } from "../services/paymentApi";
const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Step = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.active ? "#000" : "#D1D5DB")};
`;

const Content = styled.div`
  padding: 0 40px;
`;

const PaymentMethods = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 40px 0;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  label {
    margin-left: 8px;
  }
`;

const PayLink = styled.a`
  display: inline-block;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  margin-top: 40px;
  background-color: #e5e7eb;
  border-radius: 8px;
  text-decoration: none;
  color: black;
`;

const Actions = styled.div`
  display: flex;
  padding-left: 40px;
  margin-top: 40px;

  button {
    background-color: black;
    color: white;
    padding: 10px 40px;
    border-radius: 8px;
    margin-right: 16px;
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #333;
    }
  }

  .cancel {
    padding: 10px 40px;
    border-radius: 8px;
    border: 1px solid #000;
    cursor: pointer;
    text-align: center;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderId, totalAmount, formData } = state;
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");

  async function handlePayOrder() {
    if (method === "") {
      toast.error("Please select a payment method");
      return;
    }

    // axiosInstance
    //   .get(`payment/pay?amount=${totalAmount}&orderId=${orderId}`)
    //   .then((response) => {
    //     setUrl(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.data);
    //   });
    const res = await paymentApi({ amount: totalAmount, orderId }, method);
    if (res && res.code === 200) {
      setUrl(res.data);
    } else toast.error("Failed to make payment", res.data);
  }

  function handleRushOrder(e) {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return;
      }
    }

    if (formData.province !== "Hà Nội") {
      toast.error("Rush delivery is only available in Hanoi");
      return;
    } else {
    }
    navigate("/rush-order", { state: { formData: formData } });
  }

  return (
    <Container>
      <Header>
        <Step>1. Shopping Cart</Step>
        <Step>2. Shipping Details</Step>
        <Step active>3. Payment Options</Step>
      </Header>
      <Content>
        <div>
          <PaymentMethods>Payment methods</PaymentMethods>
          {url ? (
            <PayLink href={url} target="_blank" rel="noreferrer">
              Click here to pay
            </PayLink>
          ) : (
            <PaymentOption>
              <input
                type="radio"
                id="vnpay"
                name="paymentMethod"
                value="VNPAY"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="vnpay">VnPay</label>
            </PaymentOption>
          )}
        </div>
        <Summary />
      </Content>
      <Actions>
        <button onClick={handlePayOrder}>Pay order</button>
        <button onClick={handleRushOrder}>Place Rush Order</button>
        <Link to="/">
          <div className="cancel">Cancel all</div>
        </Link>
      </Actions>
    </Container>
  );
};

export default Payment;
