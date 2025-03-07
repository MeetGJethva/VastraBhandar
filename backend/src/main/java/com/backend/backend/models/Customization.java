package com.backend.backend.models;

import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import org.springframework.data.annotation.Id;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "customizations")
public class Customization {
    @Id
    private Long customizationId;

    @DBRef
    private User customer;

    @DBRef
    private Category category;

    private String color;
    private String size;
    private Integer quantity;
    private String designUrl;
    private String mergedImageUrl;
    private Double price;

    @CreatedDate
    private LocalDateTime createdAt;

    public Long getCustomizationId() {
        return customizationId;
    }

    public void setCustomizationId(Long customizationId) {
        this.customizationId = customizationId;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDesignUrl() {
        return designUrl;
    }

    public void setDesignUrl(String designUrl) {
        this.designUrl = designUrl;
    }

    public String getMergedImageUrl() {
        return mergedImageUrl;
    }

    public void setMergedImageUrl(String mergedImageUrl) {
        this.mergedImageUrl = mergedImageUrl;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

