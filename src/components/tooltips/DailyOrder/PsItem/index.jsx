import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    width: 300,
  },
  header: {
    p: 0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
  },
  ndc: {
    fontSize: 12,
  },
  lastUpdated: {
    justifySelf: "flex-end",
    fontSize: 10,
  },
  table: {
    p: 0.5,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  topValue: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    fontSize: 11,
  },
  key: {
    width: "27%",
    fontSize: 13,
    fontWeight: 600,
  },
  value: {
    display: "flex",
    justifyContent: "flex-end",
    width: "73%",
    fontSize: 13,
  },
};

const PsItem = ({ data, lastUpdated, option = {}, variant, sx }) => {
  const {
    description,
    ndc,
    manufacturer,
    pkgPrice,
    unitPrice,
    qtyAvl,
    lotExpDate,
    wholesaler,
  } = data;
  const { shortDated } = option;
  return (
    <Box sx={variant ? { ...{ width: 294 }, ...sx } : style.container}>
      <Box sx={style.header}>
        <Typography sx={style.description}>{description}</Typography>
        <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
      </Box>
      <Divider />
      <Box sx={{ ...style.table, minHeight: 42 }}>
        <Box sx={style.topValue}>{ndc}</Box>
        <Box sx={style.topValue}>{manufacturer}</Box>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box sx={style.key}>VENDOR</Box>
        <Box sx={{ ...style.value, fontWeight: 600 }}>{wholesaler}</Box>
        {variant && (
          <>
            <Box sx={style.key}>COST</Box>
            <Box sx={style.value}>{pkgPrice}</Box>
            <Box sx={style.key}>UNIT COST</Box>
            <Box sx={style.value}>{unitPrice}</Box>
          </>
        )}
        <Box
          sx={shortDated ? { ...style.key, color: "warning.main" } : style.key}
        >
          EXP DATE
        </Box>
        <Box
          sx={
            shortDated ? { ...style.value, color: "warning.main" } : style.value
          }
        >
          {lotExpDate}
        </Box>
        <Box sx={style.key}>QTY AVL</Box>
        <Box sx={style.value}>{qtyAvl}</Box>
      </Box>
    </Box>
  );
};
export default PsItem;
