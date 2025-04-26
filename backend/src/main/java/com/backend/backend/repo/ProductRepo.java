package com.backend.backend.repo;

import com.backend.backend.models.Product;
import com.backend.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {
    Product findByName(String ProductName);

    List<Product> findByDesigner(User designer);
}
