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
import { getImportDRx, postImportDRx } from "../../../../../../lib/api/client";

export default function UploadDRx() {
  const theme = useTheme();
  const { mode, systemMode } = useColorScheme();
  const removeRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const { CSVReader } = useCSVReader();
  const [disable, setDisable] = React.useState(true);
  const [zoneHover, setZoneHover] = React.useState(false);
  const [data, setData] = React.useState(null);
  const handleClear = React.useCallback((e) => {
    removeRef.current(e);
    setData(null);
    setDisable(true);
  }, []);
  const handleSubmit = React.useCallback(() => {
    setDisable(true);
    (async function () {
      try {
        const { data: result } = await postImportDRx({ data });
        enqueueSnackbar(result.message, { variant: "success" });
        setData(null);
        setDisable(false);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(e.response?.data.message || e.message, {
          variant: "error",
        });
        setDisable(false);
      }
    })();
  }, [data]);

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
          setZoneHover(false);
          (async function () {
            try {
              const { data } = await getImportDRx();
              const headerTable = {};
              results.data[0].forEach((v) => {
                headerTable[v] = true;
              });
              const reqFields = data.data;
              for (let i = 0; i < reqFields.length; i++) {
                if (!headerTable[reqFields[i]]) {
                  return enqueueSnackbar(
                    `The CSV file does not have one or more required fields, including ${reqFields[i]}`,
                    { variant: "error" }
                  );
                }
              }
              setData(results.data);
              setDisable(false);
            } catch (e) {
              console.error(e);
              enqueueSnackbar(e.response?.data.message || e.message, {
                variant: "error",
              });
            }
          })();
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
        {({ getRootProps, acceptedFile, getRemoveFileProps }) => {
          removeRef.current = getRemoveFileProps().onClick;
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
                  mode === "dark" || systemMode === "dark"
                    ? (theme.vars || theme).palette.grey[700]
                    : (theme.vars || theme).palette.grey[200],
                borderRadius: 1,
                ":hover": {
                  cursor: "pointer",
                  // border: "2px solid",
                  // borderColor: (theme.vars || theme).palette.primary.main,
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
                    or click to browse (up to 50 MB)
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
          disabled={disable}
          sx={{ width: 100 }}
          variant="outlined"
          children="CLEAR"
          onClick={handleClear}
        />
        <Button
          disabled={disable}
          sx={{ width: 100 }}
          variant="outlined"
          children="SUBMIT"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
}
