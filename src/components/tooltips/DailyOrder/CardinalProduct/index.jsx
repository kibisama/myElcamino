import { Box, Divider, Typography } from "@mui/material";
import CustomTooltip from "../../../customs/CustomTooltip";

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
    // color: "primary.main",
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

// const HeadlineItem = () => {
//   return <Box sx={style.headlineItem} />;
// };
const CardinalProduct = ({ data }) => {
  const lastUpdated = data.lastUpdated;
  if (data.data === "PENDING") {
    //
    return;
  }
  const {
    name,
    cin,
    contract,
    stockStatus,
    stock,
    avlAlertUpdated,
    avlAlertExpected,
    avlAlertAddMsg,
  } = data.data;
  const stockHeadline = (
    <Box sx={style.headlineItem}>
      {stockStatus + (stock ? ` (${stock})` : null)}
    </Box>
  );
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
      {/* <Box sx={{ ...style.table, minHeight: 42 }}>
        <Box sx={style.topValue}>{ndc}</Box>
        <Box sx={style.topValue}>{mfr}</Box>
      </Box> */}
      <Divider />
      <Box sx={style.table}>
        <Box sx={style.headlineItem}>{contract}</Box>
        {avlAlertUpdated ? (
          <CustomTooltip title={avlAlertExpected}>
            {stockHeadline}
          </CustomTooltip>
        ) : (
          stockHeadline
        )}
        <Box sx={style.headlineItem}>REBATE ELIGIBLE</Box>
        <Box sx={style.headlineItem}>RETURNABLE</Box>
      </Box>
      <Divider />
      {/* <Box sx={style.table}>
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
      </Box> */}
    </Box>
  );
};

export default CardinalProduct;
