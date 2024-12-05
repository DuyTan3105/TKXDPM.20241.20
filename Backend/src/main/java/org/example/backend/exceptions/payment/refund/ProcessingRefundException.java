package org.example.backend.exceptions.payment.refund;

import org.example.backend.exceptions.payment.PaymentException;

public class ProcessingRefundException extends PaymentException {
    public ProcessingRefundException() {
        super("Yêu cầu trùng lặp, duplicate request trong thời gian giới hạn của API");
    }
}
