package org.example.backend.dtos.requests.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.example.backend.constants.enums.MediaType;

@Data
@Builder
public class CreateProductRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @Min(value = 0, message = "Price must be positive")
    private int sellPrice;

    @Min(value = 0, message = "Quantity must be positive")
    private int quantity;

    private String imageURL;
    private boolean rushDeliverySupport;
    private MediaType mediaType;
}
