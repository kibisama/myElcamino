import { Box, Divider, Typography } from "@mui/material";
import LastUpdated from "../LastUpdated";
import PsPackage from "../PsPackage";
import CustomBoxButton from "../../../customs/CustomBoxButton";

const style = {
  container: {
    maxWidth: 952,
  },
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
    outlineColor: "secondary.light",
    "&:hover": {
      outline: "3px solid",
      outlineColor: "secondary.main",
    },
  },
};

const PsAlternative = ({ data, packageData, lastUpdated }) => {
  return (
    <Box sx={style.container}>
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
            <CustomBoxButton sx={{ ...style.item, ..._style }}>
              <PsPackage data={v} />
            </CustomBoxButton>
          );
        })}
      </Box>
    </Box>
  );
};
export default PsAlternative;
