package org.example.backend.dtos.requests.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.backend.dtos.requests.TokenRequest;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductsByCategoryRequest extends TokenRequest {
    @NotNull
    @JsonProperty("category")
    private String category;
}
