// Product.js
export class Product {
  constructor(
    productId,
    name,
    description,
    price,
    basePrice,
    imageUrl,
    customization,
    creator,
    category, 
    rating
  ) {
    this.productId = productId; // Unique ID for the product
    this.name = name; // Product name
    this.description = description; // Product description
    this.price = price; // Product price
    this.basePrice = basePrice; // Base price
    this.imageUrl = imageUrl; // Image URL of the product
    this.customization = customization;
    this.creator = creator; // Creator of the product 
    this.category = category;
    this.rating = rating; // Rating of the product
  }
}
