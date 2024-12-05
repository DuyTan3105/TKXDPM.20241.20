package org.example.backend.repositories;

import org.example.backend.entities.invoice.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepo extends JpaRepository<Invoice, String> {

}
