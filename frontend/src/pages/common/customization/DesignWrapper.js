import React from "react";

const DesignWrapper = React.forwardRef(
  ({ customization }, ref) =>
    customization.designImage && (
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: customization.designPosition.y,
          left: customization.designPosition.x,
          width: customization.designSize.width,
          height: customization.designSize.height,
          transform: `rotate(${customization.rotation}deg) scale(${customization.scale[0]}, ${customization.scale[1]})`,
          transformOrigin: "center",
        }}
      >
        <img
          src={customization.designImage.src}
          alt="Uploaded Design"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    )
);

export default DesignWrapper;
