import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import OrderDetailPopup from "../components/OrderDetailPopup";
import styled from "styled-components";

Modal.setAppElement("#root");

// Styled components
const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  table-layout: auto;
`;

const TableHeader = styled.th`
  padding: 0.5rem 1rem;
`;

const TableRow = styled.tr`
  height: 4rem;
`;

const TableCell = styled.td`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb; /* Gray-300 */
`;

const ActionButton = styled.button`
  border: 2px solid #e5e7eb;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6; /* Tailwind gray-100 */
  }
`;

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = () => {
    axiosInstance
      .get("/order/all")
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleApproveOrder = (id) => {
    axiosInstance
      .put(`order/update-status/approve/${id}`)
      .then((response) => {
        fetchBooks();
        toast.success("Order approved successfully");
      })
      .catch((error) => {
        console.error("Error approving order: ", error);
      });
  };

  const handleRejectOrder = (id) => {
    axiosInstance
      .put(`order/update-status/reject/${id}`)
      .then((response) => {
        fetchBooks();
        toast.success("Order rejected successfully");
      })
      .catch((error) => {
        console.error("Error rejecting order: ", error);
      });
  };

  const handleViewOrder = (id) => {
    axiosInstance
      .get(`order/${id}`)
      .then((response) => {
        setSelectedOrder(response.data.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching order: ", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <Title>Order</Title>

      <Table>
        <thead>
          <tr>
            <TableHeader>Id</TableHeader>
            <TableHeader>Cart ID</TableHeader>
            <TableHeader>Total Amount</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.cartId}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.status.toUpperCase()}</TableCell>
              <TableCell>
                {order.status === "pending" && (
                  <>
                    <ActionButton onClick={() => handleApproveOrder(order.orderId)}>
                      Approve
                    </ActionButton>
                    <ActionButton onClick={() => handleRejectOrder(order.orderId)}>
                      Reject
                    </ActionButton>
                    <ActionButton onClick={() => handleViewOrder(order.orderId)}>
                      View
                    </ActionButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isModalOpen}
          closeModal={closeModal}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default OrderManager;
