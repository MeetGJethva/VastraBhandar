import React from "react";

import { useEffect } from "react";
import { drawDesign } from "./service";

const Canvas = React.forwardRef(({ productBaseImage, customization }, ref) => {
  
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const clothImage = new Image();
    clothImage.src = productBaseImage;
    
    clothImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(clothImage, 0, 0, canvas.width, canvas.height);

      if (customization.designImage?.src) {
        const designImg = new Image();
        designImg.src = customization.designImage.src;

        designImg.onload = () => {
          
          drawDesign(ctx, clothImage, customization, designImg);
        };
      }
    };
  }, [productBaseImage, JSON.stringify(customization), ref]); // Ensures updates


  return (
    <canvas
      ref={ref}
      width="400"
      height="500"
      className="border border-gray-600 dark:border-gray-700"
    />
  );
});

export default Canvas;