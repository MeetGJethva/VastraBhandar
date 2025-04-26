import { useContext, useState } from "react";
import ClothCustomizer from "../common/customization/ClothCustomizer";
import ConfirmationModel from "./ConfirmationModel";
import { Product } from "../../models/product";
import { uploadProduct } from "../../services/designer/productService";
import { AuthContext } from "../../context/auth_context";
import CustomAlert from "../../Components/UI/AlertIcon";

export const DesigerCustomeCloth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleFinalDesign = (newProduct) => {
    // Send the final design to the server for customization and payment
    // console.log("Final design sent to server");
    setProduct(newProduct);
    setIsModalOpen(true);
  };

  const handleFinalUpload = async (newProduct) => {
    setError("")
    setMessage("")
    let uProduct = new Product();

    uProduct.basePrice = newProduct.basePrice;
    uProduct.name = newProduct.name;
    uProduct.description = newProduct.description;
    uProduct.basePrice = newProduct.basePrice;
    uProduct.price = newProduct.totalPrice;
    uProduct.imageUrl = product.mergedImage;
    uProduct.customization = product.customization;
    uProduct.designer = user;
    uProduct.category = newProduct.category;

    const response = await uploadProduct(uProduct, user);
    if (response.status === 201) setMessage("Product Uploaded Sucessfully");
    else setError(response.message);
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
