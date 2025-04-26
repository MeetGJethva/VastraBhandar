package com.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Document(collection = "Orders")
public class Order {
    @Id
    private String orderId;

    private Double totalPrice;
    @CreatedDate
    private LocalDateTime orderDate;

    @DBRef
    private User customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) // Cascade saving of OrderItems
    private List<OrderItem> items;

    @Enumerated(EnumType.STRING)
    private Status status;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum Status {
        PENDING, DISPATCHED, COMPLETED
    }
}


