import React from "react";
import DesktopNavbar from "../components/desktop/DesktopNavbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <DesktopNavbar />
      <>{children}</>
      <Footer />
    </>
  );
};

export default MainLayout;
