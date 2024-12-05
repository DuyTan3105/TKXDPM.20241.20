package org.example.backend.repositories;

import org.example.backend.entities.cart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepo extends JpaRepository<CartItem, String> {
}
