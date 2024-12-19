package org.example.backend.services;

import org.example.backend.dtos.responses.Pagination;
import org.example.backend.entities.product.Product;

public interface ProductService {
    Pagination<Object> findAllProduct(int page, int limit);
    Product findProductById(String id);
}
