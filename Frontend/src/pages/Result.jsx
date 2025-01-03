import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "../utils";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { convertToVND } from "../utils";
import styled from "styled-components";
const Container = styled.div`
  background-color: #f8fafc;
  min-height: 100vh;
`;

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const ResultContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatusIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  border-radius: 50%;
  background: ${props => props.success ? '#22c55e' : '#ef4444'};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  &:before {
    content: "${props => props.success ? '✓' : '✕'}";
    color: white;
    font-size: 64px;
  }
`;

const PaymentStatus = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  animation: slideDown 0.5s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Message = styled.div`
  font-size: 1.5rem;
  margin: 16px 0;
  color: ${props => props.success ? '#15803d' : '#b91c1c'};
  font-weight: 600;
`;

const Info = styled.div`
  margin: 12px 0;
  padding: 12px;
  border-radius: 8px;
  color: #475569;
  font-size: 1.1rem;
  
  &:hover {
    background: #f1f5f9;
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
`;

const InfoSection = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 8px;
  margin: 24px 0;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    transform: translateY(-1px);
    border-radius: 8px;
  }
`;

const Label = styled.div`
  text-align: left;
  color: #64748b;
  font-weight: 500;
`;

const Value = styled.div`
  text-align: right;
  color: #1e293b;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  background-color: #2563eb;
  color: white;
  padding: 16px 48px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Result = () => {
  const { cartId, setItem } = useContext(CartContext);
  const location = useLocation();
  const [order, setOrder] = useState({});
  const orderId = getItemFromLocalStorage("orderId");
  const queryParams = new URLSearchParams(location.search);
  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
  const vnp_PayDate = queryParams.get("vnp_PayDate");
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");
  const vnp_BankCode = queryParams.get("vnp_BankCode");
  const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");

  console.log(vnp_BankCode, vnp_Amount, vnp_OrderInfo, vnp_PayDate, orderId, vnp_BankTranNo);

  useEffect(() => {
    axiosInstance
      .post("payment/save-payment-transaction", {
        orderId: orderId,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_Amount: vnp_Amount,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_PayDate: vnp_PayDate,
        vnp_TxnRef: vnp_TxnRef,
      })
      .then((response) => {
        axiosInstance
          .get(`order/${orderId}`)
          .then((response) => {
            setOrder(response.data.data);
            setItem([]);
          })
          .catch((error) => {
            console.log(error.data);
          });

        const invoice = {
          order,
          paymentTransaction: {
            orderId: orderId,
            vnp_ResponseCode: vnp_ResponseCode,
            vnp_TransactionNo: vnp_TransactionNo,
            vnp_Amount: vnp_Amount,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_TransactionStatus: vnp_TransactionStatus,
            vnp_PayDate: vnp_PayDate,
            vnp_TxnRef: vnp_TxnRef,
          },
        };

        axiosInstance
          .post("invoice/create", invoice)
          .then((response) => {
            if (vnp_ResponseCode === "00") {
              axiosInstance
                .post(`cart/${cartId}/clear`)
                .then((response) => {
                  removeItemFromLocalStorage("orderId");
                })
                .catch((error) => {
                  console.log(error.data);
                });
            }
          })
          .catch((error) => {
            console.log(error.data);
          });

        axiosInstance
          .post(`cart/${cartId}/clear`)
          .then((response) => {
            return;
          })
          .catch((error) => {
            console.log(error.data);
          });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [
    orderId,
    vnp_ResponseCode,
    vnp_TransactionNo,
    vnp_Amount,
    vnp_OrderInfo,
    vnp_TransactionStatus,
    vnp_PayDate,
    order,
    vnp_TxnRef,
    cartId,
    setItem,
  ]);

  return (
    <Container>
      <StepHeader>
        <Step>1. Shopping Cart</Step>
        <Step>2. Shipping Details</Step>
        <Step active>3. Payment Options</Step>
      </StepHeader>
  
      <Content>
        <ResultContainer>
          <StatusIcon success={vnp_ResponseCode === "00"} />
          <PaymentStatus>Payment Result</PaymentStatus>
          <Message success={vnp_ResponseCode === "00"}>
            {vnp_ResponseCode === "00" ? "Payment Successful" : "Payment Failed"}
          </Message>
          {vnp_ResponseCode === "00" && (
              <InfoSection>
              <InfoRow>
                <Label>Amount</Label>
                <Value>{convertToVND(vnp_Amount / 100)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Order Info</Label>
                <Value>{vnp_OrderInfo}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Date</Label>
                <Value>{vnp_PayDate}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Transaction Code</Label>
                <Value>{vnp_BankTranNo}</Value>
              </InfoRow>
            </InfoSection>
          )}
          <ButtonContainer>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </ButtonContainer>
        </ResultContainer>
      </Content>
    </Container>
  );
};

export default Result;
