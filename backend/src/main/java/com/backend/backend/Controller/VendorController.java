package com.backend.backend.Controller;

import com.backend.backend.models.Category;
import com.backend.backend.models.Product;
import com.backend.backend.models.User;
import com.backend.backend.services.CategoryService;
import com.backend.backend.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/vendors")
public class VendorController {

    private ProductServices productService;

    @Autowired
    public VendorController(ProductServices services){
        productService = services;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(@RequestParam int page, @RequestParam int size) {
        List<Product> products = productService.getProductsPaginated(page, size);

        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS).cachePublic())
                .body(products);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("products/user")
    public ResponseEntity<?> getProductsByDesigner(@RequestBody User designer){
        try{
            List<Product> products = productService.getProductsByDesigner(designer);
            return ResponseEntity.status(HttpStatus.OK).body(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try{
            Product addedProduct = productService.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 4. Update: Update an existing product by ID
    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
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
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> list = categoryService.getAllCategories();
        if(list == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
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

