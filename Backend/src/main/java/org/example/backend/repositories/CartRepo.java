package org.example.backend.repositories;

import org.example.backend.entities.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, String> {
}
