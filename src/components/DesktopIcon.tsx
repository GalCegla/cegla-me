import { FC, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick?: () => void;
}

const DesktopIcon: FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deselect = () => setSelected(false);
    window.addEventListener("deselectAll", deselect);
    return () => window.removeEventListener("deselectAll", deselect);
  }, []);

  return (
    <Draggable nodeRef={nodeRef} onStart={() => setSelected(true)}>
      <div
        ref={nodeRef}
        onClick={(e) => {
          e.stopPropagation(); // prevents desktop click from firing deselectAll
          setSelected(true);
        }}
        onDoubleClick={onDoubleClick}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "4px",
          cursor: "default",
          userSelect: "none",
          width: "64px",
        }}
      >
        {/* Icon with blue overlay when selected */}
        <div style={{ position: "relative", display: "inline-block" }}>
          {icon}
          {selected && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 128, 0.4)",
                mixBlendMode: "multiply",
              }}
            />
          )}
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: "11px",
            textAlign: "center",
            wordBreak: "break-word",
            width: "100%",
            padding: "1px 2px",
            backgroundColor: selected ? "rgba(0, 0, 128, 0.8)" : "transparent",
            color: "white",
            outline: selected ? "1px dotted white" : "none",
            lineHeight: "1.2",
            textShadow: selected ? "none" : "1px 1px 1px black",
          }}
        >
          {label}
        </span>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
