package org.example.backend.exceptions.payment.pay;

import org.example.backend.exceptions.payment.PaymentException;

public class ProcessingTransactionException extends PaymentException {
    public ProcessingTransactionException() {
        super("VNPAY: VNPAY đang xử lý giao dịch này (GD hoàn tiền)");
    }
}
