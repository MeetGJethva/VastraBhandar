package com.backend.backend.models;

import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "statistics")
public class Statistics {
    @Id
    private Long statId;

    @DBRef
    private User user;

    private Double profit;
    private Integer sales;

    @DBRef
    private Category popularCategory;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

