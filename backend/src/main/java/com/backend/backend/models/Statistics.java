package com.backend.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "statistics")
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double profit;
    private Integer sales;

    @ManyToOne
    @JoinColumn(name = "popular_category_id")
    private Category popularCategory;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

