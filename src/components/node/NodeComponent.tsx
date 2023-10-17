import { useState } from "react";
import { Node } from "../../models/Node";
import { XIcon, CheckIcon, PenIcon, PlusIcon } from "lucide-react";
import { colors } from "../../utils";

interface Props {
  node: Node;
  parent: Node | null;
  update: (v: any) => void;
  index: number;
}

export default function NodeComponent({ node, parent, update, index }: Props) {
  const [isEditMode, setIsEditMode] = useState(node.text.length === 0);
  const [editedText, setEditedText] = useState(node.text);

  function addChild() {
    if (!isEditMode) {
      const newNode: Node = new Node("");
      node.addChild(newNode);
      update({});
    }
  }

  function deleteChild() {
    if (parent && parent.children) {
      parent.deleteChild(node);
      update({});
    }
  }

  function saveEditedText() {
    if (editedText.length > 0) {
      node.text = editedText;
      setIsEditMode(false);
      update({});
    }
  }

  return (
    <li>
      <div className="content">
        {isEditMode ? (
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span
            style={{
              backgroundColor: colors[index % 10].bg,
              color: colors[index % 10].text,
            }}
          >
            {node.text}
          </span>
        )}
        <div
          className="btns"
          style={{ right: isEditMode ? "-55px" : parent ? "-80px" : "-30px" }}
        >
          {isEditMode ? (
            <>
              <button
                onClick={() => {
                  if (node.text.length === 0) {
                    deleteChild();
                  }
                  setIsEditMode(false);
                  setEditedText("");
                }}
                className="warning"
              >
                <XIcon />
              </button>
              <button onClick={saveEditedText} className="success">
                <CheckIcon />
              </button>
            </>
          ) : (
            <>
              <button onClick={addChild}>
                <PlusIcon />
              </button>
              {parent && (
                <>
                  <button onClick={() => setIsEditMode(true)}>
                    <PenIcon />
                  </button>
                  <button onClick={deleteChild} className="destructive">
                    <XIcon />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {node.children && (
        <ul>
          {node.children.map((child, idx) => (
            <NodeComponent
              key={idx}
              node={child}
              update={update}
              parent={node}
              index={index + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
