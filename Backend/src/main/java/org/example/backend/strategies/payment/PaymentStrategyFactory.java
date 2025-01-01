package org.example.backend.strategies.payment;

import org.example.backend.constants.enums.PaymentType;
import org.example.backend.exceptions.payment.PaymentException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PaymentStrategyFactory {
    private final Map<PaymentType, PaymentStrategy> strategies;

    public PaymentStrategyFactory(List<PaymentStrategy> paymentStrategies) {
        strategies = paymentStrategies.stream()
                .collect(Collectors.toMap(
                        PaymentStrategy::getType,
                        strategy -> strategy
                ));
    }

    public PaymentStrategy getStrategy(PaymentType type) {
        PaymentStrategy strategy = strategies.get(type);
        if (strategy == null) {
            throw new PaymentException("No strategy found for payment type: " + type);
        }
        return strategy;
    }
}
