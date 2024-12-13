package org.example.backend.entities.product;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DVD extends Product {
    String discType;
    String director;
    String runtime;
    String studio;
    String subtitles;
    Date releasedDate;
    String filmType;
}
