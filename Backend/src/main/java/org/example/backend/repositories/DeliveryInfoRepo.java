package org.example.backend.repositories;

import org.example.backend.entities.delivery.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryInfoRepo extends JpaRepository<DeliveryInfo, String> {
}
