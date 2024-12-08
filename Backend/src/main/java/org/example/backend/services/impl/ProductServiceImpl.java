package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.TokenRequest;
import org.example.backend.dtos.requests.product.ProductDetalsRequest;
import org.example.backend.dtos.requests.product.ProductsByCategoryRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.dtos.responses.product.ProductOverviewResponse;
import org.example.backend.entities.product.Product;
import org.example.backend.mappers.ProductMapper;
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
    private final ProductMapper productMapper;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public ResponseEntity<AIMSResponse<Object>> getAllProduct(TokenRequest request) {
        String token = request.getToken();
        if (!jwtTokenUtil.validateToken(token)) {
            return ResponseUtil.errorValidationResponse("Invalid token");
        }
        List<Product> listProducts = productRepository.findAll();
        List<ProductOverviewResponse> response = listProducts.stream()
                .map(productMapper::mapToOverviewResponse)
                .collect(Collectors.toList());
        return ResponseUtil.success200Response("Get products sucessfully!", response);
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> getProductsByCategory(ProductsByCategoryRequest request) {
        String token = request.getToken();
        if (!jwtTokenUtil.validateToken(token)) {
            return ResponseUtil.errorValidationResponse("Invalid token");
        }
        String category = request.getCategory();
        // Validate category type
        if (!category.equals("BOOK") && !category.equals("CD") && !category.equals("DVD")) {
            // Return an error if the category is invalid
            return ResponseUtil.error404Response("Category not found!");
        }

        // Fetch products filtered by category
        List<Product> products = productRepository.findAll();
        List<ProductOverviewResponse> responses = products.stream()
                .filter(product -> product.getType().toUpperCase().equals(category))
                .map(productMapper::mapToOverviewResponse)
                .collect(Collectors.toList());

        return ResponseUtil.success200Response("Get products by category successfully", responses);
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> getProductDetails(ProductDetalsRequest request) {
        String token = request.getToken();
        if (!jwtTokenUtil.validateToken(token)) {
            return ResponseUtil.errorValidationResponse("Invalid token");
        }
        String product_id = request.getProduct_id();
        Optional<Product> product = productRepository.findById(product_id);
        if (product.isEmpty()) {
            return ResponseUtil.error400Response("Product not found");
        }

        return ResponseUtil.success200Response("Get products sucessfully!", product);
    }


}
