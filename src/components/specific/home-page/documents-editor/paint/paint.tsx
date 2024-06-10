import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { KonvaEventObject } from "konva/lib/Node";

import useImage from "../../../../../hooks/useImage";
import Canvas from "../canvas/canvas";
import Toolbox from "../toolbox/toolbox";
import Controls from "../controls/controls";
import { DrawAction } from "../canvas/canvas.constants";
import { Arrow, Circle, Rectangle, Scribble, TextNode } from "./paint.types";

interface PaintProps {
  imageUrl?: string;
}

const downloadURI = (uri: string | undefined, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri || "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SIZE = 800;

const Paint: React.FC<PaintProps> = React.memo(function Paint({ imageUrl }) {
  const [color, setColor] = useState("#000");
  const [drawAction, setDrawAction] = useState<DrawAction>(DrawAction.Select);
  const [scribbles, setScribbles] = useState<Scribble[]>([]);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [texts, setTexts] = useState<TextNode[]>([]);

  const [image] = useImage(imageUrl);
  const transformerRef = useRef<any>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const onImportImageClick = useCallback(() => {
    fileRef?.current && fileRef?.current?.click();
  }, []);

  const stageRef = useRef<any>(null);

  const onExportClick = useCallback(() => {
    const dataUri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    downloadURI(dataUri, "image.png");
  }, []);

  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction !== DrawAction.Select) return;
      const currentTarget = e.currentTarget;
      transformerRef?.current?.node(currentTarget);
      setSelectedShapeId(currentTarget.id()); // Set the ID of the selected shape
    },
    [drawAction]
  );

  const onClear = useCallback(() => {
    if (selectedShapeId) {
      transformerRef.current.detach();
      setRectangles((prevRectangles) =>
        prevRectangles.filter((rect) => rect.id !== selectedShapeId)
      );
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle.id !== selectedShapeId)
      );
      setScribbles((prevScribbles) =>
        prevScribbles.filter((scribble) => scribble.id !== selectedShapeId)
      );
      setArrows((prevArrows) =>
        prevArrows.filter((arrow) => arrow.id !== selectedShapeId)
      );
      setTexts((prevTexts) =>
        prevTexts.filter((text) => text.id !== selectedShapeId)
      );
      setSelectedShapeId(null); // Clear the selected shape ID after removing it
    }
  }, [selectedShapeId, transformerRef]);

  const isPaintRef = useRef(false);

  const onStageMouseUp = useCallback(() => {
    isPaintRef.current = false;
  }, []);

  const currentShapeRef = useRef<string>();

  const onStageMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction === DrawAction.Select) return;
      isPaintRef.current = true;
      const stage = stageRef?.current;
      const pos = stage?.getPointerPosition();
      const x = pos?.x || 0;
      const y = pos?.y || 0;
      const id = uuidv4();
      currentShapeRef.current = id;

      switch (drawAction) {
        case DrawAction.Scribble: {
          setScribbles((prevScribbles) => [
            ...prevScribbles,
            {
              id,
              points: [x, y],
              color,
            },
          ]);
          break;
        }
        case DrawAction.Circle: {
          setCircles((prevCircles) => [
            ...prevCircles,
            {
              id,
              radius: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        }
        case DrawAction.Rectangle: {
          setRectangles((prevRectangles) => [
            ...prevRectangles,
            {
              id,
              height: 1,
              width: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        }
        case DrawAction.Arrow: {
          setArrows((prevArrows) => [
            ...prevArrows,
            {
              id,
              points: [x, y, x, y],
              color,
            },
          ]);
          break;
        }
        case DrawAction.TextNode: {
          const newText: TextNode = {
            id,
            x,
            y,
            color,
            content: "Sample Text",
            fontSize: 18, // Default font size
          };
          setTexts((prevTexts) => [...prevTexts, newText]);
          break;
        }
      }
    },
    [drawAction, color]
  );

  const onStageMouseMove = useCallback(() => {
    if (drawAction === DrawAction.Select || !isPaintRef.current) return;

    const stage = stageRef?.current;
    const id = currentShapeRef.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case DrawAction.Scribble: {
        setScribbles((prevScribbles) =>
          prevScribbles?.map((prevScribble) =>
            prevScribble.id === id
              ? {
                  ...prevScribble,
                  points: [...prevScribble.points, x, y],
                }
              : prevScribble
          )
        );
        break;
      }
      case DrawAction.Circle: {
        setCircles((prevCircles) =>
          prevCircles?.map((prevCircle) =>
            prevCircle.id === id
              ? {
                  ...prevCircle,
                  radius:
                    ((x - prevCircle.x) ** 2 + (y - prevCircle.y) ** 2) ** 0.5,
                }
              : prevCircle
          )
        );
        break;
      }
      case DrawAction.Rectangle: {
        setRectangles((prevRectangles) =>
          prevRectangles?.map((prevRectangle) =>
            prevRectangle.id === id
              ? {
                  ...prevRectangle,
                  height: y - prevRectangle.y,
                  width: x - prevRectangle.x,
                }
              : prevRectangle
          )
        );
        break;
      }
      case DrawAction.Arrow: {
        setArrows((prevArrows) =>
          prevArrows.map((prevArrow) =>
            prevArrow.id === id
              ? {
                  ...prevArrow,
                  points: [prevArrow.points[0], prevArrow.points[1], x, y],
                }
              : prevArrow
          )
        );
        break;
      }
    }
  }, [drawAction]);

  const isDraggable = drawAction === DrawAction.Select;

  const onBgClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      transformerRef?.current?.nodes([]);
    },
    [drawAction]
  );

  return (
    <div>
      <Controls
        onImportImageClick={onImportImageClick}
        onExportClick={onExportClick}
        fileRef={fileRef}
      />
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <Toolbox
            color={color}
            setColor={setColor}
            drawAction={drawAction}
            setDrawAction={setDrawAction}
            onClear={onClear}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Canvas
            SIZE={SIZE}
            stageRef={stageRef}
            transformerRef={transformerRef}
            image={image || undefined}
            isDraggable={isDraggable}
            scribbles={scribbles}
            rectangles={rectangles}
            circles={circles}
            arrows={arrows}
            texts={texts}
            onBgClick={onBgClick}
            onShapeClick={onShapeClick}
            onStageMouseUp={onStageMouseUp}
            onStageMouseDown={onStageMouseDown}
            onStageMouseMove={onStageMouseMove}
          />
        </div>
      </div>
    </div>
  );
});

export default Paint;
