import "./Tree.css";
import NodeComponent from "../node/NodeComponent";
import { Node } from "../../models/Node";

interface Props {
  treeRef: React.MutableRefObject<HTMLDivElement | null>;
  zoom: number;
  tree: Node[];
  update: (v: any) => void;
  isDragging: boolean;
}

export default function TreeComponent({
  treeRef,
  tree,
  zoom,
  update,
  isDragging,
}: Props) {
  return (
    <div
      ref={treeRef}
      className="tree"
      style={{
        transition: isDragging ? "0s" : "0.2s",
      }}
    >
      <ul
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        {tree.map((node, idx) => (
          <NodeComponent
            node={node}
            parent={null}
            update={update}
            key={idx}
            index={0}
          />
        ))}
      </ul>
    </div>
  );
}
