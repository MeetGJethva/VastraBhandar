package com.backend.backend.services;

import com.backend.backend.models.*;
import com.backend.backend.models.Product;
import com.backend.backend.repo.CategoryRepo;
import com.backend.backend.repo.ProductRepo;
import com.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {

    private final ProductRepo productRepo;
    private CategoryRepo categoryRepository;
    private UserRepo userRepository;
    private CustomizationService customizationService;

    // Constructor-based dependency injection
    @Autowired
    public ProductServices(ProductRepo productRepo,
                           CategoryRepo categoryRepository,
                           UserRepo userRepository,
                           CustomizationService customizationService) {
        this.productRepo = productRepo;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.customizationService = customizationService;
    }

    public Product addProduct(Product product) {
        // Validate category
        if (product.getCategory() == null || product.getCategory().getCategoryId() == null) {
            throw new RuntimeException("Category ID cannot be null");
        }
        Optional<Category> category = categoryRepository.findById(product.getCategory().getCategoryId());
        if (category.isEmpty()) {
            throw new RuntimeException("Category not found with id: " + product.getCategory().getCategoryId());
        }

        if (product.getDesigner() == null || product.getDesigner().getUserId() == null) {
            throw new RuntimeException("Designer ID cannot be null");
        }
        Optional<User> designer = userRepository.findById(product.getDesigner().getUserId());
        if (designer.isEmpty()) {
            throw new RuntimeException("Designer not found with id: " + product.getDesigner().getUserId());
        }

        //save the customization in databse
        Customization c = new Customization();
        c.setColor(product.getCustomization().getColor());
        c.setSize(product.getCustomization().getSize());
        c.setBaseImage(product.getCustomization().getBaseImage());

        c = customizationService.addCustomization(c);

        product.setCustomization(c);
        // Save the product
        return productRepo.save(product);
    }

    public ProductServices(ProductRepo productRepo)
    {
        this.productRepo = productRepo;
    }

    public List<Product> getAllProducts(){ return productRepo.findAll(); }

    public Optional<Product> getProductById(String id) {
        return productRepo.findById(id);
    }

    public List<Product> getProductsByDesigner(User designer){
        List<Product> products = productRepo.findByDesigner(designer);
        return products;
    }

    public Product updateProduct(String productId, Product productDetails) {
        Optional<Product> optionalProduct = productRepo.findById(productId);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setImageUrl(productDetails.getImageUrl());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setDesigner(productDetails.getDesigner());
            return productRepo.save(existingProduct);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

    public void deleteProduct(String id)
    {
        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepo.deleteById(id);
    }

    public List<Product> getProductsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepo.findAll(pageable);
        return productPage.getContent();
    }


}
