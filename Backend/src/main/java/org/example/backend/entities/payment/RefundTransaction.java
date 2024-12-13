package org.example.backend.entities.payment;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "refund_transaction")
public class RefundTransaction {
    @Id
    private String id;
    private String message;
    private String errorCode;
    private long amount;
    private String transactionContent;
}
