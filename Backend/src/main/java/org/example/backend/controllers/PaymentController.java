package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.enums.PaymentType;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.payment.PaymentTransaction;
import org.example.backend.entities.payment.RefundTransaction;
import org.example.backend.repositories.PaymentTransactionRepo;
import org.example.backend.repositories.RefundTransactionRepo;
import org.example.backend.strategies.payment.PaymentStrategy;
import org.example.backend.strategies.payment.PaymentStrategyFactory;
import org.example.backend.subsystem.vnpay.VNPayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final VNPayService vnpayService;
    private final PaymentTransactionRepo paymentTransactionRepository;
    private final RefundTransactionRepo refundTransactionRepository;
    private final PaymentStrategyFactory paymentFactory;
    @PostMapping("/pay")
    public ResponseEntity<AIMSResponse<Object>> generateUrl(@RequestBody Map<String, Object> data, @RequestParam(defaultValue = "VNPAY") PaymentType paymentType) throws IOException {
        PaymentStrategy strategy = paymentFactory.getStrategy(paymentType);
        String result = strategy.generateUrl(data);
//        String result = vnpayService.generateUrl(amount, orderId);
//        ResponseEntity<AIMSResponse<Object>>  response = new AIMSResponse<>(Constants.SUCCESS_CODE, "Success", result);
          return ResponseUtil.success200Response("Success", result);
    }

    // stampcoupling
    // Chỉ cần truyền paymantTransactionId
    @GetMapping("/refund")
    public ResponseEntity<AIMSResponse<Object>> refund(@RequestBody PaymentTransaction paymentTransaction) throws IOException {
        RefundTransaction refundTransaction = vnpayService.refund(paymentTransaction);
        refundTransactionRepository.save(refundTransaction);
        return ResponseUtil.success200Response("Refund successfully", refundTransaction);
    }

    @PostMapping("/save-payment-transaction")
    public ResponseEntity<AIMSResponse<Object>> saveTransaction(@RequestBody Map<String, String> response) {
        PaymentTransaction paymentTransaction = vnpayService.savePaymentTransaction(response);
        paymentTransactionRepository.save(paymentTransaction);
        return ResponseUtil.success200Response("Save payment transaction successfully", paymentTransaction);
    }

}
