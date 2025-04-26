package com.backend.backend.services;

import com.backend.backend.models.Order;
import com.backend.backend.models.OrderItem;
import com.backend.backend.models.Product;
import com.backend.backend.repo.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepo orderItemRepo;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepo.findAll();
    }

    public List<OrderItem> getOrderItemsByOrder(Order order) {
        return orderItemRepo.findByOrder(order);
    }

//    public List<OrderItem> getOrderItemsByProduct(Product product) {
//        return orderItemRepo.findByProduct(product);
//    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        OrderItem o = null;
        try{
            o = orderItemRepo.save(orderItem);
        }catch (Exception e){
            System.out.println("Order Item Service: " + e.getMessage());
        }
        return o;
    }

    public void deleteOrderItem(String orderItemId) {
        orderItemRepo.deleteById(orderItemId);
    }
}