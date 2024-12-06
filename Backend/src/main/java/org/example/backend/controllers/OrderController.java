package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.enums.OrderStatus;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("${api.prefix}/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<AIMSResponse<Object>> placeOrder(@RequestParam String cartId, @RequestBody DeliveryInfo deliveryInfo) {
        return orderService.createOrder(cartId, deliveryInfo);
    }

    @GetMapping("/all")
    public ResponseEntity<AIMSResponse<Object>> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/update-status")
    public ResponseEntity<AIMSResponse<Object>> updateOrder(@RequestParam String orderId, @RequestParam OrderStatus status) {
        return orderService.updateStatusOrder(orderId, status);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<AIMSResponse<Object>>  getOrder(@PathVariable String orderId) {
        return orderService.getOrder(orderId);
    }
}
