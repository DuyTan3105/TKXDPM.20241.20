package org.example.backend.entities.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.backend.entities.BaseEntity;
@Entity
@Table(name = "credit_cards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CreditCard extends BaseEntity {
    private String cardNumber;
    private String cardHolder;
    private String expiredDate;
    private String cvv;
}
