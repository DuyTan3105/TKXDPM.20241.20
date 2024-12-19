package org.example.backend.subsystem;



import org.example.backend.entities.payment.PaymentTransaction;
import org.example.backend.entities.payment.RefundTransaction;
import org.example.backend.exceptions.AIMSException;
import org.example.backend.exceptions.payment.PaymentException;

import java.io.IOException;
import java.util.Map;

public interface IPaySubsystem {

    PaymentTransaction savePaymentTransaction(Map<String, String> response) throws PaymentException, AIMSException, IOException;
    String generateUrl(int amount, String orderId) throws IOException;
    RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException;

}
