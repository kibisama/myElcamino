import { Box, Divider, Typography } from "@mui/material";

const style = {
  container: {
    width: 300,
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  mfr: {
    fontSize: 12,
    color: "text.secondary",
  },
  lastUpdated: {
    justifySelf: "flex-end",
    fontSize: 10,
  },
  table: {
    p: 1,
    minHeight: 88,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  key: {
    width: "25%",
    fontSize: 13,
    fontWeight: 600,
  },
  value: {
    display: "flex",
    justifyContent: "flex-end",
    width: "75%",
    fontSize: 13,
  },
};

const PsItem = ({ data, lastUpdated, option }) => {
  const { description, ndc, manufacturer, qtyAvl, lotExpDate, wholesaler } =
    data;
  const { shortDated } = option;
  return (
    <Box sx={style.container}>
      <Box>
        <Typography sx={style.description}>{description}</Typography>
        <Box sx={style.subtitle}>
          <Typography sx={style.mfr}>{manufacturer}</Typography>
          <Typography sx={style.lastUpdated}>{lastUpdated}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={style.table}>
        <Box sx={style.key}>NDC</Box>
        <Box sx={style.value}>{ndc}</Box>
        <Box sx={style.key}>VENDOR</Box>
        <Box sx={{ ...style.value, fontWeight: 600 }}>{wholesaler}</Box>
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
