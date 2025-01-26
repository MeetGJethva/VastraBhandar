import React from "react";

import { useEffect } from "react";
const Canvas = React.forwardRef(({ productBaseImage, customization }, ref) => {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const clothImage = new Image();
    clothImage.src = productBaseImage;
    clothImage.onload = () => {
      ctx.drawImage(clothImage, 0, 0, canvas.width, canvas.height);
      if (customization.designImage) {
        drawDesign(ctx, clothImage, customization);
      }
    };
  }, [productBaseImage, customization, ref]);

  const drawDesign = (ctx, clothImage, customization) => {
    ctx.clearRect(0, 0, 400, 500);
    ctx.drawImage(clothImage, 0, 0, 400, 500);

    if (customization.designImage) {
      ctx.save();
      ctx.translate(
        customization.designPosition.x + customization.designSize.width / 2,
        customization.designPosition.y + customization.designSize.height / 2
      );
      ctx.rotate((customization.rotation * Math.PI) / 180);
      ctx.scale(customization.scale[0], customization.scale[1]);
      ctx.drawImage(
        customization.designImage,
        -customization.designSize.width / 2,
        -customization.designSize.height / 2,
        customization.designSize.width,
        customization.designSize.height
      );
      ctx.restore();
    }
  };

  return (
    <canvas
      ref={ref}
      width="400"
      height="500"
      className="border border-gray-200 dark:border-gray-700"
    />
  );
});

export default Canvas;
