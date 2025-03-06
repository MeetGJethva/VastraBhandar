import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Canvas from "./Canvas";
import DesignWrapper from "./DesignWrapper";
import MoveableWrapper from "./MoveableWrapper";
import ProductDetails from "./ProductDetails";
import { fetchCustomizerProducts } from "../../../services/customer/customization_product";
import { ProductSelector } from "./ProductSelector";

// Dynamically load all images from the folder
const imagesContext = require.context(
  "../../../assets/images/t-sirts",
  false,
  /\.(png|jpe?g|svg)$/
);

// Convert filenames into a map
const colorImageMap = imagesContext.keys().reduce((acc, path) => {
  const fileName = path.replace("./", "").split(".")[0]; // Extract "green" from "./green.png"
  acc[fileName] = imagesContext(path);
  return acc;
}, {});

const ClothCustomizer = (props) => {
  const { productId } = useParams();
  const canvasRef = useRef(null);
  const designWrapperRef = useRef(null);

  const [products] = useState(fetchCustomizerProducts());

  const [customization, setCustomization] = useState({
    size: "M",
    color: "green",
    designImage: null,
    designPosition: { x: 150, y: 150 },
    designSize: { width: 100, height: 100 },
    rotation: 0,
    scale: [1, 1],
  });

  const [product, setProduct] = useState({
    id: productId,
    name: "Classic T-Shirt",
    baseImage: colorImageMap[customization.color],
    price: 29.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "yellow", "green", "orange", "red", "pink"],
  });

  const handleDesignUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setCustomization((prev) => ({
            ...prev,
            designImage: img,
            designSize: { width: 200, height: 200 },
            designPosition: { x: 150, y: 150 }, // Ensure default position is set
            rotation: 0,
            scale: [1, 1], // Ensure default scale is set
          }));

          // Force a slight delay to ensure Moveable detects the target
          setTimeout(() => {
            if (designWrapperRef.current) {
              designWrapperRef.current.style.transform = "none"; // Reset transform
            }
          }, 50);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalizeDesign = (e) => {
    e.preventDefault();
    // Ensure the canvas is updated before capturing
    setTimeout(() => {
      const mergedImage = canvasRef.current.toDataURL("image/png");
      const order = {
        product,
        customization,
        mergedImage,
      };
      props.onCustomization(order);

      // console.log("✅ Order Data:", order);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative z-0">
            <div className="flex">
              <Canvas
                ref={canvasRef}
                productBaseImage={colorImageMap[customization.color]}
                customization={customization}
              />
              <ProductSelector
                products={products}
                selectedProduct={product}
                onSelect={setProduct}
              />
              <DesignWrapper
                ref={designWrapperRef}
                customization={customization}
              />
              <MoveableWrapper
                customization={customization}
                setCustomization={setCustomization}
                targetRef={designWrapperRef}
              />
            </div>
          </div>
          <div className="w-full md:w-80 space-y-6">
            <ProductDetails
              product={product}
              customization={customization}
              setCustomization={setCustomization}
              onDesignUpload={handleDesignUpload}
              onFinilNow={handleFinalizeDesign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothCustomizer;
