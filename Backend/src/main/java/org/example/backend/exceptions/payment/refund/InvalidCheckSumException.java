package org.example.backend.exceptions.payment.refund;


import org.example.backend.exceptions.payment.PaymentException;

public class InvalidCheckSumException extends PaymentException {
    public InvalidCheckSumException() {
        super("Checksum không hợp lệ");
    }
}
