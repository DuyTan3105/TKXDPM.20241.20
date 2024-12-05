package org.example.backend.entities.payment;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.example.backend.entities.BaseEntity;

@Entity
@Table(name = "refund_transactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefundTransaction extends BaseEntity {

    private String message;
    private String errorCode;
    private long amount;
    private String transactionContent;
}
