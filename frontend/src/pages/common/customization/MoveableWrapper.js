import React from "react";

import Moveable from "react-moveable";

const MoveableWrapper = ({ customization, setCustomization, targetRef }) =>
  customization.designImage && (
    <Moveable
      target={targetRef.current}
      draggable={true}
      scalable={true}
      rotatable={true}
      keepRatio={false}
      origin={false}
      onDrag={(e) => {
        setCustomization((prev) => ({
          ...prev,
          designPosition: {
            x: e.beforeTranslate[0],
            y: e.beforeTranslate[1],
          },
        }));
      }}
      onScale={(e) => {
        setCustomization((prev) => ({
          ...prev,
          designSize: {
            width: e.width,
            height: e.height,
          },
          scale: e.scale,
        }));
      }}
      onRotate={(e) => {
        setCustomization((prev) => ({
          ...prev,
          rotation: e.rotation,
        }));
      }}
    />
  );

export default MoveableWrapper;
