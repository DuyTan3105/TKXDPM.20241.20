package org.example.backend.exceptions.payment.pay;


import org.example.backend.exceptions.payment.PaymentException;

public class RefundRequestedTransactionException extends PaymentException {
    public RefundRequestedTransactionException() {
        super("VNPAY: VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)");
    }
}
