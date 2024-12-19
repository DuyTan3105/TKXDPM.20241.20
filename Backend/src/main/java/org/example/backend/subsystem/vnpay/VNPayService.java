package org.example.backend.subsystem.vnpay;


import org.example.backend.entities.payment.PaymentTransaction;
import org.example.backend.entities.payment.RefundTransaction;
import org.example.backend.subsystem.IPaySubsystem;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class VNPayService implements IPaySubsystem {

    private final VNPayManager vnpayManager;

    public VNPayService(VNPayManager vnpayManager) {
        this.vnpayManager = vnpayManager;
    }

    @Override
    public String generateUrl(int amount, String orderId) throws IOException {
        return vnpayManager.generateUrl(amount, orderId);
    }

    @Override
    public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
        return vnpayManager.refund(paymentTransaction);
    }

    @Override
    public PaymentTransaction savePaymentTransaction(Map<String,String> response) {
        return vnpayManager.savePaymentTransaction(response);
    }


}
