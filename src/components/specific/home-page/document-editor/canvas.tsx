import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect as KonvaRect,
  Image as KonvaImage,
  Text,
} from "react-konva";
import useImage from "../../../../hooks/useImage";

const Paint = ({ imageUrl, rotation, scale }) => {
  const [image] = useImage(imageUrl);
  const [isAddingText, setIsAddingText] = useState(false);
  const [texts, setTexts] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => {
    const handleDblClick = (textNode, index) => {
      const textPosition = textNode.getAbsolutePosition();
      const stageBox = stageRef.current.container().getBoundingClientRect();
      const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = "absolute";
      textarea.style.top = `${areaPosition.y}px`;
      textarea.style.left = `${areaPosition.x}px`;
      textarea.style.width = `${textNode.width()}px`;

      textarea.focus();

      textarea.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          const updatedTexts = texts.slice();
          updatedTexts[index] = {
            ...updatedTexts[index],
            text: textarea.value,
          };
          setTexts(updatedTexts);
          document.body.removeChild(textarea);
        }
      });
    };

    texts.forEach((text, index) => {
      const textNode = text.ref.current;
      textNode.on("dblclick dbltap", () => handleDblClick(textNode, index));
    });

    return () => {
      texts.forEach((text) => {
        const textNode = text.ref.current;
        textNode.off("dblclick dbltap");
      });
    };
  }, [texts]);

  const SIZE = 800;

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e) => {
    if (!isAddingText) return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const newText = {
      text: "New Text",
      x: pointerPosition.x,
      y: pointerPosition.y,
      ref: React.createRef(),
    };

    setTexts([...texts, newText]);
    setIsAddingText(false); // Turn off adding mode after adding a text
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid black",
        overflow: "hidden",
      }}
    >
      <div>
        <input type="file" onChange={uploadImage} />
        <button onClick={() => setIsAddingText(!isAddingText)}>
          {isAddingText ? "Cancel Adding Text" : "Add Text"}
        </button>
      </div>
      <Stage
        height={SIZE}
        width={SIZE}
        ref={stageRef}
        onClick={handleCanvasClick}
      >
        <Layer>
          <KonvaRect
            x={0}
            y={0}
            height={SIZE}
            width={SIZE}
            fill="white"
            id="bg"
          />
          {image && (
            <KonvaImage image={image} x={0} y={0} height={SIZE} width={SIZE} />
          )}
          {texts.map((text, index) => (
            <Text
              key={index}
              text={text.text}
              x={text.x}
              y={text.y}
              fontSize={20}
              ref={text.ref}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Paint;
