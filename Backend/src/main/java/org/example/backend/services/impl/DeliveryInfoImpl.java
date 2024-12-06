package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.Constants;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.repositories.DeliveryInfoRepo;
import org.example.backend.services.DeliveryInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryInfoImpl implements DeliveryInfoService {
    private final DeliveryInfoRepo deliveryInfoRepo;
    @Override
    public ResponseEntity<AIMSResponse<Object>> createDeliveryInfo(DeliveryInfo deliveryInfo) {
        try {
            deliveryInfoRepo.save(deliveryInfo);
            return ResponseUtil.success201Response("Delivery info created successfully");
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error creating delivery info");
        }
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> getDeliveryInfo(String id) {
        try {
            DeliveryInfo deliveryInfo = deliveryInfoRepo.findById(id).orElse(null);
            if (deliveryInfo == null) {
                return ResponseUtil.error404Response("Delivery info not found");
            }
            return ResponseUtil.success200Response("Delivery info retrieved successfully", deliveryInfo);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error retrieving delivery info");
        }
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> calculateShippingFee(String province, boolean isRushDelivery) {
        int shippingFee = 0;
        for (String provinceName : Constants.NORTHERN_VIETNAM) {
            if (province.equalsIgnoreCase(provinceName)) {
                shippingFee = Constants.SHIPPING_FEE_NORTHERN_VIETNAM;
                break;
            }
        }
        if (province.equalsIgnoreCase("HaNoi") && isRushDelivery) {
            shippingFee = Constants.RUSH_SHIPPING_FEE;
        }
        for (String provinceName : Constants.CENTRAL_VIETNAM) {
            if (province.equalsIgnoreCase(provinceName)) {
                shippingFee = Constants.SHIPPING_FEE_CENTRAL_VIETNAM;
                break;
            }
        }
        for (String provinceName : Constants.SOUTHERN_VIETNAM) {
            if (province.equalsIgnoreCase(provinceName)) {
                shippingFee = Constants.SHIPPING_FEE_SOUTHERN_VIETNAM;
                break;
            }
        }
        return ResponseUtil.success200Response("Shipping fee calculated successfully", shippingFee);
    }
}
