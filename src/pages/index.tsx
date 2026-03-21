import { Box, CssBaseline } from "@material-ui/core";
import AppWindow from "components/AppWindow";
import DesktopIcon from "components/DesktopIcon";
import { useRouter } from "next/router";
import { FC, useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { GoldenEra2, IntelliPointCursor21, UnnamedIcon } from "react-old-icons";
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
  const openCoffeeBlog = useCallback(() => router.push("/coffee"), [router]);
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
        <title>Gal Cegla's Space</title>
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
                        <a href={job.companyLink} target="_blank">
                          {job.company}
                        </a>
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
            icon={<IntelliPointCursor21 size={32} />}
            label="My CV"
            isSelected={selectedIds.has("cv")}
            onSelect={handleSelect}
            onDoubleClick={openCV}
          />
          <DesktopIcon
            id="coffee"
            icon={<GoldenEra2 size={32} />}
            label="Coffee Blog"
            isSelected={selectedIds.has("coffee")}
            onSelect={handleSelect}
            onDoubleClick={openCoffeeBlog}
          />
          <DesktopIcon
            id="github"
            icon={<img src="/githubpixel.png" style={{ height: "40px" }} />}
            label="Gitub"
            isSelected={selectedIds.has("github")}
            onSelect={handleSelect}
            onDoubleClick={() =>
              window.open("https://github.com/GalCegla", "_blank")
            }
          />
          <DesktopIcon
            id="linkedin"
            icon={<img src="/linkedinpixel.png" style={{ height: "40px" }} />}
            label="Gitub"
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

const CV = [
  {
    company: "Ludwig Maximilians University Munich",
    dates: "OCTOBER 2024 - ONGOING, MUNICH",
    title: "Bachelor's",
    companyLink: "https://www.lmu.de/en/",
    description:
      "With Computer-Linguistics as a major subject and Artificial Intelligence as a minor, I'm currently studying for my bachelor's degree at the LMU in Munich. The program is oriented around the intertwining of human languages and computers, focusing on linguistics and programming.",
  },
  {
    company: "FlyCode",
    dates: "FEBRUARY 2022 - APRIL 2023, TEL AVIV",
    title: "Fullstack Developer",
    companyLink: "https://www.flycode.com/",
    description:
      "FlyCode is a YCombinator graduate, focused on minimizing revenue loss for subscription-based platforms.\n During my time at FlyCode I had several responsibilities, beyond my daily programming duties for the application; I was responsible for the product's documentation, helped with the grammar-proofing of our User Interface, took part in the sales and marketing efforts, and contributed to some business aspects of the company.",
  },
  {
    company: "ITC",
    dates: "OCTOBER 2021 - FEBRUARY 2022, TEL AVIV",
    title: "Fullstack Tech Teacher",
    description:
      "ITC was a highly acclaimed software development schools in Tel Aviv, teaching people to become programmers. The school provided an intensive 3 month course including a one-month practical internship in software development. Working at ITC gave me the opportunity to guide students through the practices of the developers' world, help them with the learned materials, and put their knowledge into practice. Another part of my work was lecturing on different topics, with a focus on teaching ReactJS.",
  },
  {
    company: "withElement",
    dates: "JANUARY 2021 - JULY 2021, TEL AVIV",
    title: "Junior Software Developer",
    description:
      "withElement was a YCombinator-graduate startup with the goal of helping known finance personas (e.g. 'influencers') reach and interact with their audience in an in-person environment. While working at withElement I was part of a very small development team, carrying out tasks relating to all parts of the codebase, both the front and back ends.",
  },
  {
    company: "Amplication",
    dates: "AUGUST 2020 - JANUARY 2021, TEL AVIV",
    title: "Junior Software Developer",
    companyLink: "https://amplication.com/",
    description:
      "Amplication is a no-code API creation service. It enables any user without a technological background to create and update API infrastructures. In this role, I was supporting the code maintenance work by writing tests for the code, while doing some other more general coding tasks as well. In addition, I was involved with marketing tasks such as writing articles regarding the different usages of the product.",
  },
  {
    company: "Israeli Air Force",
    dates: "AUGUST 2017 - APRIL 2020",
    title: "Education R&D Unit",
    description:
      "Service in a technological unit dedicated to the development of new methods of education and instructional courseware for a variety of roles. Some products developed by the unit include educational programs, instructional videos, and virtual reality environments, using the most advanced tools & technologies.",
  },
];
