package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.services.DeliveryInfoService;
import org.example.backend.utils.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/delivery-info")
@RequiredArgsConstructor
public class DeliveryInfoController {
    private final DeliveryInfoService deliveryInfoService;

    @PostMapping("/add")
    public ResponseEntity<AIMSResponse<Object>> createDeliveryInfo(DeliveryInfo request) {
        StringUtils.trimAllStringFields(request);
        return deliveryInfoService.createDeliveryInfo(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AIMSResponse<Object>> getDeliveryInfo(@PathVariable String id) {
        return deliveryInfoService.getDeliveryInfo(id);
    }

    @GetMapping("/shipping-fee")
    public ResponseEntity<AIMSResponse<Object>> calculateShippingFee(@RequestParam String province, @RequestParam boolean isRushDelivery) {
        return deliveryInfoService.calculateShippingFee(province, isRushDelivery);
    }
}
