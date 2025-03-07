package com.backend.backend.repo;
import com.backend.backend.models.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends MongoRepository<Order, Long> {
    // Custom query methods can be added here
    List<Order> findByCustomer(User customer);
    List<Order> findByStatus(Order.Status status);
}