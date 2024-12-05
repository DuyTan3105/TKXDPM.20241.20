package org.example.backend.entities.payment;

import org.example.backend.entities.BaseEntity;

public class CreditCard extends BaseEntity {
    private String cardNumber;
    private String cardHolder;
    private String expiredDate;
    private String cvv;
}
