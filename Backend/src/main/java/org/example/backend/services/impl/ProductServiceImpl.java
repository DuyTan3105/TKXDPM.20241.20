package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.TokenRequest;
import org.example.backend.dtos.requests.product.ProductDetalsRequest;
import org.example.backend.dtos.requests.product.ProductsByCategoryRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.dtos.responses.product.ProductOverviewResponse;
import org.example.backend.entities.product.Product;
import org.example.backend.exceptions.ProductNotAvailableException;
import org.example.backend.repositories.ProductRepo;
import org.example.backend.services.ProductService;
import org.example.backend.utils.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepository;

    @Override
    public List<Product> findAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product findProductById(String id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return product;
        } else {
            throw new ProductNotAvailableException("Product not found");
        }
    }
}
