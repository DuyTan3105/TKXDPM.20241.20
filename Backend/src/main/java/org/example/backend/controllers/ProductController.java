package org.example.backend.controllers;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.product.Product;
import org.example.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<AIMSResponse<Object>> getAllProducts(@RequestParam int page, @RequestParam int limit) {
        var products = productService.findAllProduct(page, limit);
        return ResponseUtil.success200Response("Get all products successfully", products);
    }

    @PostMapping("/create")
    public ResponseEntity<AIMSResponse<Object>> createMedia(@Valid @RequestBody CreateProductRequest request) {
        Product media = productService.createMedia(request);
        return ResponseUtil.success201Response("Create media successfully", media);
    }
}
