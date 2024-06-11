import React, { useCallback, useState } from "react";
import { SketchPicker } from "react-color";
import { DrawAction, PAINT_OPTIONS } from "../canvas/canvas.constants";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { ImCross } from "react-icons/im";
import styles from "./toolbox.module.css";

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
  const [annotationOpen, setAnnotationOpen] = useState(false);

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
    <div className={styles.toolbarDiv}>
      <div
        className={styles["dw-Toolbar"]}
        onClick={() => setAnnotationOpen(!annotationOpen)}
      >
        <p className={styles["ui-widget-header"]}>Annotation</p>

        {annotationOpen ? (
          <SlArrowUp size={10} className={styles["ui-annotation-tools"]} />
        ) : (
          <SlArrowDown size={10} className={styles["ui-annotation-tools"]} />
        )}
      </div>
      {annotationOpen && (
        <div className={styles["ui-annotation-tools"]}>
          {PAINT_OPTIONS.map(({ id, label, icon }) => (
            <div
              className={styles["ui-annotation-tool"]}
              key={id}
              title={label}
              onClick={() => setDrawAction(id)}
              style={{
                backgroundColor: drawAction === id ? "#81caf3" : "white",
                border: drawAction === id ? "1px solid #0089cf" : "none",
                padding: "2px",
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      )}
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

        <ImCross size={10} aria-label={"Clear"} onClick={() => handleClear()} />
      </div>
    </div>
  );
};

export default Toolbox;
