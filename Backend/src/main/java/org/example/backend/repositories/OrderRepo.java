package org.example.backend.repositories;

import org.example.backend.entities.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, String> {
}
