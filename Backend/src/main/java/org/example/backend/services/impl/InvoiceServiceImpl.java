package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.invoice.Invoice;
import org.example.backend.repositories.InvoiceRepo;
import org.example.backend.services.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepo invoiceRepository;
    @Override
    public ResponseEntity<AIMSResponse<Object>> create(Invoice invoice) {
        try {
            invoiceRepository.save(invoice);
            return ResponseUtil.success201Response("Create invoice successfully", invoice);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error while creating invoice");
        }
    }
}
