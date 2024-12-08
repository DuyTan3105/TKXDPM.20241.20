package org.example.backend.services;

import jakarta.validation.Valid;
import org.example.backend.dtos.requests.TokenRequest;
import org.example.backend.dtos.requests.product.ProductDetalsRequest;
import org.example.backend.dtos.requests.product.ProductsByCategoryRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ProductService {
    ResponseEntity<AIMSResponse<Object>> getAllProduct(TokenRequest request);

    // New method to get products by category (BOOK, CD, DVD)
    ResponseEntity<AIMSResponse<Object>> getProductsByCategory(ProductsByCategoryRequest request);

    ResponseEntity<AIMSResponse<Object>> getProductDetails(ProductDetalsRequest request);

}
