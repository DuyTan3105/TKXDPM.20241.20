package org.example.backend.exceptions.payment.pay;

import org.example.backend.exceptions.payment.PaymentException;

public class ReversedTransactionException extends PaymentException {
    public ReversedTransactionException() {
        super("VNPAY: Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)");
    }
}
