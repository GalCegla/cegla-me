import { CssBaseline } from "@material-ui/core";
import SnakeGame from "components/SnakeGame";
import CV from "consts/cv";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppBar, Button, Frame, GroupBox, ScrollView, Toolbar } from "react95";

const getJobLabel = (job: (typeof CV)[0]) =>
  job.companyLink ? (
    <a
      href={job.companyLink}
      target="_blank"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      {job.company}
    </a>
  ) : (
    <span>{job.company}</span>
  );

const MobilePage: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snakeOpen, setSnakeOpen] = useState(false);
  const secretTapCountRef = useRef(0);
  const secretTapTimerRef = useRef<number | null>(null);

  const handleSecretTap = useCallback(() => {
    if (secretTapTimerRef.current) {
      window.clearTimeout(secretTapTimerRef.current);
    }
    secretTapCountRef.current += 1;
    if (secretTapCountRef.current >= 5) {
      setSnakeOpen(true);
      secretTapCountRef.current = 0;
    }

    secretTapTimerRef.current = window.setTimeout(() => {
      secretTapCountRef.current = 0;
      secretTapTimerRef.current = null;
    }, 1200);
  }, []);

  useEffect(() => {
    return () => {
      if (secretTapTimerRef.current) {
        window.clearTimeout(secretTapTimerRef.current);
      }
      secretTapCountRef.current = 0;
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>Gal.exe</title>
        <style>{`
          html, body {
            overscroll-behavior: none;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          fieldset {
            margin-bottom: 20px;
          }
        `}</style>
      </Helmet>

      <Frame
        variant="outside"
        shadow
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100dvh" as any,
          maxWidth: "480px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <AppBar style={{ position: "static" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="/mepixel.png"
                alt="pixel me"
                style={{ height: "32px", imageRendering: "pixelated" as const }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                }}
              >
                Gal.exe
              </span>
            </div>
            <span
              onClick={handleSecretTap}
              title="psst..."
              style={{
                fontSize: "0.75rem",
                alignSelf: "flex-end",
                marginBottom: "2px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              v1.0.1
            </span>
          </Toolbar>
        </AppBar>

        <Frame
          variant="field"
          style={{ flex: 1, overflow: "hidden", margin: "4px" }}
        >
          {activeTab === 0 && (
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                background: "white",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                }}
              >
                <img
                  src="/mepixel.png"
                  alt="pixel me"
                  style={{
                    height: "48px",
                    imageRendering: "pixelated" as const,
                  }}
                />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Gal Cegla
                  </div>
                  <div style={{ fontSize: "12px", color: "grey" }}>
                    Fullstack Developer & Linguist
                  </div>
                </div>
              </div>
              {CV.map((job) => (
                <GroupBox
                  variant="flat"
                  label={getJobLabel(job)}
                  key={job.company}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {job.title}
                  </span>
                  <span
                    style={{
                      color: "grey",
                      fontSize: "10px",
                      marginBottom: "4px",
                    }}
                  >
                    {job.dates}
                  </span>
                  <span style={{ fontSize: "13px", lineHeight: "1.4" }}>
                    {job.description}
                  </span>
                </GroupBox>
              ))}
            </ScrollView>
          )}

          {activeTab === 1 && (
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                background: "white",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <GroupBox label="Programming Skills 👾">
                <ul>
                  <li>• TypeScript</li>
                  <li>• JavaScript</li>
                  <li>• React</li>
                  <li>• GraphQL</li>
                  <li>• Prisma</li>
                  <li>• Python (kinda)</li>
                </ul>
              </GroupBox>
              <GroupBox label="Other 🔨">
                <ul>
                  <li>• Adobe Premiere</li>
                  <li>• Adobe After Effects</li>
                </ul>
              </GroupBox>
              <GroupBox label="Languages 🗺️">
                <ul>
                  <li>
                    • <span style={{ fontWeight: "bold" }}>Hebrew</span>: Mother
                    tongue
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
            </ScrollView>
          )}

          {activeTab === 2 && (
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                background: "white",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src="/mepixel.png"
                  alt="pixel me"
                  style={{
                    height: "48px",
                    imageRendering: "pixelated" as const,
                  }}
                />
                <span style={{ fontSize: "13px", color: "grey" }}>
                  Find me online
                </span>
              </div>
              <GroupBox label="Links 🔗">
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <li>
                    <a
                      href="https://github.com/GalCegla"
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="/githubpixel.png"
                        alt="github"
                        style={{
                          height: "32px",
                          imageRendering: "pixelated" as const,
                        }}
                      />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/gal-cegla-805a88204/"
                      target="_blank"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="/linkedinpixel.png"
                        alt="linkedin"
                        style={{
                          height: "32px",
                          imageRendering: "pixelated" as const,
                        }}
                      />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </GroupBox>
            </ScrollView>
          )}

          {activeTab === 3 && (
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                background: "white",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  padding: "2rem 0",
                }}
              >
                <img
                  src="/coffeepixel.png"
                  alt="coffee"
                  style={{
                    height: "64px",
                    imageRendering: "pixelated" as const,
                  }}
                />
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Coffee Blog
                </span>
                <GroupBox label="Notice">
                  Sorry! The coffee blog is currently under construction.
                </GroupBox>
              </div>
            </ScrollView>
          )}
        </Frame>

        <div
          style={{ display: "flex", flexShrink: 0, margin: "4px", gap: "4px" }}
        >
          <Button
            fullWidth
            active={activeTab === 0}
            onClick={() => setActiveTab(0)}
          >
            CV
          </Button>
          <Button
            fullWidth
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Skills
          </Button>
          <Button
            fullWidth
            active={activeTab === 2}
            onClick={() => setActiveTab(2)}
          >
            Links
          </Button>
          <Button
            fullWidth
            active={activeTab === 3}
            onClick={() => setActiveTab(3)}
          >
            Blog
          </Button>
        </div>
      </Frame>

      <SnakeGame open={snakeOpen} onClose={() => setSnakeOpen(false)} />
    </>
  );
};

export default MobilePage;
