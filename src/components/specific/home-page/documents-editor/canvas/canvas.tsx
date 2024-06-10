import React, { useEffect } from "react";
import {
  Stage,
  Layer,
  Rect as KonvaRect,
  Image as KonvaImage,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Transformer,
  Text,
} from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import {
  Arrow,
  Circle,
  Rectangle,
  Scribble,
  TextNode,
} from "../paint/paint.types";

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
  texts: TextNode[];
  onBgClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onStageMouseUp: () => void;
  onStageMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  onStageMouseMove: () => void;
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
  texts,
  textareaRef,
  onBgClick,
  onShapeClick,
  onStageMouseUp,
  onStageMouseDown,
  onStageMouseMove,
}) => {
  return (
    <Stage
      height={SIZE}
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
            height={SIZE / 2}
            width={SIZE / 2}
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

        {texts.map((text) => (
          <Text
            key={text.id}
            id={text.id}
            x={text.x}
            y={text.y}
            text={text.content}
            fontSize={text.fontSize}
            fill={text.color}
            draggable
            onClick={onShapeClick} // Add click handler if needed
          />
        ))}

        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default Canvas;
