package org.example.backend.controllers;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.TokenRequest;
import org.example.backend.dtos.requests.product.ProductDetalsRequest;
import org.example.backend.dtos.requests.product.ProductsByCategoryRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.services.ProductService;
import org.example.backend.utils.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/get_all")
    public ResponseEntity<AIMSResponse<Object>> getAllProduct(@Valid @RequestBody TokenRequest request) {
        StringUtils.trimAllStringFields(request);

        return productService.getAllProduct(request);
    }

    @GetMapping("/get_by_category")
    public ResponseEntity<AIMSResponse<Object>> getProductsByCategory(@Valid @RequestBody ProductsByCategoryRequest request) {
        StringUtils.trimAllStringFields(request);

        return productService.getProductsByCategory(request);
    }

    @GetMapping("/get_product_details")
    public ResponseEntity<AIMSResponse<Object>> getProductDetails(@Valid @RequestBody ProductDetalsRequest request) {
        StringUtils.trimAllStringFields(request);

        return productService.getProductDetails(request);
    }
}
