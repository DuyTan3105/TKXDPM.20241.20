package org.example.backend.services;

import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.springframework.http.ResponseEntity;

public interface DeliveryInfoService {
    ResponseEntity<AIMSResponse<Object>>  createDeliveryInfo(DeliveryInfo deliveryInfo);
    ResponseEntity<AIMSResponse<Object>> getDeliveryInfo(String id);
    ResponseEntity<AIMSResponse<Object>> calculateShippingFee(String province, boolean isRushDelivery);
}
