import React from "react";
import { Box } from "@mui/material";

import QrCodeSvg from "../../../../../svg/QrCode";
import LoadingSvg from "../../../../../svg/Loading";
import WarningSvg from "../../../../../svg/Warning";
import VerifiedSvg from "../../../../../svg/Verified";

const style = {
  width: "100%",
  aspectRatio: "1/1",
  display: "flex",
  justifyContent: "center",
};

const ScanStatusDiagram = ({ status }) => {
  const { isUpdating, isUpdated, error } = status;
  return (
    <Box sx={style}>
      {error ? (
        <WarningSvg />
      ) : isUpdating ? (
        <LoadingSvg />
      ) : isUpdated ? (
        <VerifiedSvg />
      ) : (
        <QrCodeSvg />
      )}
    </Box>
  );
};

export default ScanStatusDiagram;
