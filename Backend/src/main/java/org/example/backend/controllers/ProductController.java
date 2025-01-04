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

    // Vấn đề: vi phạm tính O trong SOLID và control coupling
    // Giải pháp: tạo một phương thức createMedia chung và áp dụng factory pattern method
    // Giải pháp hiện đã được triển khai
    @PostMapping("/create")
    public ResponseEntity<AIMSResponse<Object>> createMedia(@Valid @RequestBody CreateProductRequest request) {
//        if(request.getMediaType() == MediaType.BOOK) {
//            Product Media = productService.createBook(request);
//        } else if(request.getMediaType() == MediaType.CD) {
//            Product Media = productService.createCD(request);
//        } else if(request.getMediaType() == MediaType.AUDIO_BOOK) {
//            Product Media = productService.createẠudioBook(request);
//        }
        Product media = productService.createMedia(request);
        return ResponseUtil.success201Response("Create media successfully", media);
    }
}
