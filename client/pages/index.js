import DesktopHome from "../components/desktop/DesktopHome";
import MobileHome from "../components/mobile/MobileHome";
import PageHead from "../components/PageHead";
import MobileNavbar from "../components/mobile/MobileNavbar";

// export async function getStaticProps () {}

const index = () => {
  return (
    <>
      <PageHead title={"Home"} desc={"mines"} />
      <MobileNavbar />
      <DesktopHome />
      <MobileHome />
    </>
  );
};

export default index;
