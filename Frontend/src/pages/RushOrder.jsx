import Summary from "../components/Summary";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import { processString } from "../utils";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { setItemsInLocalStorage } from "../utils";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 0 10rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 0;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Step = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => (props.active ? "#000" : "#D1D5DB")};
`;

const RushDeliveryForm = styled.div`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TimeInputContainer = styled.div`
  display: flex;
`;

const TimeInput = styled.input`
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
`;

const TimeRangeText = styled.div`
  margin: 0 1rem;
  font-size: 1rem;
`;

const InstructionsTextarea = styled.textarea`
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  padding: 1rem 5rem;
  border-radius: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }
`;

const CancelButton = styled.div`
  padding: 1rem 5rem;
  border-radius: 1rem;
  border: 1px solid #000;
  cursor: pointer;
`;

const RushOrder = () => {
  const { cartId, setShippingPrice, shippingPrice } = useContext(CartContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isShippingData, setIsShippingData] = useState(false);
  const [rushOrderData, setRushOrderData] = useState({
    ...state.formData,
    fromTime: "",
    toTime: "",
    instructions: state.formData.instructions,
  });

  const getShippingPrice = (e) => {
    e.preventDefault();
    if (rushOrderData.fromTime === "") {
      toast.error("From Time is required");
      return;
    }
    axiosInstance
      .get(
        `delivery-info/shipping-fee?cartId=${cartId}&province=${processString(
          state.formData.province
        )}&isRushDelivery=true`
      )
      .then((response) => {
        setIsShippingData(true);
        toast.success("Shipping fee is " + response.data);
        setShippingPrice(response.data);
      })
      .catch((error) => {
        toast.error("Error placing order");
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newToTime = rushOrderData.toTime;

    if (id === "fromTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const endTime = new Date();
      endTime.setHours(hours + 2, minutes);
      newToTime = endTime.toTimeString().slice(0, 5);
    }

    setRushOrderData({
      ...rushOrderData,
      [id]: value,
      toTime: newToTime,
    });
  };

  const handleRushOrder = () => {
    // Implement the rush order handling logic
    axiosInstance
      .post(`order/place-order?cartId=${cartId}`, {
        receiverName: rushOrderData.name,
        phoneNumber: rushOrderData.phone,
        address: rushOrderData.address,
        province: rushOrderData.province,
        rushDelivery: true,
        instruction: rushOrderData.instructions,
        shippingFees: shippingPrice,
        rushDeliveryTime: rushOrderData.fromTime
      })
      .then((response) => {
        setItemsInLocalStorage('orderId', response.data.orderId);
        toast.success("Order placed successfully");
        navigate("/payment", {
          state: {
            orderId: response.data.orderId,
            totalAmount: response.data.totalAmount,
            formData: rushOrderData
          },
        });
      })
      .catch((error) => {
        toast.error("Error placing order");
      });
  };

  return (
    <Container>
      <StepIndicator>
        <Step>1. Shopping Cart</Step>
        <Step active>2. Shipping Details</Step>
        <Step>3. Payment Options</Step>
      </StepIndicator>

      <div>
        <div>
          <RushDeliveryForm>
            <div className="font-bold text-xl my-10">Rush Delivery Form</div>
            <div>
              <Label htmlFor="fromTime">Time</Label>
              <TimeInputContainer>
                <TimeInput
                  id="fromTime"
                  type="time"
                  value={rushOrderData.fromTime}
                  onChange={handleChange}
                />
                <TimeRangeText>to</TimeRangeText>
                <TimeInput
                  id="toTime"
                  type="time"
                  value={rushOrderData.toTime}
                  readOnly
                />
              </TimeInputContainer>
            </div>

            <div>
              <Label htmlFor="instructions">Shipping Instructions</Label>
              <InstructionsTextarea
                id="instructions"
                rows="4"
                value={rushOrderData.instructions}
                onChange={handleChange}
              />
            </div>
          </RushDeliveryForm>
          <Summary />
        </div>

        <div style={{ display: "flex", marginTop: "2rem" }}>
          {isShippingData ? (
            <Button onClick={handleRushOrder}>Place Order</Button>
          ) : (
            <Button onClick={getShippingPrice}>Submit data</Button>
          )}

          <Link to="/shipping">
            <Button>Place Normal Order</Button>
          </Link>

          <Link to="/">
            <CancelButton>Cancel all</CancelButton>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default RushOrder;
