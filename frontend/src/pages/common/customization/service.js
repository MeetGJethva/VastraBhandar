export const drawDesign = (ctx, clothImage, customization, designImg) => {
    // Ensure that the base image is drawn first
    ctx.clearRect(0, 0, 400, 500); // Clear canvas before drawing again
    ctx.drawImage(clothImage, 0, 0, 400, 500);

    // If design exists, draw it with the given transformations
    if (designImg) {
      ctx.save();
      ctx.translate(
        customization.designPosition.x + customization.designSize.width / 2,
        customization.designPosition.y + customization.designSize.height / 2
      );
      ctx.rotate((customization.rotation * Math.PI) / 180);
      ctx.scale(customization.scale[0], customization.scale[1]);
      ctx.drawImage(
        designImg,
        -customization.designSize.width / 2,
        -customization.designSize.height / 2,
        customization.designSize.width,
        customization.designSize.height
      );
      ctx.restore();
    }
  };