package org.example.backend.exceptions.payment.refund;


import org.example.backend.exceptions.payment.PaymentException;

public class InvalidDataTypeException extends PaymentException {
    public InvalidDataTypeException() {
        super("Dữ liệu gửi sang không đúng định dạng");
    }
}
