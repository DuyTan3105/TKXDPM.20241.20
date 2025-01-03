package org.example.backend.strategies.payment;

import org.example.backend.constants.enums.PaymentType;

import java.io.IOException;
import java.util.Map;

public interface PaymentStrategy {
    String generateUrl(Map<String, Object> data) throws IOException;

    PaymentType getType();
}