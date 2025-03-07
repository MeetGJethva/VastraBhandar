package com.backend.backend.repo;

import com.backend.backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {
    Product findByName(String ProductName);
}
