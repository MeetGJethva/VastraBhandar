import { useContext, useState } from "react";
import ClothCustomizer from "../common/customization/ClothCustomizer";
import { Order } from "../../models/Order";
import { AuthContext } from "../../context/auth_context";
import { OrderItem } from "../../models/OrderItem";
import { placeOrder } from "../../services/customer/order_service";
import ConfirmationModal from "./ConfirmationModel";
import CustomAlert from "../../Components/UI/AlertIcon";

const CustomeCloth = () => {
  const [order, setOrder] = new useState(null);
  const { isLoggedIn, userId, user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // useEffect(() => {
  //   console.log("Order data:", order);
  // }, [order]);

  const handleOrder = (newOrder) => {
    if (!isLoggedIn) {
      alert("Please log in to place an order");
      return;
    }

    const clientOrder = new Order();

    const orderData = new OrderItem();
    newOrder.customization.baseImage = newOrder.mergedImage;
    orderData.customization = newOrder.customization;
    orderData.price = newOrder.product.price;
    orderData.product = newOrder.product;
    // orderData.order = clientOrder; //removed it from hear and done the same in backend to avoid circular dependency in frontend side
    // orderData.mergedImage = newOrder.mergedImage;

    clientOrder.customer = user;
    clientOrder.items = [orderData];
    clientOrder.status = "PENDING";

    setOrder(clientOrder);
    setIsModalOpen(true);
  };

  const onFinalOrderPlace = async ({ quantity, totalPrice }) => {
    setIsPlacingOrder(true);
    // store order data into database
    order.items[0].quantity = quantity;
    order.totalPrice = parseFloat(totalPrice);

    setOrder(order);

    console.log("Order Placed Successfully : ");
    console.dir(order);
    placeOrder(order, user)
    .then(()=>{
      setMessage("Order Placed");
      setIsModalOpen(false);
    })
    .catch((error)=>{
      setError(error.message || "Error while placing order")
    })
    .finally(()=>{
      setIsPlacingOrder(false);
    })
  };

  return (
    <div>
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderData={order}
        onFinilization={onFinalOrderPlace}
        isOrderProcessing={isPlacingOrder}
      />
      <ClothCustomizer onCustomization={handleOrder} />
    </div>
  );
};

export default CustomeCloth;
