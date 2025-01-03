import styled from "styled-components";
import Summary from "../components/Summary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { paymentApi } from "../services/paymentApi";

const Container = styled.div`
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`;

const Step = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  color: ${(props) => (props.active ? "#2563eb" : "#94a3b8")};
  transition: color 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background-color: #2563eb;
    transition: width 0.3s ease;
  }
`;

const Content = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PaymentSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const PaymentMethods = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
    background: #f8fafc;
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  label {
    margin-left: 12px;
    font-size: 1.1rem;
    color: #1e293b;
    cursor: pointer;
  }
`;

const PayLink = styled.a`
  display: block;
  padding: 16px 24px;
  background: #2563eb;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: 24px;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;


  button {
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    flex: 1;
    padding: 0.5rem;

    
    &:first-child {
      background: #2563eb;
      color: white;
      border: none;

      &:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }
    }

    &:nth-child(2) {
      background: #1e293b;
      color: white;
      border: none;

      &:hover {
        background: #0f172a;
        transform: translateY(-1px);
      }
    }
  }

  .cancel {
    background: white;
    color: red;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
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

    if(method === "DOMESTIC_CARD") {
      toast.error("Domestic Card is not supported yet");
      return;
    }

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
    console.log(formData);
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
        <PaymentSection>
          <PaymentMethods>Payment Methods</PaymentMethods>
          {url ? (
            <PayLink href={url} target="_blank" rel="noreferrer">
              Click here to pay
            </PayLink>
          ) : (
            <>
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
              <PaymentOption>
                <input
                  type="radio"
                  id="domesticCard"
                  name="paymentMethod"
                  value="DOMESTIC_CARD"
                  onChange={(e) => setMethod(e.target.value)}
                />
                <label htmlFor="domesticCard">Domestic Card</label>
              </PaymentOption>
            </>
          )}
        </PaymentSection>

        {/* Show this block only after a payment method is selected */}
        {method && (
          <PaymentSection>
            <Summary />
            <Actions>
              <button onClick={handlePayOrder}>Pay Order</button>
              <button onClick={handleRushOrder}>Place Rush Order</button>
              <button onClick={() => navigate("/")} className="cancel">Cancel</button>
            </Actions>
          </PaymentSection>
        )}
      </Content>
    </Container>
  );
};

export default Payment;
