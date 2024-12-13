package org.example.backend.services;

import org.example.backend.constants.enums.OrderStatus;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    Order createOrder(String cartId, DeliveryInfo deliveryInfo);
    Order getOrder(String orderId);
    Order updateStatusOrder(String orderId, String status);
    List<Order> getAllOrders();
}
