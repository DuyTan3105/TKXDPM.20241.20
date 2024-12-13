package org.example.backend.repositories;

import org.example.backend.entities.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepo extends MongoRepository<Order, String> {
}
