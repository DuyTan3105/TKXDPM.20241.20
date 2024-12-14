import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const StyledModal = styled(Modal)`
  margin: 1rem; /* Tailwind m-4 */
  padding: 1rem; /* Tailwind p-4 */
  border: 2px solid #d1d5db; /* Tailwind border-gray-300 */
  border-radius: 0.375rem; /* Tailwind rounded-md */
  background-color: #f9fafb; /* Tailwind bg-gray-50 */
  overflow-y: scroll;
  height: 80%; /* Tailwind h-4/5 */
`;

const Title = styled.h2`
  margin-bottom: 1rem; /* Tailwind mb-4 */
  font-weight: bold; /* Tailwind font-bold */
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem; /* Tailwind text-lg */
  margin-top: 1rem; /* Tailwind mt-4 */
`;

const CloseButton = styled.button`
  margin-right: 0.5rem; /* Tailwind mr-2 */
  padding: 0.5rem 1rem; /* Tailwind px-4 py-2 */
  background-color: #6b7280; /* Tailwind bg-gray-500 */
  color: white;
  border-radius: 0.375rem; /* Tailwind rounded-md */
`;

const OrderDetailPopup = ({ isOpen, closeModal, order }) => {
  if (!order) return null;

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Order Details"
    >
      <Title>Order Details</Title>
      <p>
        <strong>Order ID:</strong> {order.orderId}
      </p>
      <p>
        <strong>Cart ID:</strong> {order.cartId}
      </p>
      <p>
        <strong>Total Amount:</strong> {order.totalAmount}
      </p>
      <p>
        <strong>Status:</strong> {order.status.toUpperCase()}
      </p>

      <SectionTitle>Delivery Info</SectionTitle>
      <p>
        <strong>Receiver Name:</strong> {order.deliveryInfo.receiverName}
      </p>
      <p>
        <strong>Address:</strong> {order.deliveryInfo.address}
      </p>
      <p>
        <strong>Phone Number:</strong> {order.deliveryInfo.phoneNumber}
      </p>
      <p>
        <strong>Province:</strong> {order.deliveryInfo.province}
      </p>
      <p>
        <strong>Rush Delivery:</strong> {order.deliveryInfo.rushDelivery ? "Yes" : "No"}
      </p>
      {order.deliveryInfo.rushDeliveryTime && (
        <p>
          <strong>Rush Delivery Time:</strong> {order.deliveryInfo.rushDeliveryTime}
        </p>
      )}
      <p>
        <strong>Shipping Fees:</strong> {order.deliveryInfo.shippingFees}
      </p>
      <p>
        <strong>Instruction:</strong> {order.deliveryInfo.instruction}
      </p>

      <SectionTitle>Order Items</SectionTitle>
      {order.listOrderItem.map((item, index) => (
        <div key={index}>
          <p>
            <strong>Product:</strong> {item.product.title}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p>
            <strong>Price:</strong> {item.price}
          </p>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <CloseButton type="button" onClick={closeModal}>
          Close
        </CloseButton>
      </div>
    </StyledModal>
  );
};

export default OrderDetailPopup;
