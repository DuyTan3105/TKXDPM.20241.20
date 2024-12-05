package org.example.backend.exceptions.payment.refund;


import org.example.backend.exceptions.payment.PaymentException;

public class NotFoundTransactionException extends PaymentException {
    public NotFoundTransactionException() {
        super("Không tìm thấy giao dịch yêu cầu");
    }
}
