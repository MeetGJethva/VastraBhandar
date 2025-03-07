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
    private byte[] imageUrl;
    private int rating;

    public int getNo_of_ratings() {
        return no_of_ratings;
    }

    public void setNo_of_ratings(int no_of_ratings) {
        this.no_of_ratings = no_of_ratings;
    }

    private int no_of_ratings;
    private Double basePrice;
    @DBRef
    private Category category;

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    @DBRef // Reference to another document in MongoDB
    private User designer;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Product() {
    }

    public Product(int rating, int no_of_ratings, String name, String description, String imageUrl, Category category, User designer, Double basePrice, Double d_commision) {
        this.name = name;
        this.description = description;
        this.price = basePrice + d_commision;
        this.imageUrl = imageUrl;
        this.category = category;
        this.designer = designer;
        this.basePrice = basePrice;
        this.rating = rating;
        this.no_of_ratings = no_of_ratings;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getDesigner() {
        return designer;
    }

    public void setDesigner(User designer) {
        this.designer = designer;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
