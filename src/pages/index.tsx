import useIsMobile from "hooks/useIsMobile";
import DesktopPage from "components/pages/DesktopPage";
import MobilePage from "components/pages/MobilePage";
import { Helmet } from "react-helmet-async";
import { Hourglass } from "react95";

const IndexPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Helmet>
        <link rel="icon" href="/mepixel.png" />
      </Helmet>
      {isMobile === "loading" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Hourglass size={32} />
        </div>
      ) : isMobile ? (
        <MobilePage />
      ) : (
        <DesktopPage />
      )}
    </>
  );
};

export default IndexPage;
