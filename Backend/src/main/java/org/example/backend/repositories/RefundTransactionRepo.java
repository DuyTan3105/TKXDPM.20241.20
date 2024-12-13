package org.example.backend.repositories;

import org.example.backend.entities.payment.RefundTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RefundTransactionRepo extends MongoRepository<RefundTransaction, String> {
}
