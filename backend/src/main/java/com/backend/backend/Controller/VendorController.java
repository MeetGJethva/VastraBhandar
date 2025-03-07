package com.backend.backend.Controller;

import com.backend.backend.models.Category;
import com.backend.backend.models.Product;
import com.backend.backend.services.CategoryService;
import com.backend.backend.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private ProductServices productService;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // 4. Update: Update an existing product by ID
    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Delete: Delete a product by ID
    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }


    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Get category by ID
    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new category
    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    // Update an existing category
    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody Category categoryDetails) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
            return ResponseEntity.ok(updatedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a category
    @DeleteMapping("/category/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}

