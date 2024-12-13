package org.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.product.Product;
import org.example.backend.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<AIMSResponse<Object>> getAllProducts() {
        List<Product> products = productService.findAllProduct();
        return ResponseUtil.success200Response("Get all products successfully", products);
    }

}
