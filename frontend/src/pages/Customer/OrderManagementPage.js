import React, { useState, useEffect, useContext } from "react";
import {
  Trash2,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ClipboardList,
  UserCircle,
  Calendar,
  Mail,
  DollarSign,
  ShoppingBag,
  ClipboardCheck,
  Ruler,
  Palette,
} from "lucide-react";

import { cancleOrder, getOrders } from "../../services/customer/order_service";
import { AuthContext } from "../../context/auth_context";
import LoadingSpinner from "../../Components/LoadingSpinner";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await getOrders(user)
          .then((response) => {
            setOrders(response);
            // console.log("order page")
            // console.dir(response);
            if (response.length > 0) {
              setSelectedOrder(response[0]);
            }
          })
          .catch((error) => {
            setError(error.error);
          })
          .finally(() => {
            setLoading(false);
          });
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
    cancleOrder(selectedOrder.orderId, user)
      .then((response) => {
        setOrders(orders.filter((o) => o.orderId !== selectedOrder.orderId));
        setSelectedOrder(null);
      })
      .catch((error) => {
        setError(error || "Error");
      })
      .finally(() => {
        setShowCancelModal(false);
      });
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
  {
    /* Helper function to get status color */
  }
  {
    /* Add this function to your component */
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 dark:text-green-400";
      case "PENDING":
        return "text-yellow-600 dark:text-yellow-400";
      case "SHIPPED":
        return "text-blue-600 dark:text-blue-400";
      case "CANCELLED":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row gap-8 p-6 items-start">
        {/* Order List (Left Side) - Add align-self-start and h-auto */}
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700 md:sticky md:top-6 self-start">
          {/* Order list content remains the same */}
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
            <ClipboardList size={20} className="mr-2 text-blue-500" />
            Orders
          </h2>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <ShoppingBag
                size={48}
                className="text-gray-300 dark:text-gray-500 mb-3"
              />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No orders found
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Your order history will appear here
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li key={order.orderId}>
                  <button
                    onClick={() => handleOrderClick(order)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedOrder && selectedOrder.orderId === order.orderId
                        ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span
                          className={`font-semibold ${
                            selectedOrder &&
                            selectedOrder.orderId === order.orderId
                              ? "text-blue-600 dark:text-blue-300"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          Order #{order.orderId}
                        </span>
                        <div className="mt-1 flex items-center">
                          <UserCircle
                            size={14}
                            className="text-gray-400 mr-1"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.customer.name || "Unknown"}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center">
                          {getStatusIcon(order.status)}
                          <span
                            className={`text-sm ml-1 font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status || "Unknown"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        size={18}
                        className={`${
                          selectedOrder &&
                          selectedOrder.orderId === order.orderId
                            ? "text-blue-500 dark:text-blue-300"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order Details (Right Side) */}
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          {selectedOrder ? (
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Order #{selectedOrder.orderId}
                  </h2>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(selectedOrder.status)}
                    <span
                      className={`ml-1 text-sm font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status || "Unknown"}
                    </span>
                  </div>
                </div>

                {selectedOrder.status === "PENDING" && (
                  <button
                    onClick={handleCancelOrder}
                    className="flex items-center px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors duration-200"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Cancel Order
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-3">
                    Customer Details
                  </h3>
                  <div className="flex items-center mb-2">
                    <UserCircle size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800 dark:text-gray-200">
                      {selectedOrder.customer.name || "Unknown"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800 dark:text-gray-200">
                      {selectedOrder.customer.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-3">
                    Order Information
                  </h3>
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800 dark:text-gray-200">
                      Ordered on {formatDate(selectedOrder.orderDate)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-gray-400 mr-2" />
                    <p className="text-gray-800 dark:text-gray-200 font-semibold">
                      Total: ${selectedOrder.totalPrice?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                <ShoppingBag size={18} className="mr-2 text-blue-500" />
                Order Items
              </h3>

              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative w-24 h-24 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                        <img
                          src={item.customization.baseImage}
                          alt={item.product?.name || "Product Image"}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.product?.name || "Product Item"}
                      </h4>

                      {item.customization && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {item.customization.size && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Ruler size={14} className="mr-1" />
                              <p>
                                Size:{" "}
                                <span className="font-medium">
                                  {item.customization.size}
                                </span>
                              </p>
                            </div>
                          )}
                          {item.customization.color && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Palette size={14} className="mr-1" />
                              <p>
                                Color:{" "}
                                <span className="font-medium">
                                  {item.customization.color}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-3 flex justify-between items-end">
                        <p className="text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2) || "0.00"} ×{" "}
                          {item.quantity || "0"}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          ${(item.price * item.quantity).toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-full mb-4">
                <ClipboardCheck
                  size={48}
                  className="text-gray-300 dark:text-gray-500"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                No order selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Select an order from the list to view detailed information
              </p>
            </div>
          )}
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
              Are you sure you want to cancel order #{selectedOrder.orderId}?
              This action cannot be undone.
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
