package org.example.backend.dtos.requests.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.example.backend.constants.enums.MediaType;

public class AudioBookRequest extends CreateProductRequest {
    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "Format is required")
    private String format;

    @NotBlank(message = "Language is required")
    private String language;

    private String accent;

    @Min(value = 1, message = "Length must be positive")
    private int lengthInMinutes;

    AudioBookRequest(String title, int sellPrice, int quantity, String imageURL, boolean rushDeliverySupport, MediaType mediaType) {
        super(title, sellPrice, quantity, imageURL, rushDeliverySupport, mediaType);
    }
}
