import React from "react";
import {
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
//
import dayjs from "dayjs";

const style = {
  container: {
    minWidth: 480,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cin: {
    fontSize: 13,
  },
  lastUpdated: {
    fontSize: 10,
  },
  headLine: {
    py: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 800,
  },
  headLineItem: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 1,
    p: 1,
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
  table: {
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  key: {
    fontSize: 12,
  },
  data: {
    fontSize: 12,
    justifySelf: "flex-end",
  },
  noPurchaseHistory: {
    minHeight: 300,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "warning.main",
    fontSize: 15,
    fontWeight: 800,
  },
};

const _months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const cardinalProductKeys = [
  "Hist. Lowest",
  "Last SFDC order",
  "Last SFDC cost",
];
const CardinalProduct = ({ data, analysisData = {}, sfdcOutdated }) => {
  const { name, cin, lastUpdated, contract, stockStatus, stock, returnable } =
    data;
  const { lowestHistCost, lastSFDCdate, lastSFDCcost, shipQty, maxUnitCost } =
    analysisData;
  const lineChartData = maxUnitCost.map((v) =>
    Number(v.replaceAll(/[^0-9.]+/g, ""))
  );
  //should get dayjs from date of dailyorder
  const month = dayjs().get("month");
  const months =
    month > 6
      ? _months.slice(month - 6, month + 1)
      : _months.slice(11 - (5 - month), 12).concat(_months.slice(0, month + 1));
  const [barChart, setBarChart] = React.useState(true);
  const handleToggleButton = React.useCallback((e, value) => {
    setBarChart(value);
  }, []);

  return (
    <Box sx={style.container}>
      <Box>
        <Typography sx={style.name}>{name}</Typography>
        <Box sx={style.subtitle}>
          <Typography sx={style.cin}>{cin}</Typography>
          <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box sx={style.headLine}>
          <Box sx={style.headLineItem}>{contract ?? "N/A"}</Box>
          <Box sx={style.headLineItem}>
            {stockStatus} {stock ? `(${stock})` : null}
          </Box>
          <Box sx={style.headLineItem}>
            {returnable === "done" ? "RETURNABLE" : "NON-RETURNABLE"}
          </Box>
          <ToggleButtonGroup
            exclusive
            size="small"
            onChange={handleToggleButton}
          >
            <ToggleButton value={true} children={<BarChartIcon />} />
            <ToggleButton value={false} children={<TimelineIcon />} />
          </ToggleButtonGroup>
        </Box>
        <Box sx={style.table}>
          <Box>
            {cardinalProductKeys.map((v) => (
              <Typography key={v} sx={style.key}>
                {v}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography sx={style.data}>{lowestHistCost}</Typography>
            <Typography
              sx={
                sfdcOutdated
                  ? { ...style.data, color: "warning.main" }
                  : style.data
              }
            >
              {lastSFDCdate}
            </Typography>
            <Typography sx={style.data}>{lastSFDCcost}</Typography>
          </Box>
        </Box>
        <Box>
          {lowestHistCost ? (
            barChart ? (
              <BarChart xData={months} yData={shipQty} />
            ) : (
              <LineChart xData={months} yData={lineChartData} />
            )
          ) : (
            <Box sx={style.noPurchaseHistory}>NO PURCHASE HISTORY</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardinalProduct;
