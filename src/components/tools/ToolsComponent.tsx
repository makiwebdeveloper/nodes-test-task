import { DirectionType } from "../../types";
import "./Tools.css";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  BoxIcon,
} from "lucide-react";

interface Props {
  increase: () => void;
  decrease: () => void;
  center: () => void;
  moveBoard: (diretcion: DirectionType) => void;
}

export default function ToolsComponent(props: Props) {
  return (
    <>
      <div className="tools">
        <button onClick={props.increase}>
          <PlusIcon />
        </button>
        <button onClick={props.decrease}>
          <MinusIcon />
        </button>
        <button onClick={props.center}>
          <BoxIcon />
        </button>
      </div>
      <button className="moveLeft" onClick={() => props.moveBoard("left")}>
        <ChevronLeftIcon />
      </button>
      <button className="moveRight" onClick={() => props.moveBoard("right")}>
        <ChevronRightIcon />
      </button>
      <button className="moveDown" onClick={() => props.moveBoard("down")}>
        <ChevronDownIcon />
      </button>
      <button className="moveUp" onClick={() => props.moveBoard("up")}>
        <ChevronUpIcon />
      </button>
    </>
  );
}
