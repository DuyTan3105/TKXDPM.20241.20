package org.example.backend.entities.invoice;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;
import org.example.backend.entities.BaseEntity;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.payment.PaymentTransaction;


@Entity
@Table(name = "invoices")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Invoice extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToOne
    @JoinColumn(name = "payment_transaction_id")
    private PaymentTransaction paymentTransaction;
}