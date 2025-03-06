import { useContext, useState } from "react";
import ClothCustomizer from "../common/customization/ClothCustomizer";
import ConfirmationModel from "./ConfirmationModel";
import { Product } from "../../models/product"
import { uploadProduct } from "../../services/designer/productService";
import { AuthContext } from "../../context/auth_context";

export const DesigerCustomeCloth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useContext(AuthContext);
  const [product, setProduct] = useState({});

  const handleFinalDesign = (newProduct) => {
    // Send the final design to the server for customization and payment
    // console.log("Final design sent to server");
    setProduct(newProduct);
    setIsModalOpen(true);
  };

  const handleFinalUpload = (newProduct) => {

    let uProduct = new Product();

    uProduct.basePrice = newProduct.basePrice;
    uProduct.name = newProduct.name;
    uProduct.description = newProduct.description;
    uProduct.basePrice = newProduct.basePrice;
    uProduct.price = newProduct.totalPrice;
    uProduct.imageUrl = product.mergedImage;
    uProduct.customization = product.customization;
    uProduct.creator = userId;
    uploadProduct(uProduct);
  };

  return (
    <div>
      <ConfirmationModel
        isOpen={isModalOpen}
        product={product}
        onClose={() => setIsModalOpen(false)}
        onFinalize={handleFinalUpload}
      />
      <ClothCustomizer onCustomization={handleFinalDesign} />
    </div>
  );
};
