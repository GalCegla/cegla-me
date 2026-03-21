import { FC, useRef } from "react";
import Draggable from "react-draggable";

interface DesktopIconProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDoubleClick?: () => void;
}

const DesktopIcon: FC<DesktopIconProps> = ({
  id,
  icon,
  label,
  isSelected,
  onSelect,
  onDoubleClick,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} onStart={() => onSelect(id)}>
      <div
        ref={nodeRef}
        data-icon-id={id}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
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
        <div style={{ position: "relative", display: "inline-block" }}>
          {icon}
          {isSelected && (
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
        <span
          style={{
            fontSize: "11px",
            textAlign: "center",
            wordBreak: "break-word",
            width: "100%",
            padding: "1px 2px",
            backgroundColor: isSelected
              ? "rgba(0, 0, 128, 0.8)"
              : "transparent",
            color: "white",
            outline: isSelected ? "1px dotted white" : "none",
            lineHeight: "1.2",
            textShadow: isSelected ? "none" : "1px 1px 1px black",
          }}
        >
          {label}
        </span>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
