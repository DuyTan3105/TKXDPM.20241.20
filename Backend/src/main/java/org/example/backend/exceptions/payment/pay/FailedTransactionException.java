package org.example.backend.exceptions.payment.pay;


import org.example.backend.exceptions.payment.PaymentException;

public class FailedTransactionException extends PaymentException {
    public FailedTransactionException() {
        super("VNPAY: Giao dịch bị lỗi");
    }
}
