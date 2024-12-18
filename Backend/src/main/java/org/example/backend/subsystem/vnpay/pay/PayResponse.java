package org.example.backend.subsystem.vnpay.pay;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.backend.entities.payment.PaymentTransaction;
import org.example.backend.exceptions.AIMSException;
import org.example.backend.exceptions.payment.pay.*;
import org.example.backend.utils.Utils;

import java.util.Map;
import java.util.Objects;


@Data
@AllArgsConstructor
public class PayResponse {
    private Map<String, String> response;


    public PaymentTransaction savePaymentTransaction() {
        if (response == null) {
            return null;
        }
        // Create Payment transaction
        String errorCode = response.get("vnp_TransactionStatus");
        String transactionId = response.get("vnp_TransactionNo");
        String transactionContent = response.get("vnp_OrderInfo");
        int amount = Integer.parseInt(response.get("vnp_Amount")) / 100;
        String orderId = response.get("orderId");
        String createdAt = response.get("vnp_PayDate");
        String vnpTxnRef = response.get("vnp_TxnRef");
        String message;
        if (Objects.equals(errorCode, "00")) {
            message = "Transaction successful";
        } else {
            message = "Transaction failed";
        }
        PaymentTransaction trans = new PaymentTransaction(transactionId, orderId, errorCode, amount, vnpTxnRef, transactionContent, message , Utils.convertPaymentTimeFormat(createdAt));

        switch (trans.getErrorCode()) {
            case "00":
                break;
            case "01":
                throw new IncompletTransactionException();
            case "02":
                throw new FailedTransactionException();
            case "04":
                throw new ReversedTransactionException();
            case "05":
                throw new ProcessingTransactionException();
            case "09":
                throw new RefundRejectedTransactionException();
            case "06":
                throw new RefundRequestedTransactionException();
            case "07":
                throw new SuspiciousTransactionException();
            default:
                throw new AIMSException();
        }
        return trans;
    }

}
