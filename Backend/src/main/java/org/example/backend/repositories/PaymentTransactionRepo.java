package org.example.backend.repositories;

import org.example.backend.entities.payment.PaymentTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentTransactionRepo extends MongoRepository<PaymentTransaction, String> {
}
