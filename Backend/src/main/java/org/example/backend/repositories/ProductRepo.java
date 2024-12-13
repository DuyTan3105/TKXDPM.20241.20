package org.example.backend.repositories;

import org.example.backend.entities.product.Product;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ProductRepo extends MongoRepository<Product, String> {

}
