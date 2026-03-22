import useIsMobile from "hooks/useIsMobile";
import DesktopPage from "components/pages/DesktopPage";
import MobilePage from "components/pages/MobilePage";

const IndexPage = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePage /> : <DesktopPage />;
};

export default IndexPage;
