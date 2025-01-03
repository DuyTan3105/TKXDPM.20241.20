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
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 40px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 32px;
`;

const Step = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  color: ${(props) => (props.active ? "#2563eb" : "#94a3b8")};
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background-color: #2563eb;
    transition: width 0.3s ease;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const RushDeliveryForm = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TimeInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const TimeRangeText = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const InstructionsTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#2563eb" : "#1e293b")};
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${(props) => (props.primary ? "#1d4ed8" : "#0f172a")};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled.div`
  padding: 14px 32px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  color: red;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const RushOrder = () => {
  const { cartId, setShippingPrice, shippingPrice } = useContext(CartContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isShippingData, setIsShippingData] = useState(false);
  const [rushOrderData, setRushOrderData] = useState({
    ...state.formData,
    // fromTime: "",
    // toTime: "",
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
    if(rushOrderData.fromTime === "") {
      toast.error("From Time is required");
      return;
    }
    if(rushOrderData.toTime === "") {
      toast.error("To Time is required");
      return;
    }
    if(rushOrderData.instructions === "") {
      toast.error("Instructions are required");
      return;
    }
  
    axiosInstance
      .post(`order/place-order?cartId=${cartId}`, {
        receiverName: rushOrderData.name,
        phoneNumber: rushOrderData.phone,
        address: rushOrderData.address,
        province: rushOrderData.province,
        rushDelivery: true,
        instruction: rushOrderData.instructions,
        shippingFees: shippingPrice,
        rushDeliveryTime: rushOrderData.fromTime,
      })
      .then((response) => {
        setItemsInLocalStorage("orderId", response.data.orderId);
        toast.success("Order placed successfully");
        navigate("/payment", {
          state: {
            orderId: response.data.orderId,
            totalAmount: response.data.totalAmount,
            formData: rushOrderData,
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

      <ContentWrapper>
        <div>
          <RushDeliveryForm>
            <FormTitle>Rush Delivery Form</FormTitle>

            <FormGroup>
              <Label htmlFor="fromTime">Delivery Time</Label>
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
            </FormGroup>

            <FormGroup>
              <Label htmlFor="instructions">Shipping Instructions</Label>
              <InstructionsTextarea
                id="instructions"
                rows="4"
                value={rushOrderData.instructions}
                onChange={handleChange}
                placeholder="Enter any special instructions for delivery..."
              />
            </FormGroup>
          </RushDeliveryForm>

          <ButtonContainer>
            {isShippingData ? (
              <Button primary onClick={handleRushOrder}>
                Place Rush Order
              </Button>
            ) : (
              <Button primary onClick={getShippingPrice}>
                Calculate Shipping
              </Button>
            )}

            <Button onClick={() => navigate("/shipping")}>Normal Order</Button>

            <CancelButton onClick={() => navigate("/")}>Cancel</CancelButton>
          </ButtonContainer>
        </div>

        <Summary />
      </ContentWrapper>
    </Container>
  );
};

export default RushOrder;
