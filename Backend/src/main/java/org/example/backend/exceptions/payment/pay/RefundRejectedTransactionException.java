package org.example.backend.exceptions.payment.pay;

import org.example.backend.exceptions.payment.PaymentException;

public class RefundRejectedTransactionException extends PaymentException {
    public RefundRejectedTransactionException() {
        super("VNPAY: Giao dịch hoàn tiền bị từ chối");
    }
}
