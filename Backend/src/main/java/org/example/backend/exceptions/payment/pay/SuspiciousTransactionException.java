package org.example.backend.exceptions.payment.pay;


import org.example.backend.exceptions.payment.PaymentException;

public class SuspiciousTransactionException extends PaymentException {
    public SuspiciousTransactionException() {
        super("VNPAY: Giao dịch nghi ngờ gian lận");
    }
}
