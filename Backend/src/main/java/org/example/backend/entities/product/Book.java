package org.example.backend.entities.product;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book extends Product {
    String author;
    String coverType;
    String publisher;
    Date publishDate;
    int numOfPages;
    String language;
    String bookCategory;
}
