import { Zoom, styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, onClick, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    // depreciated
    // PopperProps={{
    //   disablePortal: true,
    //   popperOptions: {
    //     positionFixed: true,
    //     modifiers: {
    //       preventOverflow: {
    //         enabled: true,
    //         boundariesElement: 'window',
    //       },
    //     },
    //   },
    // }}
    slots={{ transition: Zoom }}
    slotProps={{ tooltip: { onClick: onClick }, transition: { timeout: 250 } }}
    disableFocusListener={true}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "100%",
    color: theme.palette.text.primary,
    border: "1px solid",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.grey[500],
    ":hover": {
      borderColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
    },
  },
}));

export default CustomTooltip;
