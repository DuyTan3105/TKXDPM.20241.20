package org.example.backend.services;

import org.example.backend.entities.product.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProduct();
    Product findProductById(String id);
}
