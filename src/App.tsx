import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Node } from "./models/Node";
import { ToolsComponent, TreeComponent } from "./components";
import { DirectionType } from "./types";

export default function App() {
  const [treeData] = useState<Node[]>([new Node("Root")]);
  const [, update] = useState();
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetCoordinates, setOffsetCoordinates] = useState({ x: 0, y: 0 });
  const [initialCoordinates, setInitialCoordinates] = useState({ x: 0, y: 0 });

  const treeRef = useRef<HTMLDivElement | null>(null);

  function increaseZoom() {
    setZoom((prev) => prev + 0.3);
  }

  function decreaseZoom() {
    setZoom((prev) => prev - 0.3);
  }

  function centering() {
    if (!treeRef.current) return;
    treeRef.current.style.left = initialCoordinates.x + "px";
    treeRef.current.style.top = initialCoordinates.y + "px";
  }

  function moveBoard(direction: DirectionType) {
    if (!treeRef.current) return;
    switch (direction) {
      case "up":
        treeRef.current.style.top = treeRef.current.offsetTop + 50 + "px";
        break;
      case "down":
        treeRef.current.style.top = treeRef.current.offsetTop - 50 + "px";
        break;
      case "left":
        treeRef.current.style.left = treeRef.current.offsetLeft + 50 + "px";
        break;
      case "right":
        treeRef.current.style.left = treeRef.current.offsetLeft - 50 + "px";
        break;
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!treeRef.current) return;
    /* @ts-ignore */
    if (e.target.tagName !== "INPUT") {
      setIsDragging(true);
      setOffsetCoordinates({
        x: e.clientX - treeRef.current.offsetLeft,
        y: e.clientY - treeRef.current.offsetTop,
      });
    }
  };

  const handleMouseUp = () => {
    if (!treeRef.current) return;
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!treeRef.current) return;
    if (isDragging) {
      const x = e.clientX - offsetCoordinates.x;
      const y = e.clientY - offsetCoordinates.y;
      treeRef.current.style.left = x + "px";
      treeRef.current.style.top = y + "px";
    }
  };

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.style.left = treeRef.current.offsetLeft - 50 + "px";
      setInitialCoordinates({
        x: treeRef.current.offsetLeft - 50,
        y: treeRef.current.offsetTop,
      });
    }
  }, []);

  return (
    <div
      style={{ position: "relative", cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <ToolsComponent
        increase={increaseZoom}
        decrease={decreaseZoom}
        center={centering}
        moveBoard={moveBoard}
      />
      <div className="wrapper">
        <TreeComponent
          tree={treeData}
          treeRef={treeRef}
          zoom={zoom}
          update={update}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
}
