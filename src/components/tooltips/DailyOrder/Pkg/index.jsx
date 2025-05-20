import { Box, Divider, Typography } from "@mui/material";
import ImgThumb from "../../../atoms/ImgThumb";
import MedDefault from "../../../../svg/MedDefault";

/** @typedef {import("@mui/material").SxProps} SxProps */
/** @type {Object<string, SxProps>} */
const style = {
  container: {
    width: 500,
    p: 0.25,
  },
  content: {
    display: "flex",
  },
  key: {
    fontSize: 13,
    color: "text.secondary",
    fontWeight: 600,
  },
};

const Pkg = ({ data, url }) => {
  const { stock } = data;
  return (
    <Box sx={style.container}>
      <Box sx={style.content}>
        <ImgThumb src={url} alt={<MedDefault />} width={200} />
        <Box>
          <Typography sx={style.key}>STOCK</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Pkg;
