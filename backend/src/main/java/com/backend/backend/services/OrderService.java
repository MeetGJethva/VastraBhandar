package com.backend.backend.services;

import com.backend.backend.models.Order;
import com.backend.backend.models.OrderItem;
import com.backend.backend.models.User;
import com.backend.backend.repo.OrderRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final OrderItemService orderItemService;
    private final CustomizationService customizationService;
    private final UserServices userServices;

    // Constructor injection
    @Autowired
    public OrderService(OrderRepo orderRepo, OrderItemService orderItemService, CustomizationService customizationService, UserServices userServices) {
        this.orderRepo = orderRepo;
        this.orderItemService = orderItemService;
        this.customizationService = customizationService;
        this.userServices = userServices;
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Order> getOrderById(String orderId) {
        return orderRepo.findById(orderId);
    }

    public List<Order> getOrdersByCustomer(String email) {
        User customer = userServices.getUserByEmail(email);
        return orderRepo.findByCustomer(customer);
    }

    public List<Order> getOrdersByStatus(Order.Status status) {
        return orderRepo.findByStatus(status);
    }

    @Transactional
    public Order createOrder(Order order) {
        for(OrderItem i : order.getItems()) {
            i.setCustomization(customizationService.addCustomization(i.getCustomization()));
        }
        Order placedOrder = orderRepo.save(order);
        return placedOrder;
    }


    public Order updateOrderStatus(String orderId, Order.Status status) {
        Optional<Order> optionalOrder = orderRepo.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepo.save(order);
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }

    public void deleteOrder(String orderId) {
        orderRepo.deleteById(orderId);
    }
}