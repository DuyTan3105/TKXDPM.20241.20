package org.example.backend.repositories;

import org.example.backend.entities.order.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderItemRepo extends MongoRepository<OrderItem, String> {
}
