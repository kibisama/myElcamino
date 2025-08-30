import { Box } from "@mui/material";
import StoreInfoHeader from "../StoreInfoHeader";

export default function PortraitContainer({ children, slotProps = {} }) {
  return (
    <Box
      sx={{
        p: 2,
        width: "816px",
        height: "1054px",
        "@media print": {
          p: 0,
          m: 0,
          overflow: "hidden",
          height: "100vh",
          "@page": {
            size: "letter portrait",
          },
        },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <StoreInfoHeader {...slotProps.storeInfoHeader} />
      </Box>
      {children}
    </Box>
  );
}
