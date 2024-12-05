package org.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Invoice extends JpaRepository<Invoice, String> {

}
