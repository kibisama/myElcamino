import { Box, Divider, Typography, styled } from "@mui/material";
import LastUpdated from "../LastUpdated";
import CustomTooltip from "../../../customs/CustomTooltip";
import AvlAlert from "./AvlAlert";
import CustomCircularProgress from "../../../customs/CustomCircularProgress";
/** @typedef {import("@mui/material").SxProps>} SxProps */
/** @type {Object<string, SxProps>} */
const style = {
  container: {
    width: 300,
  },
  content: {
    p: 0.25,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cin: {
    fontSize: 15,
    fontWeight: 600,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    justifySelf: "center",
  },
  mfr: {
    fontSize: 10,
    color: "text.secondary",
    justifySelf: "center",
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  lastUpdated: {
    fontSize: 10,
  },
  list: {
    p: 0.25,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  contentTable: {
    p: 0.25,
    display: "flex",
    justifyContent: "space-between",
  },
  circularProgress: {
    p: 0.25,
    height: 82,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    fontSize: 13,
    color: "text.secondary",
    fontWeight: 600,
  },
  keyError: {
    fontSize: 13,
    color: "warning.light",
    fontWeight: 600,
  },
  value: {
    fontSize: 13,
    justifySelf: "flex-end",
  },
  valueError: {
    fontSize: 13,
    justifySelf: "flex-end",
    color: "warning.light",
  },
  primary: {
    color: "primary.main",
  },
  info: {
    color: "info.light",
  },
  warning: {
    color: "warning.light",
  },
  error: {
    color: "error.light",
  },
  disabled: {
    color: "text.disabled",
  },
};

/**
 * @typedef {"IN STOCK"|"LOW STOCK"|"OUT OF STOCK"|"INELIGIBLE"} StockStatus
 * @typedef {"primary"|"info"|"warning"|"error"|"disabled"} Style
 */

/**
 * @param {StockStatus} stockStatus
 * @param {string} stock
 * @returns {Style|null}
 */
const getStockStyle = (stockStatus, stock) => {
  switch (stockStatus) {
    case "IN STOCK":
      if (stock && Number(stock.match(/\d+/)[0]) < 10) {
        return "warning";
      } else {
        return "primary";
      }
    case "LOW STOCK":
      if (stock && Number(stock.match(/\d+/)[0]) === 0) {
        return "error";
      } else {
        return "warning";
      }
    case "OUT OF STOCK":
      return "error";
    case "INELIGIBLE":
      return "disabled";
    default:
      return null;
  }
};
/**
 * @param {Style} _style
 * @returns {SxProps|null}
 */
const getStyle = (_style) => {
  switch (_style) {
    case "primary":
      return style.primary;
    case "info":
      return style.info;
    case "warning":
      return style.warning;
    case "error":
      return style.error;
    case "disabled":
      return style.disabled;
    default:
      return null;
  }
};

const CardinalDscBox = styled(({ ...props }) => <Box {...props} />)(
  ({ theme }) => ({
    margin: 2,
    padding: 6,
    fontSize: 12,
    fontWeight: 800,
    minWidth: 144,
    display: "flex",
    justifyContent: "center",
    border: "1px solid",
    borderColor: theme.palette.grey[500],
    borderRadius: 4,
  })
);
const CardinalProduct = ({ data, lastUpdated }) => {
  const {
    cin,
    name,
    brandName,
    amu,
    mfr,
    ndc,
    contract,
    stockStatus,
    stock,
    rebateEligible,
    returnable,
    avlAlertUpdated,
    avlAlertExpected,
    avlAlertAddMsg,
    histLow,
    lastOrdered,
    lastCost,
    lastSFDCDate,
    lastSFDCCost,
  } = data;

  return (
    <Box sx={style.container}>
      <Box sx={{ ...style.content, ...style.header }}>
        <Typography sx={style.cin}>{cin}</Typography>
        <LastUpdated data={lastUpdated} />
      </Box>
      <Divider />
      <Box sx={style.content}>
        <Typography sx={style.name}>{name}</Typography>
        <Typography sx={style.mfr}>{mfr}</Typography>
      </Box>
      <Divider />
      <Box sx={style.contentTable}>
        <Box>
          <Typography sx={style.key}>NDC</Typography>
          <Typography sx={style.key}>LAST ORDERED</Typography>
        </Box>
        <Box>
          <Typography sx={style.value}>{ndc}</Typography>
          <Typography sx={style.value}>{lastOrdered}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={style.list}>
        <CardinalDscBox
          sx={contract ? style.primary : brandName ? style.info : style.warning}
          children={contract ? contract : brandName ? "BRAND" : "NO CONTRACT"}
        />
        {avlAlertUpdated ? (
          <CustomTooltip title={<AvlAlert data={data} />}>
            <CardinalDscBox
              sx={getStyle(getStockStyle(stockStatus, stock))}
              children={stock ? `${stockStatus} (${stock})` : stockStatus}
            />
          </CustomTooltip>
        ) : (
          <CardinalDscBox
            sx={getStyle(getStockStyle(stockStatus, stock))}
            children={stock ? `${stockStatus} (${stock})` : stockStatus}
          />
        )}
        <CardinalDscBox
          sx={rebateEligible === false ? style.disabled : null}
          children="REBATE ELIGIBLE"
        />
        <CardinalDscBox
          sx={
            returnable === true
              ? style.primary
              : returnable === false
              ? style.error
              : style.disabled
          }
          children="RETURNABLE"
        />
      </Box>
      <Divider />
      <Box>
        {amu ? (
          <Box sx={style.contentTable}>
            <Box>
              <Typography sx={style.key}>LAST COST</Typography>
              <Typography sx={style.key}>LAST SFDC ORDERED</Typography>
              <Typography sx={style.key}>LAST SFDC COST</Typography>
              <Typography sx={style.key}>HISTORICAL LOW</Typography>
            </Box>
            <Box>
              <Typography sx={style.value}>{lastCost}</Typography>
              <Typography sx={style.value}>{lastSFDCDate}</Typography>
              <Typography sx={style.value}>{lastSFDCCost}</Typography>
              <Typography sx={style.value}>{histLow}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={style.circularProgress}>
            <CustomCircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardinalProduct;
