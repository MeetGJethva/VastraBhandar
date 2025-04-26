import React, { useContext, useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { AuthContext } from "../../context/auth_context";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import { placeOrder } from "../../services/customer/order_service";
import CustomAlert from "../../Components/UI/AlertIcon";

const CartManagementPage = () => {
  const { cart, cartItems } = useContext(AuthContext);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);
  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (itemId) => {
    cart.removeItem(itemId);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate API call
    const order = new Order();
    order.items = [];
    let total_price = 0;

    cartItems.forEach(function (item, index) {
      const orderItem = new OrderItem();
      orderItem.customization = item.customization;
      orderItem.customization.baseImage = item.imageUrl;
      orderItem.price = item.price;
      // orderItem.mergedImage = null; no need as it is included in customization
      orderItem.quantity = 1; // implement this for dynamic

      order.items.push(orderItem);
      total_price += item.price;
    });

    order.customer = user;
    order.totalPrice = total_price;
    order.status = "PENDING";
    console.dir(order);
    placeOrder(order, user)
      .then((response) => {
        setMessage("Order Placed Sucessfully");
        cart.clearCart();
      })
      .catch((error) => {
        setError(error.message || "not placed.");
      })
      .finally(() => {
        setIsPlacingOrder(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Manage Cart
        </h1>
        {error && (
          <CustomAlert
            key={Date.now()}
            type="error"
            message={error}
            onClose={() => setError("")}
          />
        )}
        {message && (
          <CustomAlert
            key={Date.now()}
            type="info"
            message={message}
            onClose={() => setMessage("")}
          />
        )}
        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Looks like you haven't added any products to your cart yet.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((product) => (
                <li key={product.productId} className="flex py-6 px-4 md:px-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-800 dark:text-gray-200">
                        <h3>{product.name}</h3>
                        <p className="ml-4">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-1">Rating:</span>
                        <span className="text-yellow-500">
                          {product.rating}
                        </span>
                        <span className="ml-1">★</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(product.productId)}
                        className="flex items-center font-medium text-red-600 dark:text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 md:px-6">
              <div className="flex justify-between text-base font-medium text-gray-800 dark:text-gray-200">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className={`flex w-full items-center justify-center rounded-md border border-transparent
                    ${
                      isPlacingOrder
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    } px-6 py-3 text-base font-medium text-white shadow-sm`}
                >
                  {isPlacingOrder ? "Processing..." : "Place Order"}
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  or{" "}
                  <a
                    href="/"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartManagementPage;
