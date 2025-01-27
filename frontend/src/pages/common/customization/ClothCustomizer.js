import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Canvas from "./Canvas";
import DesignWrapper from "./DesignWrapper";
import MoveableWrapper from "./MoveableWrapper";
import ProductDetails from "./ProductDetails";
import redT from "../../../assets/images/t-sirts/green.png";

const ClothCustomizer = (props) => {
  const { productId } = useParams();
  const canvasRef = useRef(null);
  const designWrapperRef = useRef(null);

  const [product, setProduct] = useState({
    id: productId,
    name: "Classic T-Shirt",
    baseImage: redT,
    price: 29.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Navy"],
  });

  const [customization, setCustomization] = useState({
    size: "M",
    color: "White",
    designImage: null,
    designPosition: { x: 150, y: 150 },
    designSize: { width: 100, height: 100 },
    rotation: 0,
    scale: [1, 1],
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
          }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const mergedImage = canvasRef.current.toDataURL("image/png");
    const order = {
      product,
      customization,
      mergedImage,
    };
    props.onCustomization(order);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative">
            <Canvas
              ref={canvasRef}
              productBaseImage={product.baseImage}
              customization={customization}
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
          <div className="w-full md:w-80 space-y-6">
            <ProductDetails
              product={product}
              customization={customization}
              setCustomization={setCustomization}
              onDesignUpload={handleDesignUpload}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothCustomizer;
