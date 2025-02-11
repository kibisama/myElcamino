import React from "react";
import {
  Badge,
  Box,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";

import CustomTooltip from "../CustomTooltip";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleOnly: { fontSize: 13 },
  title: { fontSize: 12 },
  subtitle: {
    fontSize: 9,
    color: "text.secondary",
  },
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    top: 3,
    right: -5,
  },
}));
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[300],
}));
// const TableCell = ({ title, subtitle, badge, tooltip }) => {
//   const content = title ? (
//     <StyledBadge variant="dot" color={badge}>
//       <Box>
//         <Typography sx={subtitle ? style.title : style.titleOnly}>
//           {title}
//         </Typography>
//         {subtitle && <Typography sx={style.subtitle}>{subtitle}</Typography>}
//       </Box>
//     </StyledBadge>
//   ) : (
//     <StyledCircularProgress size={20} />
//   );
//   return (
//     <Box sx={style.container}>
//       {tooltip && title ? (
//         <CustomTooltip title={tooltip}>{content}</CustomTooltip>
//       ) : (
//         content
//       )}
//     </Box>
//   );
// };
const TableCell = ({ data = {}, textStyle, tooltip, onClickTooltip }) => {
  const content =
    data === "PENDING" ? (
      <StyledCircularProgress size={18} />
    ) : data === "NA" ? (
      <Typography sx={{ ...style.titleOnly, color: "text.disabled" }}>
        NA
      </Typography>
    ) : (
      <Box>
        <Typography
          sx={
            data.subtitle
              ? textStyle
                ? { ...style.title, ...textStyle }
                : style.title
              : textStyle
              ? { ...style.titleOnly, ...textStyle }
              : style.titleOnly
          }
        >
          {data.title}
        </Typography>
        {data.subtitle && (
          <Typography
            sx={
              textStyle ? { ...style.subtitle, ...textStyle } : style.subtitle
            }
          >
            {data.subtitle}
          </Typography>
        )}
      </Box>
    );
  return (
    <Box sx={style.container}>
      {data.tooltip ? (
        <CustomTooltip
          sx={
            onClickTooltip
              ? {
                  [`& .${tooltipClasses.tooltip}`]: {
                    ":hover": {
                      cursor: "pointer",
                    },
                  },
                }
              : null
          }
          title={tooltip}
          onClick={onClickTooltip}
        >
          {content}
        </CustomTooltip>
      ) : (
        content
      )}
    </Box>
  );
};

export default TableCell;
