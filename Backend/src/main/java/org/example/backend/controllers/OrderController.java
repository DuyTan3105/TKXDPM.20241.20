package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.Constants;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.example.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    //Vấn đề: gửi cả DeliveryInfo lên là không cần thiết (Stamp Coupling)
    //Giải pháp: Chỉ cần gửi deliveryInfoId
    @PostMapping("/place-order")
    public ResponseEntity<AIMSResponse<Object>> placeOrder(@RequestParam String cartId, @RequestBody DeliveryInfo deliveryInfo) {
        Order order = orderService.createOrder(cartId, deliveryInfo);
        return ResponseUtil.success200Response("Place order successfully", order);
    }

    @GetMapping("/all")
    public ResponseEntity<AIMSResponse<Object>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseUtil.success200Response("Get all orders successfully", orders);
    }
    //Vấn đề: 3 hàm dưới đây gây ra logical cohesion
    //Giải pháp:  Gộp thành 1 phương thức duy nhất nhận status làm tham số
    /*
    @PutMapping("/update-status/{orderId}")
public ResponseEntity<AIMSResponse<Object>> updateOrderStatus(
    @PathVariable String orderId,
    @RequestParam OrderStatus status
) {
    Order order = orderService.updateStatusOrder(orderId, status);
    return ResponseUtil.success200Response(
        String.format("Update order status to %s successfully", status),
        order
    );
}
     */
    @PutMapping("/update-status/approve/{orderId}")
    public ResponseEntity<AIMSResponse<Object>> approveOrder(@PathVariable String orderId) {
        Order order =  orderService.updateStatusOrder(orderId, Constants.ORDER_STATUS_PROCESSING);
        return ResponseUtil.success200Response("Approve order successfully", order);
    }

    @PutMapping("/update-status/cancel/{orderId}")
    public ResponseEntity<AIMSResponse<Object>>  cancelOrder(@PathVariable String orderId) {
        Order order = orderService.updateStatusOrder(orderId, Constants.ORDER_STATUS_CANCELLED);
        return ResponseUtil.success200Response("Cancel order successfully", order);
    }

    @PutMapping("/update-status/reject/{orderId}")
    public ResponseEntity<AIMSResponse<Object>>  rejectOrder(@PathVariable String orderId) {
        Order order = orderService.updateStatusOrder(orderId, Constants.ORDER_STATUS_REJECTED);
        return ResponseUtil.success200Response("Reject order successfully", order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<AIMSResponse<Object>>  getOrder(@PathVariable String orderId) {
        Order order = orderService.getOrder(orderId);
        return ResponseUtil.success200Response("Get order successfully", order);
    }
}
