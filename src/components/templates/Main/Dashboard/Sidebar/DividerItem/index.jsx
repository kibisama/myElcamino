import * as React from "react";
import Divider from "@mui/material/Divider";
import { getDrawerSxTransitionMixin } from "../../../mixins";
import { useSelector } from "react-redux";

export default function DividerItem() {
  const {
    isSidebarFullyExpanded: fullyExpanded,
    sidebarDrawerTransitions: hasDrawerTransitions,
  } = useSelector((s) => s.main);

  return (
    <li>
      <Divider
        sx={{
          borderBottomWidth: 1,
          my: 1,
          mx: -0.5,
          ...(hasDrawerTransitions
            ? getDrawerSxTransitionMixin(fullyExpanded, "margin")
            : {}),
        }}
      />
    </li>
  );
}
