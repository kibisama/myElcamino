import { useState, useImperativeHandle, useRef } from "react";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { useCSVReader, formatFileSize } from "react-papaparse";
import FileSvg from "../../../../svg/File";

const style = {
  zoneHover: {
    cursor: "pointer",
    borderColor: "primary.main",
  },
  file: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  info: {
    position: "relative",
    top: -95,
    height: 0,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  size: {
    px: 1,
    borderRadius: 1,
    marginBottom: 1,
  },
  //
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
};

const Zone = styled(({ ...props }) => <Box {...props} />)(({ theme }) => ({
  border: "2px dashed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: 4,
  borderColor: theme.palette.grey[500],
  borderRadius: 8,
  ":hover": {
    cursor: "pointer",
    borderColor: theme.palette.primary.main,
  },
}));

export default function CSVReader({ onAccepted, width, height, ref }) {
  const theme = useTheme();
  const removeRef = useRef(null);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      remove: (e) => {
        if (removeRef.current) {
          removeRef.current(e);
        }
      },
    }),
    []
  );
  return (
    <CSVReader
      onUploadAccepted={(results) => {
        onAccepted && onAccepted(results);
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => {
        removeRef.current = getRemoveFileProps().onClick;
        return (
          <Zone
            sx={Object.assign(
              { width: width || 400, height: height || 300 },
              zoneHover && style.zoneHover
            )}
            {...getRootProps()}
          >
            {acceptedFile ? (
              <Box sx={style.file}>
                <FileSvg width="60%" />
                <Box style={style.info}>
                  <Box
                    sx={{
                      ...style.size,
                      backgroundColor: theme.palette.secondary.dark,
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    {formatFileSize(acceptedFile.size)}
                  </Box>
                  <Typography sx={{ fontSize: 13 }}>
                    {acceptedFile.name}
                  </Typography>
                </Box>
                <div style={style.progressBar}>
                  <ProgressBar
                    style={{ backgroundColor: theme.palette.primary.main }}
                  />
                </div>
              </Box>
            ) : (
              <Typography>Drop CSV file here or click to upload</Typography>
            )}
          </Zone>
        );
      }}
    </CSVReader>
  );
}
