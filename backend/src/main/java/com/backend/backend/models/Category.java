package com.backend.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "categories")
public class Category {
    @Id
    private String categoryId;
    private String image;
    private String name;
    private String description;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Category() {
    }

    public Category(String name, String description, String img) {
        this.name = name;
        this.description = description;
        this.image = img;
    }
}