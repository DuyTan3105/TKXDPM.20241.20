package org.example.backend.services;

import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.invoice.Invoice;
import org.springframework.http.ResponseEntity;

public interface InvoiceService {
    ResponseEntity<AIMSResponse<Object>> create(Invoice invoice);
}
