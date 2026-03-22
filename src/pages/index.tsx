import useIsMobile from "hooks/useIsMobile";
import DesktopPage from "components/pages/DesktopPage";
import MobilePage from "components/pages/MobilePage";
import { Helmet } from "react-helmet-async";

const IndexPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Helmet>
        <link rel="icon" href="/mepixel.png" />
      </Helmet>
      {isMobile ? <MobilePage /> : <DesktopPage />}
    </>
  );
};

export default IndexPage;
