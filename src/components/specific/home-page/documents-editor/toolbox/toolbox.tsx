import React, { useCallback, useState } from "react";
import { SketchPicker } from "react-color";
import {
  DISPLAY_OPTIONS,
  DrawAction,
  PAINT_OPTIONS,
} from "../canvas/canvas.constants";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { ImCross } from "react-icons/im";
import styles from "./toolbox.module.css";
import { PiNumberSquareOneFill } from "react-icons/pi";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa6";

interface ToolboxProps {
  color: string;
  setColor: (color: string) => void;
  drawAction: DrawAction;
  setDrawAction: (action: DrawAction) => void;
  onClear: (shapeType?: DrawAction) => void;

  currentPage: number;
  totalImages: number;
  nextPage: () => void;
  prevPage: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomPercentage: number;
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedLayers: string[];
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>;
  activeLayer: string | null;
  setActiveLayer: React.Dispatch<React.SetStateAction<string | null>>;
}

const Toolbox: React.FC<ToolboxProps> = ({
  color,
  setColor,
  drawAction,
  setDrawAction,
  onClear,
  currentPage,
  totalImages,
  nextPage,
  prevPage,
  rotateLeft,
  rotateRight,
  zoomIn,
  zoomOut,
  zoomPercentage,
  handleZoomChange,
  selectedLayers,
  setSelectedLayers,
  activeLayer,
  setActiveLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tools, setTools] = useState({
    annotation_options: false,
    display_options: false,
  });
  // const [selectedLayers, setSelectedLayers] = useState(["layer1"]);
  // const [activeLayer, setActiveLayer] = useState<string | null>("layer1");

  // const [layer, setlayer] = useState({
  //   layer1: {
  //     selected: false,
  //     active: false,
  //   },
  //   layer2: {
  //     selected: false,
  //     active: false,
  //   },
  // });

  const toggleLayer = (layer) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layer)) {
        const newSelectedLayers = prevSelectedLayers.filter((l) => l !== layer);

        // If the active layer is being deselected
        if (activeLayer === layer) {
          // If there are other selected layers, set the active layer to one of them
          setActiveLayer(
            newSelectedLayers.length > 0 ? newSelectedLayers[0] : null
          );
        }

        return newSelectedLayers;
      } else {
        setActiveLayer(layer);
        return [...prevSelectedLayers, layer];
      }
    });
  };

  console.log(selectedLayers, activeLayer);

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
      <div>
        <div
          className={styles["dw-Toolbar"]}
          onClick={() =>
            setTools({
              ...tools,
              display_options: !tools.display_options,
            })
          }
        >
          <p className={styles["ui-widget-header"]}>Display</p>

          {tools.display_options ? (
            <SlArrowUp size={10} className={styles["ui-annotation-tools"]} />
          ) : (
            <SlArrowDown size={10} className={styles["ui-annotation-tools"]} />
          )}
        </div>

        {tools.display_options && (
          <div className={styles["ui-annotation-tools"]}>
            {DISPLAY_OPTIONS.map(({ id, label, icon }) => (
              <div>
                <div
                  className={styles["ui-annotation-tool"]}
                  key={id}
                  title={label}
                  onClick={() => {
                    setDrawAction(id);
                    switch (id) {
                      case DrawAction.Rorate_Left:
                        rotateLeft();
                        break;
                      case DrawAction.Rorate_Right:
                        rotateRight();
                        break;
                      case DrawAction.Zoom_In:
                        zoomIn();
                        break;
                      case DrawAction.Zoom_Out:
                        zoomOut();
                        break;
                    }
                  }}
                  style={{
                    backgroundColor: drawAction === id ? "#81caf3" : "white",
                    border: drawAction === id ? "1px solid #0089cf" : "none",
                    padding: "2px",
                  }}
                >
                  {icon}
                </div>
              </div>
            ))}

            <button
              onClick={() => toggleLayer("layer1")}
              style={{
                backgroundColor: selectedLayers.includes("layer1")
                  ? "green"
                  : "red",
                color: "white",
              }}
            >
              {activeLayer === "layer1" ? "🖊️ 1" : "1"}
            </button>
            <button
              onClick={() => toggleLayer("layer2")}
              style={{
                backgroundColor: selectedLayers.includes("layer2")
                  ? "green"
                  : "red",
                color: "white",
              }}
            >
              {activeLayer === "layer2" ? "🖊️ 2" : "2"}
            </button>
          </div>
        )}
      </div>
      <div>
        <div
          className={styles["dw-Toolbar"]}
          onClick={() =>
            setTools({
              ...tools,
              annotation_options: !tools.annotation_options,
            })
          }
        >
          <p className={styles["ui-widget-header"]}>Annotation</p>

          {tools.annotation_options ? (
            <SlArrowUp size={10} className={styles["ui-annotation-tools"]} />
          ) : (
            <SlArrowDown size={10} className={styles["ui-annotation-tools"]} />
          )}
        </div>

        {tools.annotation_options && (
          <div className={styles["ui-annotation-tools"]}>
            {PAINT_OPTIONS.map(({ id, label, icon }) => (
              <div
                className={styles["ui-annotation-tool"]}
                key={id}
                title={label}
                onClick={
                  id === DrawAction.Clear
                    ? handleClear
                    : () => setDrawAction(id)
                }
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
      </div>

      {/* <div
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
      </div> */}
    </div>
  );
};

export default Toolbox;
