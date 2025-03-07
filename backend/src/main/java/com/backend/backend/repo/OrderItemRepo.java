package com.backend.backend.repo;

import com.backend.backend.models.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepo extends MongoRepository<OrderItem, Long> {
    // Custom query methods can be added here
    List<OrderItem> findByOrder(Order order);
    List<OrderItem> findByProduct(Product product);
}