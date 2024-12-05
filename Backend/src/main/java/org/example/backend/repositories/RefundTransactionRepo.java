package org.example.backend.repositories;

import org.example.backend.entities.payment.RefundTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefundTransactionRepo extends JpaRepository<RefundTransaction, String> {
}
