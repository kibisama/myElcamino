import * as React from "react";
import {
  Paper,
  Drawer,
  List,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GestureIcon from "@mui/icons-material/Gesture";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MedicationIcon from "@mui/icons-material/Medication";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import { DashboardSidebarContext } from "../../context";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../constants";
import PageItem from "./PageItem";
import HeaderItem from "./HeaderItem";
import DividerItem from "./DividerItem";
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from "../../mixins";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../../../../reduxjs@toolkit/mainSlice";

function Sidebar({ expanded = true, setExpanded, container }) {
  const { page, deliveryGroups } = useSelector((s) => s.main);
  const dispatch = useDispatch();
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
        dispatch(setSidebar(isOverSmViewport ? "mini" : "collapsed"));
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);
    dispatch(setSidebar(isOverSmViewport ? "expanded" : "mobile-expanded"));

    return () => {};
  }, [
    dispatch,
    expanded,
    theme.transitions.duration.leavingScreen,
    isOverSmViewport,
  ]);

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
            <PageItem
              id="Deliveries"
              icon={<LocalShippingIcon />}
              defaultExpanded={page === "Deliveries"}
              expanded={expandedItemIds.includes("Deliveries")}
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
                  {/* {deliveryGroups.map((v, i) => (
                    <PageItem
                      id="Deliveries"
                      key={i}
                      section={`${v}`}
                      title={`${v}`}
                      icon={<GroupsIcon />}
                    />
                  ))} */}
                  <PageItem
                    id="PrivateDelivery"
                    title="Private"
                    icon={<PersonIcon />}
                  />
                  <PageItem
                    id="DeliveryGroups"
                    title="Manage Groups"
                    icon={<GroupAddIcon />}
                  />
                </List>
              }
            />

            <PageItem id="Pickups" icon={<GestureIcon />} />
            <DividerItem />
            <HeaderItem>Inventories</HeaderItem>
            <PageItem id="Drugs" icon={<MedicationIcon />} />
            <PageItem id="Inventories" icon={<InventoryIcon />} />
            <PageItem
              id="InventoryReports"
              title="Reports"
              icon={<DescriptionIcon />}
              expanded={expandedItemIds.includes("InventoryReports")}
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
                  <PageItem
                    id="UsageReport"
                    title="Usage"
                    icon={<DescriptionIcon />}
                  />
                </List>
              }
            />
            <DividerItem />
            <HeaderItem>Invoices & Reconciliation</HeaderItem>
            <DividerItem />
            <PageItem id="Settings" icon={<SettingsIcon />} />
          </List>
        </Paper>
      </React.Fragment>
    ),
    [
      mini,
      hasDrawerTransitions,
      isFullyExpanded,
      expandedItemIds,
      page,
      // deliveryGroups,
    ]
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
