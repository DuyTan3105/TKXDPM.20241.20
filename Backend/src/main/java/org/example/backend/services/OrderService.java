package org.example.backend.services;

import org.example.backend.constants.enums.OrderStatus;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<AIMSResponse<Object>> createOrder(String cartId, DeliveryInfo deliveryInfo);

    ResponseEntity<AIMSResponse<Object>> getAllOrders();

    ResponseEntity<AIMSResponse<Object>> updateStatusOrder(String orderId, OrderStatus orderStatusProcessing);

    ResponseEntity<AIMSResponse<Object>> getOrder(String orderId);
}
