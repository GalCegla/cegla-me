import { FC, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import {
  Button,
  ScrollView,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

interface AppWindowProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  scrollable?: boolean; // ← new prop
}

const AppWindow: FC<AppWindowProps> = ({
  title,
  onClose,
  children,
  scrollable = false,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header">
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          top: "calc(50vh - 300px)",
          left: "calc(50vw - 200px)",
        }}
      >
        <Resizable
          defaultSize={{ width: 400, height: 300 }}
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
              width: "20px",
              height: "20px",
              bottom: "0px",
              right: "0px",
              zIndex: 999,
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
            <WindowContent style={{ height: "calc(100% - 45px)", padding: 0 }}>
              {scrollable ? (
                <ScrollView style={{ width: "100%", height: "100%" }}>
                  {children}
                </ScrollView>
              ) : (
                children
              )}
            </WindowContent>
          </Window>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default AppWindow;
