package org.example.backend.services;

import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.order.OrderItem;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DeliveryInfoService {
    ResponseEntity<AIMSResponse<Object>>  createDeliveryInfo(DeliveryInfo deliveryInfo);
    ResponseEntity<AIMSResponse<Object>> getDeliveryInfo(String id);
    ResponseEntity<AIMSResponse<Object>> calculateShippingFee(String cartId, String province, boolean isRushDelivery);
}
