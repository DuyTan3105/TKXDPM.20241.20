package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.entities.invoice.Invoice;
import org.example.backend.services.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/invoice")
public class InvoiceController {
    private final InvoiceService invoiceService;


    @PostMapping("/create")
    public ResponseEntity<AIMSResponse<Object>> create(@RequestBody Invoice invoice) {
        return invoiceService.create(invoice);
    }
}
