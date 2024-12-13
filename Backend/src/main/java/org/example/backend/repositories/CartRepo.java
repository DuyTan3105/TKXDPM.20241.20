package org.example.backend.repositories;

import org.example.backend.entities.cart.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CartRepo extends MongoRepository<Cart, String> {
}
