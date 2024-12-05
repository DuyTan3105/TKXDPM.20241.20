package org.example.backend.exceptions.payment.refund;


import org.example.backend.exceptions.payment.PaymentException;

public class InvalidIdentifierCodeException extends PaymentException {
    public InvalidIdentifierCodeException() {
        super("Mã định danh kết nối không hợp lệ (kiểm tra lại TmnCode)");
    }
}
