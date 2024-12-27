import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Summary from "../components/Summary";
import { CartContext } from "../contexts/CartContext";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RegionDropdown } from "react-country-region-selector";
import { processString } from "../utils";
import { setItemsInLocalStorage } from "../utils";  
import styled from "styled-components";

const Shipping = () => {
  const { cartId, setShippingPrice, shippingPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const [isShippingData, setIsShippingData] = useState(false);
  const [initialProvince, setInitialProvince] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    address: "",
    instructions: "",
  });

  function selectRegion(val) {
    setFormData({
      ...formData,
      province: val,
    });

    if (isShippingData && val !== initialProvince) {
      setIsShippingData(false);
      setInitialProvince(val);
      toast.info("Province changed, please submit data again.");
    }
  }

  useEffect(() => {
    setShippingPrice(0);
  }, [setShippingPrice]);

  function handleRushOrder(e) {
    // e.preventDefault();
    for (const key in formData) {
      if (key === "instructions") continue; 
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
    } else { }
    navigate("/rush-order", { state: { formData: formData } });
  }

  const getShippingPrice = (e) => {
    e.preventDefault();
    for (const key in formData) {    
      if (key === "instructions") continue; 
      if (formData[key] === "") {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return;
      }
    }
    axiosInstance
      .get(
        `delivery-info/shipping-fee?province=${processString(
          formData.province
        )}&isRushDelivery=false`
      )
      .then((response) => {
        setIsShippingData(true);
        setInitialProvince(formData.province);
        toast.success("Shipping fee is " + response.data);
        setShippingPrice(response.data);
      })
      .catch((error) => {
        toast.error("Error placing order");
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (key === "instructions") continue; 
      if (formData[key] === "") {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return;
      }
    }
    axiosInstance
      .post(`order/place-order?cartId=${cartId}`, {
        receiverName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        province: formData.province,
        rushDelivery: false,
        instruction: formData.instructions,
        shippingFees: shippingPrice,
      })
      .then((response) => {
        setItemsInLocalStorage('orderId', response.data.orderId);
        toast.success("Order placed successfully");
        navigate("/payment", {
          state: {
            orderId: response.data.orderId,
            totalAmount: response.data.totalAmount,
            formData: formData
          },
        });
      })
      .catch((error) => {
        toast.error("Error placing order");
      });
  };

  return (
    <Wrapper>
      <StepIndicators>
        <Step>1. Shopping Cart</Step>
        <Step active>2. Shipping Details</Step>
        <Step>3. Payment Options</Step>
      </StepIndicators>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <Title>Delivery Form</Title>

            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Label htmlFor="province">Province</Label>
            <RegionDropdown
              country={"Vietnam"}
              value={formData.province}
              onChange={(val) => selectRegion(val)}
              defaultOptionLabel={"Select a province"}
              required
            />

            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <Label htmlFor="instructions">Shipping Instructions</Label>
            <TextArea
              id="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />

            <ActionButtons>
              {isShippingData ? (
                <Button type="submit">Place Order</Button>
              ) : (
                <Button onClick={getShippingPrice}>Submit data</Button>
              )}

              <Button onClick={handleRushOrder}>Place Rush Order</Button>

              <Link to="/">
                <CancelButton>Cancel all</CancelButton>
              </Link>
            </ActionButtons>
          </FormSection>

          <Summary />
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const StepIndicators = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Step = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.active ? 'black' : 'gray')};
`;

const FormContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const FormSection = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 12px 32px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
`;

export default Shipping;
