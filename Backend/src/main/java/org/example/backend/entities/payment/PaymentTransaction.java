package org.example.backend.entities.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.example.backend.entities.BaseEntity;

@Entity
@Table(name = "payment_transactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentTransaction extends BaseEntity {
    private String orderId;
    private String errorCode; // code response from bank
    private long amount;
    private String transactionNum;
    private String transactionContent;
    private String message;
    private String createdAt;
}
