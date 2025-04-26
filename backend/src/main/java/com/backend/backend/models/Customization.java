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
    private String customizationId;

    private String color;
    private String size;
    private String baseImage;

    @CreatedDate
    private LocalDateTime createdAt;
}

