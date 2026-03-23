import { Box, CssBaseline } from "@material-ui/core";
import AppWindow from "components/AppWindow";
import DesktopIcon from "components/DesktopIcon";
import CV from "consts/cv";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UnnamedIcon, WindowsShutDown } from "react-old-icons";
import {
  AppBar,
  Button,
  GroupBox,
  MenuList,
  MenuListItem,
  ScrollView,
  Separator,
  Tab,
  TabBody,
  Tabs,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

interface SelectionRect {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type ShutdownAction = "shutdown" | "restart" | "sleep";

const IndexPage: FC = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionRect, setSelectionRect] = useState<SelectionRect | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState(0);
  const isDrawing = useRef(false);
  const isDraggingIcon = useRef(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [shutdownDialogOpen, setShutdownDialogOpen] = useState(false);
  const [shutdownAction, setShutdownAction] =
    useState<ShutdownAction>("shutdown");
  const [systemOverlay, setSystemOverlay] = useState<
    "running" | "bsod" | "goodbye"
  >("running");
  const [stopCode, setStopCode] = useState<string>("STOP: 0x00000000");

  const openCV = useCallback(() => setCvOpen(true), []);
  const closeCV = useCallback(() => setCvOpen(false), []);
  const openCoffee = useCallback(() => setCoffeeOpen(true), []);
  const closeCoffee = useCallback(() => setCoffeeOpen(false), []);
  // const openCoffeeBlog = useCallback(() => router.push("/coffee"), [router]);
  const handleTabChange = useCallback(
    (value: number) => setActiveTab(value),
    [],
  );
  const handleSelect = useCallback(
    (id: string) => setSelectedIds(new Set([id])),
    [],
  );

  const handleDesktopMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        (e.target as HTMLElement).closest("[data-start-menu='true']") ||
        (e.target as HTMLElement).closest("[data-start-button='true']") ||
        (e.target as HTMLElement).closest("[data-shutdown-dialog='true']") ||
        (e.target as HTMLElement).closest("[data-system-overlay='true']")
      ) {
        return;
      }
      if ((e.target as HTMLElement).closest("[data-icon-id]")) {
        isDraggingIcon.current = true;
        return;
      }
      if (
        (e.target as HTMLElement).closest("[data-window='true']") ||
        (e.target as HTMLElement).closest("[data-testid='resizeHandle']")
      ) {
        return;
      }
      isDraggingIcon.current = false;
      isDrawing.current = true;
      setSelectedIds(new Set());
      const rect = desktopRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSelectionRect({ startX: x, startY: y, endX: x, endY: y });
    },
    [],
  );

  const handleDesktopMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDraggingIcon.current || !isDrawing.current || !selectionRect)
        return;
      const rect = desktopRef.current!.getBoundingClientRect();
      setSelectionRect((prev) =>
        prev
          ? { ...prev, endX: e.clientX - rect.left, endY: e.clientY - rect.top }
          : null,
      );
    },
    [selectionRect],
  );

  const handleDesktopMouseUp = useCallback(() => {
    if (isDraggingIcon.current) {
      isDraggingIcon.current = false;
      return;
    }
    if (!isDrawing.current || !selectionRect) return;
    isDrawing.current = false;

    const minX = Math.min(selectionRect.startX, selectionRect.endX);
    const maxX = Math.max(selectionRect.startX, selectionRect.endX);
    const minY = Math.min(selectionRect.startY, selectionRect.endY);
    const maxY = Math.max(selectionRect.startY, selectionRect.endY);

    const newSelected = new Set<string>();
    document.querySelectorAll("[data-icon-id]").forEach((el) => {
      const iconRect = el.getBoundingClientRect();
      const desktopRect = desktopRef.current!.getBoundingClientRect();
      const iconLeft = iconRect.left - desktopRect.left;
      const iconTop = iconRect.top - desktopRect.top;
      const iconRight = iconRect.right - desktopRect.left;
      const iconBottom = iconRect.bottom - desktopRect.top;
      if (
        iconLeft < maxX &&
        iconRight > minX &&
        iconTop < maxY &&
        iconBottom > minY
      ) {
        newSelected.add(el.getAttribute("data-icon-id")!);
      }
    });

    setSelectedIds(newSelected);
    setSelectionRect(null);
  }, [selectionRect]);

  const rectStyle = selectionRect
    ? {
        left: Math.min(selectionRect.startX, selectionRect.endX),
        top: Math.min(selectionRect.startY, selectionRect.endY),
        width: Math.abs(selectionRect.endX - selectionRect.startX),
        height: Math.abs(selectionRect.endY - selectionRect.startY),
      }
    : null;

  const closeStartMenu = useCallback(() => setStartMenuOpen(false), []);

  useEffect(() => {
    if (!startMenuOpen) return;
    if (systemOverlay !== "running") return;

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-start-menu='true']")) return;
      if (target.closest("[data-start-button='true']")) return;
      setStartMenuOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [startMenuOpen, systemOverlay]);

  useEffect(() => {
    if (!startMenuOpen && !shutdownDialogOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setStartMenuOpen(false);
      setShutdownDialogOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startMenuOpen, shutdownDialogOpen]);

  useEffect(() => {
    if (systemOverlay !== "bsod") return;
    const t = window.setTimeout(() => setSystemOverlay("goodbye"), 4000);
    return () => window.clearTimeout(t);
  }, [systemOverlay]);

  const openShutdownDialog = useCallback(() => {
    closeStartMenu();
    setShutdownDialogOpen(true);
  }, [closeStartMenu]);

  const handleStartApp = useCallback(
    (app: "cv" | "coffee" | "github" | "linkedin") => {
      closeStartMenu();
      if (systemOverlay !== "running") return;
      if (app === "cv") openCV();
      if (app === "coffee") openCoffee();
      if (app === "github")
        window.open("https://github.com/GalCegla", "_blank");
      if (app === "linkedin")
        window.open(
          "https://www.linkedin.com/in/gal-cegla-805a88204/",
          "_blank",
        );
    },
    [closeStartMenu, openCV, openCoffee, systemOverlay],
  );

  const handleConfirmShutdown = useCallback(() => {
    setShutdownDialogOpen(false);
    closeStartMenu();
    if (systemOverlay !== "running") return;

    const rand32 = () =>
      Math.floor(Math.random() * 0xffffffff)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");
    setStopCode(`STOP: 0x${rand32()}`);
    setSystemOverlay("bsod");
  }, [closeStartMenu, systemOverlay]);

  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>Gal.exe</title>
        <style>{`
          html, body {
            overscroll-behavior: none;
            height: 100%;
          }
          fieldset {
            margin-bottom: 20px;
          }
        `}</style>
      </Helmet>
      <div
        ref={desktopRef}
        style={{ position: "relative", minHeight: "100vh" }}
        onMouseDown={handleDesktopMouseDown}
        onMouseMove={handleDesktopMouseMove}
        onMouseUp={handleDesktopMouseUp}
      >
        <img
          src="/BG.gif"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            zIndex: -1,
          }}
        />

        {rectStyle && (
          <div
            style={{
              position: "absolute",
              ...rectStyle,
              border: "1px dotted white",
              backgroundColor: "rgba(0, 0, 128, 0.2)",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        )}

        {cvOpen && (
          <AppWindow title="My CV" onClose={closeCV}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab value={0}>CV</Tab>
              <Tab value={1}>Skills</Tab>
              <Tab value={2}>Languages</Tab>
            </Tabs>
            <TabBody style={{ height: "90%", width: "100%" }}>
              {activeTab === 0 && (
                <ScrollView
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    overflow: "auto",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "white",
                  }}
                >
                  {CV.map((job) => (
                    <GroupBox
                      variant="flat"
                      label={
                        job.companyLink ? (
                          <a
                            href={job.companyLink}
                            target="_blank"
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                            }}
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )
                      }
                      key={job.company}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span style={{ fontSize: "20px" }}>{job.title}</span>
                      <span style={{ color: "grey", fontSize: "10px" }}>
                        {job.dates}
                      </span>
                      <span>{job.description}</span>
                    </GroupBox>
                  ))}
                </ScrollView>
              )}
              {activeTab === 1 && (
                <Box>
                  <GroupBox label="Programming Skills">
                    <ul>
                      <li>• TypeScript</li>
                      <li>• JavaScript</li>
                      <li>• React</li>
                      <li>• Nest.js</li>
                      <li>• Graphql</li>
                      <li>• Prisma</li>
                      <li>• Python (kinda)</li>
                    </ul>
                  </GroupBox>
                  <GroupBox label="More Skills">
                    <ul>
                      <li>• Adobe Premiere</li>
                      <li>• Adobe After Effects</li>
                    </ul>
                  </GroupBox>
                </Box>
              )}
              {activeTab === 2 && (
                <GroupBox label="Languages">
                  <ul>
                    <li>
                      • <span style={{ fontWeight: "bold" }}>Hebrew</span>:
                      Mother tongue
                    </li>
                    <li>
                      • <span style={{ fontWeight: "bold" }}>English</span>:
                      Fluent
                    </li>
                    <li>
                      • <span style={{ fontWeight: "bold" }}>German</span>:
                      Proficient
                    </li>
                  </ul>
                </GroupBox>
              )}
            </TabBody>
          </AppWindow>
        )}
        {coffeeOpen && (
          <AppWindow
            title="Information regarding coffee blog"
            onClose={closeCoffee}
            style={{ height: 200, width: 500 }}
          >
            <GroupBox label="Notice">
              Sorry! The coffee blog is currently under construction.
            </GroupBox>
          </AppWindow>
        )}

        <Box
          className="desktop-layer"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            alignItems: "flex-start",
            zIndex: 0,
            position: "relative",
          }}
        >
          <DesktopIcon
            id="cv"
            icon={<img src="/mepixel.png" style={{ height: "44px" }} />}
            label="My CV"
            isSelected={selectedIds.has("cv")}
            onSelect={handleSelect}
            onDoubleClick={openCV}
          />
          <DesktopIcon
            id="coffee"
            icon={<img src="/coffeepixel.png" style={{ height: "44px" }} />}
            label="Coffee Blog"
            isSelected={selectedIds.has("coffee")}
            onSelect={handleSelect}
            onDoubleClick={openCoffee}
          />
          <DesktopIcon
            id="github"
            icon={<img src="/githubpixel.png" style={{ height: "44px" }} />}
            label="Gitub"
            isSelected={selectedIds.has("github")}
            onSelect={handleSelect}
            onDoubleClick={() =>
              window.open("https://github.com/GalCegla", "_blank")
            }
          />
          <DesktopIcon
            id="linkedin"
            icon={<img src="/linkedinpixel.png" style={{ height: "44px" }} />}
            label="LinkedIn"
            isSelected={selectedIds.has("linkedin")}
            onSelect={handleSelect}
            onDoubleClick={() =>
              window.open(
                "https://www.linkedin.com/in/gal-cegla-805a88204/",
                "_blank",
              )
            }
          />
        </Box>

        {startMenuOpen && systemOverlay === "running" && (
          <div
            data-start-menu="true"
            style={{
              position: "fixed",
              left: 10,
              bottom: 52,
              zIndex: 100000,
              display: "flex",
              alignItems: "stretch",
              background: "#c0c0c0",
              padding: 0,
              boxShadow:
                "0 0 0 2px rgba(255,255,255,0.25), 2px 2px 0 rgba(0,0,0,0.4)",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 0",
                background: "#d4d0c8",
                borderRight: "2px solid #808080",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  letterSpacing: "-0.5px",
                }}
              >
                Windows 95
              </span>
            </div>

            <div
              style={{ padding: 4, display: "flex", flexDirection: "column" }}
            >
              <MenuList shadow>
                <MenuListItem size="lg" onClick={() => handleStartApp("cv")}>
                  <span
                    style={{
                      display: "inline-flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/mepixel.png"
                      alt=""
                      style={{
                        height: 18,
                        width: 18,
                        imageRendering: "pixelated" as const,
                      }}
                    />
                    CV
                  </span>
                </MenuListItem>
                <MenuListItem
                  size="lg"
                  onClick={() => handleStartApp("coffee")}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/coffeepixel.png"
                      alt=""
                      style={{
                        height: 18,
                        width: 18,
                        imageRendering: "pixelated" as const,
                      }}
                    />
                    Coffee Blog
                  </span>
                </MenuListItem>
                <MenuListItem
                  size="lg"
                  onClick={() => handleStartApp("github")}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/githubpixel.png"
                      alt=""
                      style={{
                        height: 18,
                        width: 18,
                        imageRendering: "pixelated" as const,
                      }}
                    />
                    GitHub
                  </span>
                </MenuListItem>
                <MenuListItem
                  size="lg"
                  onClick={() => handleStartApp("linkedin")}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/linkedinpixel.png"
                      alt=""
                      style={{
                        height: 18,
                        width: 18,
                        imageRendering: "pixelated" as const,
                      }}
                    />
                    LinkedIn
                  </span>
                </MenuListItem>
                <li style={{ width: "100%", padding: "4px 8px", marginTop: 4 }}>
                  <Separator orientation="horizontal" />
                </li>
                <MenuListItem size="lg" primary onClick={openShutdownDialog}>
                  <span
                    style={{
                      display: "inline-flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <WindowsShutDown size={18} />
                    Shut Down...
                  </span>
                </MenuListItem>
              </MenuList>
            </div>
          </div>
        )}

        {shutdownDialogOpen && systemOverlay === "running" && (
          <div
            data-shutdown-dialog="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200000,
              background: "rgba(0, 0, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={{ width: 420, maxWidth: "95vw" }}>
              <Window resizable={false} shadow style={{ width: "100%" }}>
                <WindowHeader
                  className="window-header"
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Shut Down</span>
                </WindowHeader>
                <WindowContent style={{ padding: 16 }}>
                  <div style={{ marginBottom: 12 }}>
                    What do you want Windows to do?
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Button
                      active={shutdownAction === "shutdown"}
                      onClick={() => setShutdownAction("shutdown")}
                      style={{ justifyContent: "flex-start" }}
                    >
                      Shut down
                    </Button>
                    <Button
                      active={shutdownAction === "restart"}
                      onClick={() => setShutdownAction("restart")}
                      style={{ justifyContent: "flex-start" }}
                    >
                      Restart
                    </Button>
                    <Button
                      active={shutdownAction === "sleep"}
                      onClick={() => setShutdownAction("sleep")}
                      style={{ justifyContent: "flex-start" }}
                    >
                      Stand by
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 8,
                    }}
                  >
                    <Button onClick={() => setShutdownDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      primary
                      onClick={handleConfirmShutdown}
                      style={{ minWidth: 90 }}
                    >
                      OK
                    </Button>
                  </div>
                </WindowContent>
              </Window>
            </div>
          </div>
        )}

        {systemOverlay !== "running" && (
          <>
            <div
              data-system-overlay="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 300000,
                background:
                  systemOverlay === "bsod" ? "#00008B" : "rgba(0,0,0,0.6)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "min(800px, 95vw)",
                  border: "3px solid rgba(255,255,255,0.7)",
                  padding: 18,
                  background:
                    systemOverlay === "bsod" ? "rgba(0,0,0,0.25)" : "#000",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1)",
                  position: "relative",
                }}
              >
                {systemOverlay === "bsod" ? (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: -150,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 2,
                        fontSize: 80,
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "0 1px 0 rgba(0,0,0,0.4)",
                        pointerEvents: "none",
                      }}
                    >
                      :(
                    </div>
                    <div style={{ fontSize: 22, fontWeight: "bold" }}>
                      A problem has been detected
                    </div>
                    <div style={{ marginTop: 10, fontFamily: "monospace" }}>
                      {stopCode}
                    </div>
                    <div style={{ marginTop: 14, fontFamily: "monospace" }}>
                      Collecting data...
                      <div style={{ marginTop: 6, opacity: 0.9 }}>
                        The Start menu initiated shutdown.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 22, fontWeight: "bold" }}>
                      ERROR: SHUTDOWN FAILED (5H1T_M0D3xF41L3D)
                    </div>
                    <div style={{ marginTop: 10, opacity: 0.9 }}>
                      Windows could not shut down, please try again.
                    </div>
                    <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                      <Button
                        primary
                        onClick={() => {
                          setSystemOverlay("running");
                          setShutdownDialogOpen(false);
                          setStartMenuOpen(false);
                        }}
                      >
                        Return to desktop
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div
              data-start-button="true"
              style={{ position: "relative", display: "inline-block" }}
            >
              <Button
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (systemOverlay !== "running") return;
                  setStartMenuOpen((prev) => !prev);
                  setShutdownDialogOpen(false);
                }}
              >
                <UnnamedIcon style={{ height: "20px", marginRight: "5px" }} />
                Start
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default IndexPage;
