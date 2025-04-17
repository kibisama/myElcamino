import { Box, Divider, Typography } from "@mui/material";
import LastUpdated from "../LastUpdated";
import PsPackage from "../PsPackage";
import CustomBoxButton from "../../../customs/CustomBoxButton";

const style = {
  content: {
    p: 0.25,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: 800,
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    m: 0.5,
    p: 0.5,
  },
  sameNdc: {
    outline: "2px solid",
    outlineColor: "primary.light",
    "&:hover": {
      outline: "3px solid",
      outlineColor: "primary.main",
    },
  },
  sameSize: {
    outline: "2px solid",
    outlineColor: "info.light",
    "&:hover": {
      outline: "3px solid",
      outlineColor: "info.main",
    },
  },
};

const handleOnClickPs = (data) =>
  data?.ndc &&
  window.open(
    `https://pharmsaver.net/Pharmacy/Order.aspx?q=${data.ndc.replaceAll(
      "-",
      ""
    )}`,
    "_blank"
  );

const PsAlternative = ({ data, packageData, lastUpdated }) => {
  return (
    <Box
      sx={
        data.length > 2
          ? { width: 952 }
          : data.length > 1
          ? { width: 636 }
          : null
      }
    >
      <Box sx={{ ...style.content, ...style.header }}>
        <Typography sx={style.title}>PHARMSAVER DEALS</Typography>
        <LastUpdated data={lastUpdated} />
      </Box>
      <Divider />
      <Box sx={{ ...style.content, ...style.list }}>
        {data.map((v) => {
          const _style =
            packageData && packageData.ndc11 && v.ndc === packageData.ndc11
              ? style.sameNdc
              : packageData.size && v.pkg === packageData.size
              ? style.sameSize
              : null;
          return (
            <CustomBoxButton
              sx={{ ...style.item, ..._style }}
              onClick={() => handleOnClickPs(v)}
            >
              <PsPackage data={v} />
            </CustomBoxButton>
          );
        })}
      </Box>
    </Box>
  );
};
export default PsAlternative;
