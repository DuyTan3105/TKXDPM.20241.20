package org.example.backend.mappers;

import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.dtos.responses.product.ProductOverviewResponse;
import org.example.backend.entities.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {
    Product mapToEntity(CreateProductRequest req);

    // Map Product entity to ProductOverviewResponse DTO
    ProductOverviewResponse mapToOverviewResponse(Product product);
}
