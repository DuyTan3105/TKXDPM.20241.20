package org.example.backend.strategies.payment;

import org.example.backend.constants.enums.PaymentType;

import java.io.IOException;

public class DomesticCardStrategy implements PaymentStrategy {

    @Override
    public String generateUrl(int amount, String orderId) throws IOException {
        return "";
    }

    @Override
    public PaymentType getType() {
        return PaymentType.DOMESTIC_CARD;
    }

}
