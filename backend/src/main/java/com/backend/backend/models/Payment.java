package com.backend.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private Double amount;
    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING)
    private Method paymentMethod;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Method {
        CREDIT_CARD, PAYPAL, UPI
    }

    public enum Status {
        SUCCESS, FAILED, PENDING
    }
}

