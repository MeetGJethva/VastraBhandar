package com.backend.backend.Controller;

import com.backend.backend.models.Order;
import com.backend.backend.models.User;
import com.backend.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        return orderService.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{email}")
    public List<Order> getOrdersByCustomer(@PathVariable String email) {
        return orderService.getOrdersByCustomer(email);
    }

    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable Order.Status status) {
        return orderService.getOrdersByStatus(status);
    }

    @PostMapping("/customer/order")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try{
            Order o = orderService.createOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(o);
        } catch (Exception e) {
            System.out.println("Order Controller: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //change the status of order by vendor
    @PutMapping("/vendor/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String orderId,
            @RequestParam Order.Status status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderId) {
        try{
            orderService.deleteOrder(orderId);
            return ResponseEntity.noContent().build();
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
}