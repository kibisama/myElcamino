import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import { DRAWER_WIDTH } from "../../constants";
import { getDrawerSxTransitionMixin } from "../../mixins";

function DashboardSidebarHeaderItem({ children }) {
  const sidebarContext = {};
  //   const sidebarContext = React.useContext(DashboardSidebarContext);
  //   if (!sidebarContext) {
  //     throw new Error("Sidebar context was used without a provider.");
  //   }
  const {
    mini = false,
    fullyExpanded = true,
    hasDrawerTransitions,
  } = sidebarContext;

  return (
    <ListSubheader
      sx={{
        fontSize: 12,
        fontWeight: "600",
        height: mini ? 0 : 36,
        ...(hasDrawerTransitions
          ? getDrawerSxTransitionMixin(fullyExpanded, "height")
          : {}),
        px: 1.5,
        py: 0,
        minWidth: DRAWER_WIDTH,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        zIndex: 2,
      }}
    >
      {children}
    </ListSubheader>
  );
}

export default DashboardSidebarHeaderItem;
