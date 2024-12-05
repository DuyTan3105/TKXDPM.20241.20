package org.example.backend.repositories;

import org.example.backend.entities.payment.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTransactionRepo extends JpaRepository<PaymentTransaction, String> {
}
