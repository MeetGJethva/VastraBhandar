package com.backend.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String productId;

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private int rating;
    private int no_of_ratings;
    private Double basePrice;

    @DBRef
    private Category category;
    @DBRef // Reference to another document in MongoDB
    private User designer;
    @DBRef
    private Customization customization;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
