package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.Constants;
import org.example.backend.constants.enums.OrderStatus;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.order.OrderItem;
import org.example.backend.exceptions.DataNotFoundException;
import org.example.backend.repositories.CartRepo;
import org.example.backend.repositories.OrderItemRepo;
import org.example.backend.repositories.OrderRepo;
import org.example.backend.repositories.ProductRepo;
import org.example.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepo orderRepo;
    private final CartRepo cartRepo;
    private final ProductRepo productRepo;
    private final OrderItemRepo orderItemRepo;

    @Override
    public ResponseEntity<AIMSResponse<Object>> createOrder(String cartId, DeliveryInfo deliveryInfo) {
        try {
            var cart = cartRepo.findById(cartId).orElseThrow(() -> new DataNotFoundException("Cart not found with cartId: " + cartId));

            var newOrder = Order.builder().cart(cart).deliveryInfo(deliveryInfo).status(OrderStatus.PEDNING).build();
            // Lọc các sản phẩm không tồn tại
            List<OrderItem> orderItems = cart.getListCartItem().stream().filter(cartItem -> productRepo.existsById(cartItem.getProduct().getId())) // Check if product exists
                    .map(cartItem -> {
                        var orderItem = OrderItem.builder().product(cartItem.getProduct()).quantity(cartItem.getQuantity()).order(newOrder).price(cartItem.getProduct().getSellPrice()).build();
                        return orderItem;
                    }).collect(Collectors.toList());

            int totalAmount = orderItems.stream().mapToInt(item -> item.getQuantity() * item.getPrice()).sum();
            totalAmount += totalAmount * Constants.PERCENT_VAT/100  + deliveryInfo.getShippingFees();

            // Xử lý nếu không có sản phẩm hợp lệ
            if (orderItems.isEmpty()) {
                return ResponseUtil.error400Response("No valid product in cart");
            }
            newOrder.setListOrderItem(orderItems);
            newOrder.setTotalAmount(totalAmount);

            orderItemRepo.saveAll(orderItems);
            orderRepo.save(newOrder);

            return ResponseUtil.success201Response("Order created successfully", newOrder);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error while creating order");
        }
    }


    @Override
    public ResponseEntity<AIMSResponse<Object>> getAllOrders() {
        try {
            List<Order> orders = orderRepo.findAll();
            return ResponseUtil.success200Response("Orders retrieved successfully", orders);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error retrieving orders");
        }
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> updateStatusOrder(String orderId, OrderStatus orderStatusProcessing) {
        try {
            var order = orderRepo.findById(orderId).orElseThrow(() -> new DataNotFoundException("Order not found with orderId: " + orderId));

            order.setStatus(orderStatusProcessing);
            if(order.getStatus() == OrderStatus.PROCESSING) {
                order.getListOrderItem().forEach(orderItem -> {

                    try {
                        updateQuantityProduct(orderItem.getProduct().getId(), orderItem.getQuantity());
                    } catch (DataNotFoundException e) {
                        throw new RuntimeException(e);
                    }

                });
            }
            orderRepo.save(order);

            return ResponseUtil.success200Response("Order status updated successfully", order);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error updating order status");
        }
    }

    private void updateQuantityProduct(String id, int quantity) throws DataNotFoundException {

            var product = productRepo.findById(id).orElseThrow(() -> new DataNotFoundException("Product not found with id: " + id));

            product.setQuantity(product.getQuantity() - quantity);
            productRepo.save(product);

    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> getOrder(String orderId) {
        try {
            var order = orderRepo.findById(orderId).orElseThrow(() -> new DataNotFoundException("Order not found with orderId: " + orderId));

            return ResponseUtil.success200Response("Order retrieved successfully", order);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error retrieving order");
        }
    }
}
