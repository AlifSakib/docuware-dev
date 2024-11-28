import React from "react";
import {
  Stage,
  Layer,
  Rect as KonvaRect,
  Image as KonvaImage,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Text as KonvaText,
  Transformer,
} from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  Arrow,
  Circle,
  Rectangle,
  Scribble,
  TextNode,
} from "../paint/paint.types";
import { DrawAction } from "./canvas.constants";

interface CanvasProps {
  SIZE: number;
  stageRef: React.RefObject<never>;
  transformerRef: React.RefObject<never>;
  image?: HTMLImageElement;
  isDraggable: boolean;
  scribbles: Scribble[];
  rectangles: Rectangle[];
  circles: Circle[];
  arrows: Arrow[];
  textAreas: TextNode[];
  setTextAreas: React.Dispatch<React.SetStateAction<TextNode[]>>;
  handleTextChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  drawAction: string;
  onBgClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onStageMouseUp: () => void;
  onStageMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  onStageMouseMove: () => void;
  rotation: number;
  scale: number;
}

const Canvas: React.FC<CanvasProps> = ({
  SIZE,
  stageRef,
  transformerRef,
  image,
  isDraggable,
  scribbles,
  rectangles,
  circles,
  arrows,
  textAreas,
  drawAction,
  setTextAreas,
  handleTextChange,
  onBgClick,
  onShapeClick,
  onStageMouseUp,
  onStageMouseDown,
  onStageMouseMove,
  rotation,
  scale,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid black",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stage
        height={SIZE + 50}
        width={SIZE}
        ref={stageRef}
        onMouseUp={onStageMouseUp}
        onMouseDown={onStageMouseDown}
        onMouseMove={onStageMouseMove}
      >
        <Layer>
          <KonvaRect
            x={0}
            y={0}
            height={SIZE}
            width={SIZE}
            fill="white"
            id="bg"
            onClick={onBgClick}
          />
          {image && (
            <KonvaImage
              image={image}
              x={0}
              y={0}
              height={SIZE}
              width={SIZE}
              rotation={rotation}
              scaleX={scale}
              scaleY={scale}
              // draggable={isDraggable}
            />
          )}
          {arrows.map((arrow) => (
            <KonvaArrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.color}
              stroke={arrow.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {rectangles.map((rectangle) => (
            <KonvaRect
              key={rectangle.id}
              x={rectangle.x}
              y={rectangle.y}
              height={rectangle.height}
              width={rectangle.width}
              stroke={rectangle.color}
              id={rectangle.id}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {circles.map((circle) => (
            <KonvaCircle
              key={circle.id}
              id={circle.id}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke={circle.color}
              strokeWidth={4}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {scribbles.map((scribble) => (
            <KonvaLine
              key={scribble.id}
              id={scribble.id}
              lineCap="round"
              lineJoin="round"
              stroke={scribble.color}
              strokeWidth={4}
              points={scribble.points}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}

          {textAreas.map((textArea) => (
            <KonvaText
              key={textArea.id}
              x={textArea.x}
              y={textArea.y}
              text={textArea.text}
              id={textArea.id}
              draggable
              onClick={onShapeClick}
              onDblClick={() => {
                const newTextAreas = [...textAreas];
                const index = newTextAreas.findIndex(
                  (area) => area.id === textArea.id
                );
                newTextAreas[index].isEditing = true;
                setTextAreas(newTextAreas);
              }}
              fontSize={16}
            />
          ))}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>

      {drawAction === DrawAction.TextNode &&
        textAreas.map(
          (textArea) =>
            textArea.isEditing && (
              <textarea
                key={textArea.id}
                style={{
                  position: "absolute",
                  top: textArea.y,
                  left: textArea.x,
                  zIndex: 10,
                }}
                value={textArea.text}
                onChange={(e) => handleTextChange(e, textArea.id)}
              />
            )
        )}
    </div>
  );
};

export default Canvas;
