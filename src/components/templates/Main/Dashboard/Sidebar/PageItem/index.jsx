import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Grow from "@mui/material/Grow";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DashboardSidebarContext from "../context/DashboardSidebarContext";
import { MINI_DRAWER_WIDTH } from "../../constants";

import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../../../../../../reduxjs@toolkit/mainSlice";

function PageItem({
  id,
  title,
  icon,
  action,
  defaultExpanded = false,
  expanded = defaultExpanded,
  disabled = false,
  nestedNavigation,
  onPageItemClick,
}) {
  const sidebarContext = {};
  const {
    mini = false,
    fullyExpanded = true,
    fullyCollapsed = false,
  } = sidebarContext;

  const { screen } = useSelector((s) => s.main);
  const selected = screen === id;

  const [isHovered, setIsHovered] = React.useState(false);

  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    if (!nestedNavigation) {
      dispatch(setScreen(id));
    }
  }, [dispatch, id, nestedNavigation]);

  let nestedNavigationCollapseSx = { display: "none" };
  if (mini && fullyCollapsed) {
    nestedNavigationCollapseSx = {
      fontSize: 18,
      position: "absolute",
      top: "41.5%",
      right: "2px",
      transform: "translateY(-50%) rotate(-90deg)",
    };
  } else if (!mini && fullyExpanded) {
    nestedNavigationCollapseSx = {
      ml: 0.5,
      fontSize: 20,
      transform: `rotate(${expanded ? 0 : -90}deg)`,
      transition: (theme) =>
        theme.transitions.create("transform", {
          easing: theme.transitions.easing.sharp,
          duration: 100,
        }),
    };
  }

  const miniNestedNavigationSidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: onPageItemClick ?? (() => {}),
      mini: false,
      fullyExpanded: true,
      fullyCollapsed: false,
      hasDrawerTransitions: false,
    };
  }, [onPageItemClick]);

  return (
    <React.Fragment>
      <ListItem
        disablePadding
        {...(nestedNavigation && mini
          ? {
              onMouseEnter: () => {
                setIsHovered(true);
              },
              onMouseLeave: () => {
                setIsHovered(false);
              },
            }
          : {})}
        sx={{
          display: "block",
          py: 0,
          px: 1,
          overflowX: "hidden",
        }}
      >
        <ListItemButton
          selected={selected}
          disabled={disabled}
          sx={{
            height: mini ? 50 : "auto",
          }}
          {...(nestedNavigation && !mini
            ? {
                onClick: handleClick,
              }
            : {})}
          {...(!nestedNavigation
            ? {
                // ...(hasExternalHref
                //   ? {
                //       target: "_blank",
                //       rel: "noopener noreferrer",
                //     }
                //   : {}),
                // to: href,
                onClick: handleClick,
              }
            : {})}
        >
          {icon || mini ? (
            <Box
              sx={
                mini
                  ? {
                      position: "absolute",
                      left: "50%",
                      top: "calc(50% - 6px)",
                      transform: "translate(-50%, -50%)",
                    }
                  : {}
              }
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: mini ? "center" : "auto",
                }}
              >
                {icon ?? null}
                {!icon && mini ? (
                  <Avatar
                    sx={{
                      fontSize: 10,
                      height: 16,
                      width: 16,
                    }}
                  >
                    {title
                      .split(" ")
                      .slice(0, 2)
                      .map((titleWord) => titleWord.charAt(0).toUpperCase())}
                  </Avatar>
                ) : null}
              </ListItemIcon>
              {mini ? (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10,
                    fontWeight: 500,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: MINI_DRAWER_WIDTH - 28,
                  }}
                >
                  {title}
                </Typography>
              ) : null}
            </Box>
          ) : null}
          {!mini ? (
            <ListItemText
              primary={title}
              sx={{
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            />
          ) : null}
          {action && !mini && fullyExpanded ? action : null}
          {nestedNavigation ? (
            <ExpandMoreIcon sx={nestedNavigationCollapseSx} />
          ) : null}
        </ListItemButton>
        {nestedNavigation && mini ? (
          <Grow in={isHovered}>
            <Box
              sx={{
                position: "fixed",
                left: MINI_DRAWER_WIDTH - 2,
                pl: "6px",
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  pt: 0.2,
                  pb: 0.2,
                  transform: "translateY(-50px)",
                }}
              >
                {/* <DashboardSidebarContext.Provider
                  value={miniNestedNavigationSidebarContextValue}
                > */}
                {nestedNavigation}
                {/* </DashboardSidebarContext.Provider> */}
              </Paper>
            </Box>
          </Grow>
        ) : null}
      </ListItem>
      {nestedNavigation && !mini ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedNavigation}
        </Collapse>
      ) : null}
    </React.Fragment>
  );
}

export default PageItem;
