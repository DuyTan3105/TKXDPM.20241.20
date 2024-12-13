package org.example.backend.repositories;

import org.example.backend.entities.cart.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartItemRepo extends MongoRepository<CartItem, String> {
}
