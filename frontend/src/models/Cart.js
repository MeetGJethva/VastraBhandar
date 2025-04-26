export class Cart {
  
  constructor() {
    this.orderItems = this.initializeList();
    this.listeners = [];
  }

  initializeList() {
    try {
      // Get items from localStorage and parse them
      const savedItems = localStorage.getItem("cart");
      if (savedItems) {
        return JSON.parse(savedItems);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this));
  }

  addItem(product_item) {
    if (product_item) {
      this.orderItems.push(product_item);
      // Store the stringified array in localStorage
      localStorage.setItem("cart", JSON.stringify(this.orderItems));
      this.notifyListeners();
    }
  }

  removeItem(itemId) {
    this.orderItems = this.orderItems.filter((item) => item.productId !== itemId);
    // Update localStorage with the modified array
    localStorage.setItem("cart", JSON.stringify(this.orderItems));
    this.notifyListeners();
  }
 
  clearCart() {
    this.orderItems = []; // Clear the local array of cart items
    // Clear the cart data from localStorage
    localStorage.setItem("cart", JSON.stringify(this.orderItems));
    this.notifyListeners(); // Notify all listeners to update the UI
  }

  getItems() {
    return this.initializeList();
  }

  getNumberOfItems(){
    return this.orderItems.length;
  }
}
