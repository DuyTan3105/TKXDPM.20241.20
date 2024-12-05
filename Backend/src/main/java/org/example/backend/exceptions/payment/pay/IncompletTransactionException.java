package org.example.backend.exceptions.payment.pay;


import org.example.backend.exceptions.payment.PaymentException;

public class IncompletTransactionException extends PaymentException {
    public IncompletTransactionException() {
        super("VNPAY: Giao dịch chưa hoàn tất");
    }
}
