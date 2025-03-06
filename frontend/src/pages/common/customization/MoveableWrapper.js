import React, { useEffect, useState } from "react";

import Moveable from "react-moveable";

const MoveableWrapper = ({ customization, setCustomization, targetRef }) => {
  const [key, setKey] = useState(0); // forcefully rerender one time
  useEffect(() => {
    setKey((prev) => prev + 1); // only for force rerender
  }, [customization.designImage]);

  return (
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
          setCustomization((prev) => {
            const newWidth = prev.designSize.width + e.scale[0];
            const newHeight = prev.designSize.height + e.scale[1];

            return {
              ...prev,
              designSize: {
                width: newWidth,
                height: newHeight,
              },
              scale: e.scale, // Store scale values
            };
          });
        }}
        onRotate={(e) => {
          setCustomization((prev) => ({
            ...prev,
            rotation: e.rotation,
          }));
        }}
      />
    )
  );
};
export default MoveableWrapper;
