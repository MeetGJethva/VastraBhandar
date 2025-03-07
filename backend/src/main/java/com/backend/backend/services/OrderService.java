package com.backend.backend.services;

import com.backend.backend.models.Order;
import com.backend.backend.models.User;
import com.backend.backend.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepo.findById(orderId);
    }

    public List<Order> getOrdersByCustomer(User customer) {
        return orderRepo.findByCustomer(customer);
    }

    public List<Order> getOrdersByStatus(Order.Status status) {
        return orderRepo.findByStatus(status);
    }

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepo.save(order);
    }

    public Order updateOrderStatus(Long orderId, Order.Status status) {
        Optional<Order> optionalOrder = orderRepo.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepo.save(order);
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }

    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }
}