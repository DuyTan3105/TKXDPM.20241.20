import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "../utils";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { convertToVND } from "../utils";
import styled from "styled-components";
const Container = styled.div``;

const StepHeader = styled.div`
  display: flex;
  padding: 0 10rem;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 0;
`;

const Step = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => (props.active ? "black" : "#D1D5DB")};
`;

const Content = styled.div`
  padding: 0 10rem;
`;

const ResultContainer = styled.div`
  font-weight: bold;
  margin: 2.5rem 0;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PaymentStatus = styled.div`
  font-size: 6rem;
`;

const Message = styled.div`
  font-size: 2rem;
  margin-top: 2.5rem;
`;

const Info = styled.div`
  margin-top: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10rem;
`;

const Button = styled.div`
  background-color: black;
  color: white;
  padding: 0.5rem 5rem;
  border-radius: 0.75rem;
  margin-right: 1rem;
  cursor: pointer;
  text-align: center;
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
          <PaymentStatus>PAYMENT RESULT</PaymentStatus>
          <Message>{vnp_ResponseCode === "00" ? "Successful" : "Failed"}</Message>
          {vnp_ResponseCode === "00" ? (
            <>
              <Info>Amount: {convertToVND(vnp_Amount / 100)}</Info>
              <Info>{vnp_OrderInfo}</Info>
              <Info>Date: {vnp_PayDate}</Info>
              <Info>Code: {vnp_BankTranNo}</Info>
            </>
          ) : null}
          <ButtonContainer>
            <Link to="/">
              <Button>Done</Button>
            </Link>
          </ButtonContainer>
        </ResultContainer>
      </Content>
    </Container>
  );
};

export default Result;
