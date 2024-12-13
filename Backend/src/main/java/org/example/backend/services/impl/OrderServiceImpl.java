package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.Constants;
import org.example.backend.entities.cart.CartItem;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.order.OrderItem;
import org.example.backend.entities.product.Product;
import org.example.backend.exceptions.AIMSException;
import org.example.backend.exceptions.OrderNotFoundException;
import org.example.backend.repositories.CartRepo;
import org.example.backend.repositories.OrderItemRepo;
import org.example.backend.repositories.OrderRepo;
import org.example.backend.repositories.ProductRepo;
import org.example.backend.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepo orderRepository;
    private final CartRepo cartRepository;
    private final ProductRepo productRepository;
    private final OrderItemRepo orderItemRepository;
    private final CartServiceImpl cartService;


    @Override
    public Order createOrder(String cartId, DeliveryInfo deliveryInfo) {
        List<CartItem> cartItems = cartService.getAllCartItems(cartId);

        // Vấn đề: Việc chuyển đổi từ CartItem sang OrderItem, tính tổng giá, tính VAT và phí vận chuyển đang thực hiện trực tiếp trong phương thức.
        // Giải pháp: Chuyển các thao tác này vào trong class Order để tăng Cohesion, ví dụ: order.calculateTotalAmount().
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> new OrderItem(cartItem.getProduct(), cartItem.getQuantity(), cartItem.getProduct().getSellPrice()))
                .toList();
        int totalAmount = orderItems.stream().mapToInt(item -> item.getQuantity() * item.getPrice()).sum();
        totalAmount += totalAmount * Constants.PERCENT_VAT/100  + deliveryInfo.getShippingFees();
        Order order = new Order();
        order.setCartId(cartId);
        order.setListOrderItem(orderItems);
        order.setDeliveryInfo(deliveryInfo);
        order.setTotalAmount(totalAmount);
        order.setStatus(Constants.ORDER_STATUS_PENDING);
        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            return order;
        } else {
            throw new OrderNotFoundException("Order not found");
        }
    }

    @Override
    public Order updateStatusOrder(String orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null && order.getStatus().equals(Constants.ORDER_STATUS_PENDING)) {
            order.setStatus(status);
            if (status.equals(Constants.ORDER_STATUS_PROCESSING)) {
                // update the quantity of product by subtracting the quantity of product in the order
                order.getListOrderItem().forEach(orderItem -> {
                    updateQuantityProduct(orderItem.getProduct().getId(), orderItem.getQuantity());
                });
            }
            return orderRepository.save(order);
        } else {
            throw new OrderNotFoundException("Order not found");
        }
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    private void updateQuantityProduct(String productId, int quantity) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);
        } else {
            throw new AIMSException("Product not found");
        }
    }
}
