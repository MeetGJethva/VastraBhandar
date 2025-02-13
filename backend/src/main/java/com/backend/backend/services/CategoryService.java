package com.backend.backend.services;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.backend.backend.models.Category;
import com.backend.backend.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }


    public Optional<Category> getCategoryById(String id) {
        return categoryRepo.findById(id);
    }
    public Category addCategory(Category category) {
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        return categoryRepo.save(category);
    }

    public Category updateCategory(String id, Category categoryDetails) {
        Optional<Category> optionalCategory = categoryRepo.findById(id);
        if (optionalCategory.isPresent()) {
            Category existingCategory = optionalCategory.get();
            existingCategory.setName(categoryDetails.getName());
            existingCategory.setDescription(categoryDetails.getDescription());
            return categoryRepo.save(existingCategory);
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }
}
