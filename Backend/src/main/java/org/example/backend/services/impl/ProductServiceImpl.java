package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.Pagination;
import org.example.backend.entities.product.Product;
import org.example.backend.exceptions.ProductNotAvailableException;
import org.example.backend.repositories.ProductRepo;
import org.example.backend.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepository;

    @Override
    public Pagination<Object> findAllProduct(int page, int limit) {
        var pageAble = PageRequest.of(page, limit);
        Page<Product> products = productRepository.findAll(pageAble);
        return Pagination.builder().data(products.getContent()).totalPage(products.getTotalPages()).totalItems(products.getTotalElements()).build();
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
