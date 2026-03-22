import { Box, CssBaseline } from "@material-ui/core";
import AppWindow from "components/AppWindow";
import DesktopIcon from "components/DesktopIcon";
import CV from "consts/cv";
import { useRouter } from "next/router";
import { FC, useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UnnamedIcon } from "react-old-icons";
import {
  AppBar,
  Button,
  GroupBox,
  ScrollView,
  Tab,
  TabBody,
  Tabs,
  Toolbar,
} from "react95";

interface SelectionRect {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

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

        <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Button style={{ fontWeight: "bold" }}>
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
