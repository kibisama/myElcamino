import ListSubheader from "@mui/material/ListSubheader";
import { DRAWER_WIDTH } from "../../../constants";
import { getDrawerSxTransitionMixin } from "../../../mixins";
import { useSelector } from "react-redux";

function DashboardSidebarHeaderItem({ children }) {
  const {
    miniSidebar: mini,
    isSidebarFullyExpanded: fullyExpanded,
    sidebarDrawerTransitions: hasDrawerTransitions,
  } = useSelector((s) => s.main);

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
