package org.example.backend.repositories;

import org.example.backend.entities.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, String> {
}
