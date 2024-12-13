import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import OrderDetailPopup from "../components/OrderDetailPopup";

Modal.setAppElement("#root");

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = () => {
    axios
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
    axios
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
    axios
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
    axios
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
    <div className="p-6">
      <h1 className="text-2xl mb-4">Order</h1>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Cart ID</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="h-16" key={order.id}>
              <td className="border px-4 py-2">{order.orderId}</td>
              <td className="border px-4 py-2">{order.cartId}</td>
              <td className="border px-4 py-2">{order.totalAmount}</td>
              <td className="border px-4 py-2">{order.status.toUpperCase()}</td>
              <td className="border px-4 py-2">
                {order.status === "pending" && (
                  <>
                    <button
                      className="border-2 rounded-2xl px-4 py-2 mr-2"
                      onClick={() => handleApproveOrder(order.orderId)}
                    >
                      Approve
                    </button>
                    <button
                      className="border-2 rounded-2xl px-4 py-2 mr-2"
                      onClick={() => handleRejectOrder(order.orderId)}
                    >
                      Reject
                    </button>
                    <button
                      className="border-2 rounded-2xl px-4 py-2 mr-2"
                      onClick={() => handleViewOrder(order.orderId)}
                    >
                      View
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isModalOpen}
          closeModal={closeModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrderManager;
