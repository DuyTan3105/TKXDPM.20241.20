package org.example.backend.subsystem.vnpay;


import com.google.gson.Gson;
import org.example.backend.constants.enums.PaymentType;
import org.example.backend.entities.payment.PaymentTransaction;
import org.example.backend.entities.payment.RefundTransaction;
import org.example.backend.strategies.payment.PaymentStrategy;
import org.example.backend.subsystem.vnpay.pay.PayRequest;
import org.example.backend.subsystem.vnpay.pay.PayResponse;
import org.example.backend.subsystem.vnpay.refund.RefundRequest;
import org.example.backend.subsystem.vnpay.refund.RefundResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Service
public class VNPayManager implements PaymentStrategy {

    public PaymentTransaction savePaymentTransaction(Map<String, String> response) {
        return new PayResponse(response).savePaymentTransaction();
    }

    @Override
    public String generateUrl(Map<String, Object> data) throws IOException{
        int amount = (int) data.get("amount");
        String orderId = (String) data.get("orderId");
        PayRequest payRequest = new PayRequest(amount, orderId);
        return payRequest.generateURL();
    }

    @Override
    public PaymentType getType() {
        return PaymentType.VNPAY;
    }

    public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
        RefundRequest refundRequestVNPay = new RefundRequest( paymentTransaction);
        String response = refundRequestVNPay.refund();
        Gson gson = new Gson();
        Type type = new com.google.gson.reflect.TypeToken<HashMap<String, String>>() {}.getType();
        HashMap<String, String> resultHashmap = gson.fromJson(response, type);
        RefundResponse refundResponseVNPay = new RefundResponse(resultHashmap);
        return refundResponseVNPay.getRefundTransactionResponse();
    }
}
