import { useContext, useState } from "react";
import ClothCustomizer from "../common/customization/ClothCustomizer";
import { Order } from "../../models/Order";
import { AuthContext } from "../../context/auth_context";
import { OrderItem } from "../../models/OrderItem";
import { placeOrder } from "../../services/customer/order_service";
import ConfirmationModal from "./ConfirmationModel";

const CustomeCloth = () => {
  const [order, setOrder] = new useState(null);
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    newOrder.customization.mergedImage = newOrder.mergedImage;
    orderData.customization = newOrder.customization;
    orderData.price = newOrder.product.price;
    orderData.product = newOrder.product;
    orderData.order = clientOrder;
    // orderData.mergedImage = newOrder.mergedImage;

    clientOrder.customer = userId;
    clientOrder.items = [orderData];
    clientOrder.status = "PENDING";

    setOrder(clientOrder);
    setIsModalOpen(true);
  };

  const onFinalOrderPlace = ({ quantity, totalPrice }) => {
    // store order data into database
    order.items[0].quantity = quantity;
    order.totalPrice = parseFloat(totalPrice);

    setOrder(order);

    console.log("Order Placed Successfully : ");
    placeOrder(order);
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderData={order}
        onFinilization={onFinalOrderPlace}
      />
      <ClothCustomizer onCustomization={handleOrder} />
    </div>
  );
};

export default CustomeCloth;
