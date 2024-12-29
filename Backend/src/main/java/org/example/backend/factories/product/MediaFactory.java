package org.example.backend.factories.product;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.Product;

public interface MediaFactory<T extends Product> {
    T createMedia();
    T createFromRequest(CreateProductRequest request);
}