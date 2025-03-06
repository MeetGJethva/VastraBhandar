// Order.js
export class Order {
    constructor(orderId, customer, totalPrice, status, items) {
        this.orderId = orderId;         // Unique ID for the order
        this.customer = customer;       // Reference to the User object (customer)
        this.totalPrice = totalPrice;   // Total price of the order
        this.status = status;           // Status of the order (PENDING, DISPATCHED, COMPLETED)
        this.items = items;             // Array of OrderItem objects
    }
}

