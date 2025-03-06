package com.backend.backend.services;

import com.backend.backend.models.Order;
import com.backend.backend.models.Payment;
import com.backend.backend.repo.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepo.findById(paymentId);
    }

    public List<Payment> getPaymentsByOrder(Order order) {
        return paymentRepo.findByOrder(order);
    }

    public List<Payment> getPaymentsByStatus(Payment.Status status) {
        return paymentRepo.findByStatus(status);
    }

    public List<Payment> getPaymentsByMethod(Payment.Method paymentMethod) {
        return paymentRepo.findByPaymentMethod(paymentMethod);
    }

    public Payment createPayment(Payment payment) {
        payment.setPaymentDate(LocalDateTime.now());
        return paymentRepo.save(payment);
    }

    public Payment updatePaymentStatus(Long paymentId, Payment.Status status) {
        Optional<Payment> optionalPayment = paymentRepo.findById(paymentId);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            payment.setStatus(status);
            return paymentRepo.save(payment);
        }
        throw new RuntimeException("Payment not found with id: " + paymentId);
    }

    public void deletePayment(Long paymentId) {
        paymentRepo.deleteById(paymentId);
    }
}