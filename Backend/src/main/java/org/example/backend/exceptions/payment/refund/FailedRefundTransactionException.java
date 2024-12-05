package org.example.backend.exceptions.payment.refund;

import org.example.backend.exceptions.payment.PaymentException;

public class FailedRefundTransactionException extends PaymentException {
    public FailedRefundTransactionException() {
        super("Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầui");
    }
}
