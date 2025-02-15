import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    width: 300,
  },
  header: {
    p: 0.5,
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
    fontSize: 12,
  },
  lastUpdated: {
    fontSize: 10,
  },
  table: {
    p: 0.5,
    minHeight: 82,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  headlineItem: {
    height: "100%",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 1,
    p: 1,
    minWidth: 143,
    display: "flex",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 800,
    color: "primary.main",
  },
  topValue: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    fontSize: 11,
  },
  key: {
    width: "50%",
    fontSize: 13,
    fontWeight: 600,
  },
  value: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
    fontSize: 13,
  },
};

const getHeadlineStyle = (v) =>
  v ? { ...style.headlineItem, ...v } : style.headlineItem;
const CardinalProduct = ({ data, lastUpdated, option }) => {
  const {
    name,
    mfr,
    contract,
    stockStatus,
    stock,
    cin,
    ndc,
    lastCost,
    lastOrdered,
    lowestHistCost,
    lastSFDCCost,
    lastSFDCDate,
  } = data;
  const { _contract, _stockStatus, _rebateEligible, _returnable } = option;
  return (
    <Box sx={style.container}>
      <Box sx={style.header}>
        <Typography sx={style.name}>{name}</Typography>
        <Box sx={style.subtitle}>
          <Typography sx={style.cin}>{cin}</Typography>
          <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ ...style.table, minHeight: 42 }}>
        <Box sx={style.topValue}>{ndc}</Box>
        <Box sx={style.topValue}>{mfr}</Box>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box sx={getHeadlineStyle(_contract)}>{contract}</Box>
        <Box sx={getHeadlineStyle(_stockStatus)}>
          {stockStatus} {stock ? `(${stock})` : null}
        </Box>
        <Box sx={getHeadlineStyle(_rebateEligible)}>REBATE ELIGIBLE</Box>
        <Box sx={getHeadlineStyle(_returnable)}>RETURNABLE</Box>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box sx={style.key}>LAST COST</Box>
        <Box sx={style.value}>{lastCost}</Box>
        <Box sx={style.key}>LAST ORDERED</Box>
        <Box sx={style.value}>{lastOrdered}</Box>
        <Box sx={style.key}>LAST SFDC COST</Box>
        <Box sx={style.value}>{lastSFDCCost}</Box>
        <Box sx={style.key}>LAST SFDC DATE</Box>
        <Box sx={style.value}>{lastSFDCDate}</Box>
        <Box sx={style.key}>HISTORICAL LOW</Box>
        <Box sx={style.value}>{lowestHistCost}</Box>
      </Box>
    </Box>
  );
};

export default CardinalProduct;
