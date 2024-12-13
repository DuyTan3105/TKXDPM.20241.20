package org.example.backend.entities.invoice;

import lombok.*;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.payment.PaymentTransaction;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "invoice")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
    @Id
    private String invoiceId;
    private Order order;
    private PaymentTransaction paymentTransaction;
}