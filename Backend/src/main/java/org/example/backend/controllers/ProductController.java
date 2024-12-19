package org.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}
