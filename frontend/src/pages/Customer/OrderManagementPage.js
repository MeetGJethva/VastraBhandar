import React, { useState, useEffect } from "react";
import {
  Trash2,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { getOrders } from "../../services/customer/order_service";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
        // console.log(data);
        // Select first order by default if available
        if (data.length > 0) {
          setSelectedOrder(data[0]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    // Implement actual cancellation logic here
    setOrders(orders.filter((o) => o.orderId !== selectedOrder.orderId));
    setSelectedOrder(null);
    setShowCancelModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="inline mr-1 text-yellow-500" size={16} />;
      case "DISPATCHED":
        return <Package className="inline mr-1 text-blue-500" size={16} />;
      case "COMPLETED":
        return <CheckCircle className="inline mr-1 text-green-500" size={16} />;
      default:
        return <AlertCircle className="inline mr-1 text-gray-500" size={16} />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Manage Orders
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Order List (Left Side) */}
          <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No orders found
              </p>
            ) : (
              <ul className="space-y-2">
                {orders.map((order) => (
                  <li key={order.orderId}>
                    <button
                      onClick={() => handleOrderClick(order)}
                      className={`w-full text-left p-3 rounded-md flex items-center justify-between ${
                        selectedOrder && selectedOrder.orderId === order.orderId
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <div>
                        <span className="font-medium">
                          Order #{order.orderId}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.customer || "sorry"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(order.orderDate)}
                        </p>
                        <p className="text-sm mt-1">
                          {getStatusIcon(order.status)}{" "}
                          {order.status || "sorry"}
                        </p>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order Details (Right Side) */}
          <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            {selectedOrder ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Order Details #{selectedOrder.orderId}
                  </h2>
                  {selectedOrder.status === "PENDING" && (
                    <button
                      onClick={handleCancelOrder}
                      className="flex items-center px-3 py-2 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Cancel Order
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-gray-800 dark:text-gray-200">
                    <span className="text-gray-600 dark:text-gray-400">
                      Customer:
                    </span>{" "}
                    {selectedOrder.customer || "sorry"}
                  </p>
                  <p className="mb-1 text-gray-800 dark:text-gray-200">
                    <span className="text-gray-600 dark:text-gray-400">
                      Order Date:
                    </span>{" "}
                    {formatDate(selectedOrder.orderDate)}
                  </p>
                  <p className="mb-1 text-gray-800 dark:text-gray-200">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:
                    </span>{" "}
                    {getStatusIcon(selectedOrder.status)}{" "}
                    {selectedOrder.status || "sorry"}
                  </p>
                  <p className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">
                    Total: ${selectedOrder.totalPrice?.toFixed(2) || "sorry"}
                  </p>
                </div>

                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="flex items-start p-3 rounded-md bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={item.customization.mergedImage}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {item.product.name}
                        </h4>
                        {item.customization && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {item.customization.size && (
                              <p>Size: {item.customization.size}</p>
                            )}
                            {item.customization.color && (
                              <p>Color: {item.customization.color}</p>
                            )}
                          </div>
                        )}
                        <p className="mt-1 text-gray-800 dark:text-gray-200">
                          ${item.price.toFixed(2) || "sorry"} ×{" "}
                          {item.quantity || "sorry"}
                        </p>
                        <p className="font-medium mt-1 text-gray-800 dark:text-gray-200">
                          Subtotal: $
                          {(item.price * item.quantity).toFixed(2) || "sorry"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                Select an order to view details
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 rounded-lg bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
              Confirm Order Cancellation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to cancel order #
              {selectedOrder.orderId}? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                No, Keep Order
              </button>
              <button
                onClick={confirmCancelOrder}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
