package org.example.backend.strategies.payment;

import org.example.backend.constants.enums.PaymentType;

import java.io.IOException;
import java.util.Map;

public class DomesticCardStrategy implements PaymentStrategy {

    @Override
    public String generateUrl(Map<String, Object> data) throws IOException {
        return "";
    }

    @Override
    public PaymentType getType() {
        return PaymentType.DOMESTIC_CARD;
    }

}
