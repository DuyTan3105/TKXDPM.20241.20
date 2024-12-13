package org.example.backend.repositories;

import org.example.backend.entities.delivery.DeliveryInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeliveryInfoRepo extends MongoRepository<DeliveryInfo, String> {
}
