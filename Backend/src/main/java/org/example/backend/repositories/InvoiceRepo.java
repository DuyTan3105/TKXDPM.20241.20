package org.example.backend.repositories;

import org.example.backend.entities.invoice.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepo extends MongoRepository<Invoice, String> {

}
