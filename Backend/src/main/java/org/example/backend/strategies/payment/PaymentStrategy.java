package org.example.backend.strategies.payment;

import org.example.backend.constants.enums.PaymentType;

import java.io.IOException;

public interface PaymentStrategy {
    String generateUrl(int amount, String orderId) throws IOException;

    PaymentType getType();
}