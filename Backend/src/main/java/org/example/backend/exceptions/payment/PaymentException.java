package org.example.backend.exceptions.payment;

public class PaymentException extends RuntimeException{
    public PaymentException(String message) {
        super(message);
    }
}
