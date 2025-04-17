import React from "react";
import { Box, Typography } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import CustomTooltip from "../CustomTooltip";
import CustomCircularProgress from "../CustomCircularProgress";

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

const TableCell = ({
  data = {},
  tooltip,
  placement,
  textStyle,
  onClickTooltip,
}) => {
  const content =
    data === "PENDING" ? (
      <CustomCircularProgress size={18} />
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
      {data.data ? (
        <CustomTooltip
          placement={placement}
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
