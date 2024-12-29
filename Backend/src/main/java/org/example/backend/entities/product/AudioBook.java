package org.example.backend.entities.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AudioBook extends Product {
    private String author;
    private String format;
    private String language;
    private String accent;
    private int lengthInMinutes;
}
