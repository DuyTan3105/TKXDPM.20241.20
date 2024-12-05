package org.example.backend.repositories;

import org.example.backend.entities.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, String> {
}
