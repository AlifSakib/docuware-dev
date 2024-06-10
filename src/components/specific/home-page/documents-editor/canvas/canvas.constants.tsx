import { FcCursor } from "react-icons/fc";
import { MdOutlineRectangle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbScribble } from "react-icons/tb";
import { RiText } from "react-icons/ri";

export enum DrawAction {
  Select = "select",
  Rectangle = "rectangle",
  Circle = "circle",
  Scribble = "freedraw",
  Arrow = "arrow",
  TextNode = "text",
}

export const PAINT_OPTIONS = [
  {
    id: DrawAction.Select,
    label: "Select Shapes",
    icon: <FcCursor />,
  },
  {
    id: DrawAction.Rectangle,
    label: "Draw Rectangle Shape",
    icon: <MdOutlineRectangle />,
  },
  { id: DrawAction.Circle, label: "Draw Cirle Shape", icon: <FaRegCircle /> },
  {
    id: DrawAction.Arrow,
    label: "Draw Arrow Shape",
    icon: <FaArrowRightLong />,
  },
  { id: DrawAction.Scribble, label: "Scribble", icon: <TbScribble /> },
  { id: DrawAction.TextNode, label: "Text", icon: <RiText /> },
];
