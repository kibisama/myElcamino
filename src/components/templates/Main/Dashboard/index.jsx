import * as React from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import * as pages from "../pages";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    React.useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = React.useCallback(
    (newExpanded) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ]
  );

  const handleToggleHeaderMenu = React.useCallback(
    (isExpanded) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded]
  );

  const layoutRef = React.useRef(null);

  const { page, section } = useSelector((s) => s.main);
  const Page = pages[page] || "div";

  return (
    <Box
      ref={layoutRef}
      sx={{
        position: "fixed",
        display: "flex",
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <Header
        logo={<Logo />}
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
      />
      <Sidebar
        expanded={isNavigationExpanded}
        setExpanded={setIsNavigationExpanded}
        container={layoutRef?.current ?? undefined}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: "none" }} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          {page && <Page section={section} />}
        </Box>
      </Box>
    </Box>
  );
}
