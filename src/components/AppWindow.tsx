import { CSSProperties, FC, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { Button, Window, WindowContent, WindowHeader } from "react95";

interface AppWindowProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

const AppWindow: FC<AppWindowProps> = ({ title, onClose, children, style }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header">
      <div
        ref={nodeRef}
        data-window="true"
        style={{
          position: "absolute",
          top: "calc(50vh - 300px)",
          left: "calc(50vw - 350px)",
          zIndex: 1,
        }}
      >
        <Resizable
          defaultSize={{
            width: style?.width || 700,
            height: style?.height || 500,
          }}
          minWidth={200}
          minHeight={150}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomLeft: false,
            topLeft: false,
            bottomRight: true,
          }}
          handleStyles={{
            bottomRight: {
              width: "40px",
              height: "40px",
              bottom: "0px",
              right: "0px",
              zIndex: 99999, // ← above react95's visual lines
              cursor: "nwse-resize",
            },
          }}
        >
          <Window resizable style={{ width: "100%", height: "100%" }}>
            <WindowHeader
              className="window-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "grab",
              }}
            >
              <span>{title}</span>
              <Button onClick={onClose}>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    marginLeft: "-1px",
                    marginTop: "-1px",
                    transform: "rotateZ(45deg)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "3px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "black",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      height: "3px",
                      width: "100%",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "black",
                    }}
                  />
                </span>
              </Button>
            </WindowHeader>
            <WindowContent
              style={{ height: "calc(100% - 45px)", overflow: "hidden" }}
            >
              {children}
            </WindowContent>
          </Window>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default AppWindow;
