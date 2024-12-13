package org.example.backend.entities.product;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CD extends Product {
    String artist;
    String recordLabel;
    String musicType;
    Date releasedDate;
    String form;
}
