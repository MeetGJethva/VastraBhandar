package com.backend.backend.repo;

import com.backend.backend.models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepo extends MongoRepository<Payment, Long> {
    // Custom query methods can be added here
    List<Payment> findByOrder(Order order);
    List<Payment> findByStatus(Payment.Status status);
    List<Payment> findByPaymentMethod(Payment.Method paymentMethod);
}