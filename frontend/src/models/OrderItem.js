// OrderItem.js
export class OrderItem {
    constructor(orderItemId, order, product, customization, price, mergedImage, quantity) {
        this.orderItemId = orderItemId;
        this.order = order;           // Reference to the Order object
        this.product = product;       // Reference to the Product object
        this.customization = customization || null; // Customization can be null
        // this.mergedImage = mergedImage;
        this.price = price;
        this.quantity = quantity;
    }
}

// module.exports = OrderItem;
