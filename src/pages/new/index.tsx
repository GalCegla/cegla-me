import { Box, CssBaseline } from "@material-ui/core";
import AppWindow from "components/AppWindow";
import DesktopIcon from "components/DesktopIcon";
import { FC, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { TheSimpsonsIcon, UnnamedIcon } from "react-old-icons";
import { AppBar, Button, Toolbar, Window, WindowHeader } from "react95";

const IndexPage: FC = () => {
  const [cvOpen, setCvOpen] = useState(false);

  const openCV = useCallback(() => {
    setCvOpen(true);
  }, [setCvOpen]);

  const closeCV = useCallback(() => {
    setCvOpen(false);
  }, [setCvOpen]);

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
  `}</style>
      </Helmet>
      <Box
        style={{ position: "relative", minHeight: "100vh" }}
        onClick={() => window.dispatchEvent(new CustomEvent("deselectAll"))}
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
        {cvOpen && <AppWindow title="My CV" onClose={closeCV}></AppWindow>}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            alignItems: "flex-start",
          }}
        >
          <DesktopIcon
            icon={<TheSimpsonsIcon size={32} />}
            label="My CV"
            onDoubleClick={openCV}
          />
        </Box>
        <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Button
                // onClick={() => setOpen(!open)}
                // active={open}
                style={{ fontWeight: "bold" }}
              >
                <UnnamedIcon style={{ height: "20px", marginRight: "5px" }} />
                Start
              </Button>
            </div>
            {/* <TextInput placeholder='Search...' width={150} /> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default IndexPage;
