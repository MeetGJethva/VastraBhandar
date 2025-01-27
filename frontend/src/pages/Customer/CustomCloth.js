import { useEffect, useState } from "react";
import ClothCustomizer from "../common/customization/ClothCustomizer";

const CustomeCloth = () => {
  const [order, setOrder] = new useState(null);

  useEffect(() => {
    console.log("Order data:", order);
  }, [order]);

  const handleOrder = (newOrder) => {
    setOrder(newOrder);
  };

  return <ClothCustomizer onCustomization={handleOrder} />;
};

export default CustomeCloth;
