import { MdOutlineRectangle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { TbScribble } from "react-icons/tb";
import { RiCursorFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { BiText } from "react-icons/bi";
import { LuHighlighter } from "react-icons/lu";
import { MdOutlineCallMade } from "react-icons/md";
import { GiStraightPipe } from "react-icons/gi";
import { MdRectangle } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { HiOutlineMinusCircle } from "react-icons/hi";

export enum DrawAction {
  Select = "select",
  Rectangle = "rectangle",
  Circle = "circle",
  Scribble = "freedraw",
  Arrow = "arrow",
  Line = "line",
  TextNode = "text",
  Clear = "remove",
  Highlight = "highlight",
  SolidRectangle = "solid-rectangle",
  Rorate_Left = "rotate-left",
  Rorate_Right = "rotate-right",
  Zoom_In = "zoom-in",
  Zoom_Out = "zoom-out",
  initial_layer = "initial-layer",
  secondary_layer = "secondary-layer",
}

// export enum DisplayAction {
//   Rorate_Left = "rotate-left",
//   Rorate_Right = "rotate-right",
//   Zoom_In = "zoom-in",
//   Zoom_Out = "zoom-out",
// }

export const PAINT_OPTIONS = [
  {
    id: DrawAction.Select,
    label: "Select Shapes",
    icon: <RiCursorFill size={16} />,
  },
  { id: DrawAction.Clear, label: "Remove", icon: <ImCross size={16} /> },
  { id: DrawAction.TextNode, label: "Text", icon: <BiText size={16} /> },
  {
    id: DrawAction.Highlight,
    label: "Highlight",
    icon: <LuHighlighter size={16} />,
  },
  {
    id: DrawAction.Scribble,
    label: "Free Draw",
    icon: <TbScribble size={16} />,
  },
  {
    id: DrawAction.Line,
    label: "Draw Line Shape",
    icon: <GiStraightPipe size={16} />,
  },
  {
    id: DrawAction.Arrow,
    label: "Draw Arrow Shape",
    icon: <MdOutlineCallMade size={16} />,
  },
  {
    id: DrawAction.Rectangle,
    label: "Draw Rectangle Shape",
    icon: <MdOutlineRectangle size={16} />,
  },
  {
    id: DrawAction.SolidRectangle,
    label: "Draw Rectangle Shape",
    icon: <MdRectangle size={16} />,
  },
  {
    id: DrawAction.Circle,
    label: "Draw Cirle Shape",
    icon: <FaRegCircle size={16} />,
  },
];

export const DISPLAY_OPTIONS = [
  {
    id: DrawAction.Rorate_Left,
    label: "Rotate Left",
    icon: <FaArrowRotateLeft size={16} />,
  },
  {
    id: DrawAction.Rorate_Right,
    label: "Rotate Right",
    icon: <FaArrowRotateRight size={16} />,
  },
  {
    id: DrawAction.Zoom_In,
    label: "Zoom In",
    icon: <HiOutlinePlusCircle size={16} />,
  },
  {
    id: DrawAction.Zoom_Out,
    label: "Zoom Out",
    icon: <HiOutlineMinusCircle size={16} />,
  },
];
