import React from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import {
  Box,
  Button,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { enqueueSnackbar } from "notistack";
import FileSvg from "../../../../../svg/File";
import useWindowSize from "../../../../../../hooks/useWindowSize";

export default function UploadDRx() {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const removeRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const { CSVReader } = useCSVReader();
  const [disableClear, setDisableClear] = React.useState(true);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const [zoneHover, setZoneHover] = React.useState(false);
  const [, windowWidth] = useWindowSize();
  const [pbWidth, setPbWidth] = React.useState("");
  React.useEffect(() => {
    setPbWidth(rootRef.current?.clientWidth - 64);
  }, [windowWidth]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CSVReader
        onUploadAccepted={(results) => {
          // console.log(results);
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
          acceptedFile && setDisableClear(false);
          return (
            <Box
              ref={rootRef}
              sx={{
                overflow: "hidden",
                backgroundColor: (theme.vars || theme).palette.background.paper,
                height: 280,
                width: "100%",
                border: "1px solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                borderColor:
                  mode === "dark"
                    ? (theme.vars || theme).palette.grey[700]
                    : (theme.vars || theme).palette.grey[200],
                borderRadius: 1,
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: (theme.vars || theme).palette.primary.main,
                },
                ...(zoneHover && {
                  border: "2px solid",
                  borderColor: (theme.vars || theme).palette.primary.main,
                }),
              }}
              {...getRootProps()}
            >
              {acceptedFile ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <FileSvg width="15%" />
                  <Box sx={{ ml: 2 }}>
                    <Typography sx={{ fontSize: 14 }}>
                      {acceptedFile.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, justifySelf: "flex-end" }}>
                      {formatFileSize(acceptedFile.size)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: pbWidth,
                      translate: "0 52px",
                      backgroundColor:
                        mode === "dark"
                          ? (theme.vars || theme).palette.grey[700]
                          : (theme.vars || theme).palette.grey[200],
                      position: "absolute",
                      borderRadius: "4px",
                    }}
                  >
                    <ProgressBar
                      style={{
                        height: "14px",
                        borderRadius: "4px",
                        backgroundColor: (theme.vars || theme).palette.primary
                          .dark,
                        transition: "width 2s",
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: (theme.vars || theme).palette.text.secondary,
                  }}
                >
                  <BackupIcon sx={{ fontSize: 72 }} />
                  <Typography sx={{ fontSize: 16 }}>
                    Drag & drop your CSV file
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    or click to browse
                  </Typography>
                </Box>
              )}
            </Box>
          );
        }}
      </CSVReader>
      <Box
        sx={{
          alignSelf: "flex-end",
          my: 2,
          width: 220,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={disableClear}
          sx={{ width: 100 }}
          variant="outlined"
          children="CLEAR"
          onClick={(e) => {
            removeRef.current(e);
            setDisableClear(true);
          }}
        />
        <Button
          disabled={disableSubmit}
          sx={{ width: 100 }}
          variant="outlined"
          children="SUBMIT"
          onClick={() => {}}
        />
      </Box>
    </Box>
  );
}
