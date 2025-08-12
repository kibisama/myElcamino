import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Paper, Drawer, List, Toolbar, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GestureIcon from "@mui/icons-material/Gesture";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import { DashboardSidebarContext } from "../../context";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../constants";
import PageItem from "./PageItem";
import HeaderItem from "./HeaderItem";
import DividerItem from "./DividerItem";
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from "../../mixins";

function Sidebar({ expanded = true, setExpanded, container }) {
  const theme = useTheme();

  const [expandedItemIds, setExpandedItemIds] = React.useState([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => {};
  }, [expanded, theme.transitions.duration.enteringScreen]);

  React.useEffect(() => {
    if (!expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return () => {};
  }, [expanded, theme.transitions.duration.leavingScreen]);

  const mini = !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded]
  );

  const handlePageItemClick = React.useCallback(
    (itemId, hasNestedNavigation) => {
      if (hasNestedNavigation && expanded) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId
              )
            : [...previousValue, itemId]
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [expanded, setExpanded, isOverSmViewport]
  );

  const hasDrawerTransitions = isOverSmViewport && isOverMdViewport;

  const getDrawerContent = React.useCallback(
    (viewport) => (
      <React.Fragment>
        <Toolbar />
        <Paper
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "auto",
            scrollbarGutter: mini ? "stable" : "auto",
            overflowX: "hidden",
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, "padding")
              : {}),
          }}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : "auto",
            }}
          >
            <PageItem id="Home" icon={<HomeIcon />} />
            <DividerItem />
            <HeaderItem>Deliveries & Pickups</HeaderItem>
            <PageItem id="Deliveries" icon={<LocalShippingIcon />} />
            <PageItem id="Pickups" icon={<GestureIcon />} />
            <DividerItem />
            <HeaderItem>Inventories</HeaderItem>
            <DividerItem />
            <HeaderItem>Reports</HeaderItem>
            <DividerItem />
            <PageItem id="Settings" icon={<SettingsIcon />} />
            {/* <PageItem
              id="reports"
              title="Reports"
              icon={<SettingsIcon />}
              // defaultExpanded={!!matchPath("/reports", pathname)}
              expanded={expandedItemIds.includes("reports")}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <PageItem id="sales" title="Sales" icon={<SettingsIcon />} />
                  <PageItem
                    id="traffic"
                    title="Traffic"
                    icon={<SettingsIcon />}
                  />
                </List>
              }
            /> */}
          </List>
        </Paper>
      </React.Fragment>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds]
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

      return {
        displayPrint: "none",
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: "absolute" } : {}),
        [`& .MuiDrawer-paper`]: {
          position: "absolute",
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundImage: "none",
          ...getDrawerWidthTransitionMixin(expanded),
        },
      };
    },
    [expanded, mini]
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <DashboardSidebarContext value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: "block",
            sm: "none",
            md: "none",
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent("phone")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "none",
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent("tablet")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent("desktop")}
      </Drawer>
    </DashboardSidebarContext>
  );
}

export default Sidebar;
