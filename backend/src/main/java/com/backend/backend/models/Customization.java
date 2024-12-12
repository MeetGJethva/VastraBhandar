package com.backend.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "customizations")
public class Customization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customizationId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String color;
    private String size;
    private Integer quantity;
    private String designUrl;
    private String mergedImageUrl;
    private Double price;

    private LocalDateTime createdAt;
}

