package org.example.backend.entities.payment;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "credit_card")
public class CreditCard {
    private String cardNumber;
    private String cardHolder;
    private String expiredDate;
    private String cvv;
}
