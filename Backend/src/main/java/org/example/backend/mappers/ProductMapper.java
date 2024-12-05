package org.example.backend.mappers;

import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {
    Product mapToEntity(CreateProductRequest req);

}
