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
}

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
