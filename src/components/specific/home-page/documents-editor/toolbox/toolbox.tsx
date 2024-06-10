import React, { useCallback, useState } from "react";
import { SketchPicker } from "react-color";
import { DrawAction, PAINT_OPTIONS } from "../canvas/canvas.constants";

interface ToolboxProps {
  color: string;
  setColor: (color: string) => void;
  drawAction: DrawAction;
  setDrawAction: (action: DrawAction) => void;
  onClear: (shapeType?: DrawAction) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  color,
  setColor,
  drawAction,
  setDrawAction,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClear = useCallback(() => {
    onClear(); // Just call onClear without any parameters
  }, [onClear]);

  console.log(drawAction);

  return (
    <div
      style={{
        width: "130px",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <strong>Annotation</strong>
        <button>
          <strong>+</strong>
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
        }}
      >
        {PAINT_OPTIONS.map(({ id, label, icon }) => (
          <button
            key={id}
            title={label}
            onClick={() => setDrawAction(id)}
            style={{
              backgroundColor: drawAction === id ? "lightblue" : "white",
              border: "none",
              padding: "6px",
            }}
          >
            {icon}
          </button>
        ))}
      </div>
      <div
        className="popover"
        style={{
          display: "flex",
          gap: "6px",
          marginLeft: "6px",
        }}
      >
        <div
          className="popover-trigger"
          style={{
            backgroundColor: color,
            height: "22px",
            width: "22px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        ></div>
        {isOpen && (
          <div
            className="popover-content"
            style={{
              width: "300px",
              position: "absolute",
              zIndex: 1,
              top: "0px",
            }}
          >
            <button className="popover-close-button" onClick={handleClose}>
              Close
            </button>
            <SketchPicker
              color={color}
              onChangeComplete={(selectedColor) => setColor(selectedColor.hex)}
            />
          </div>
        )}
        <button aria-label={"Clear"} onClick={() => handleClear()}>
          x
        </button>
      </div>
    </div>
  );
};

export default Toolbox;
