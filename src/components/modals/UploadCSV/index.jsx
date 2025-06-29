import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";
import {
  Box,
  CircularProgress,
  Button,
  Modal,
  useTheme,
  Typography,
} from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import CSVReader from "./CSVReader";
import { checkDRxCSV, uploadDRxCSV } from "../../../lib/api/client";

const UploadCSV = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setApps(null));
  };
  const [data, setData] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const onAccepted = async ({ data }) => {
    setStatusMsg("");
    try {
      await checkDRxCSV({ csvHeader: data[0] });
      setData(data);
      setDisableSubmit(false);
    } catch (e) {
      setDisableSubmit(true);
      if (e.code === "ERR_NETWORK") {
        return setStatusMsg("Network Error");
      }
      console.log(e);
    }
  };
  const childRef = useRef(null);
  return (
    <Modal
      open={true}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalBox>
        <ModalHeader handleClose={handleClose} />
        <Box sx={{ p: 2 }}>
          <CSVReader ref={childRef} onAccepted={onAccepted} />
          <Box sx={{ pt: 2, height: 100 }}>
            <Box sx={{ height: 40 }}>
              {statusMsg && <Typography>{statusMsg}</Typography>}
            </Box>
            <Box sx={{ justifySelf: "flex-end" }}>
              <Button
                onClick={(e) => {
                  if (childRef.current) {
                    childRef.current.remove(e);
                  }
                  setDisableSubmit(true);
                }}
                children="CLEAR"
                variant="outlined"
                sx={{ width: 100, height: 40, mr: 2 }}
              />
              <Button
                disabled={disableSubmit}
                children={
                  isUploading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: theme.palette.text.disabled }}
                    />
                  ) : (
                    "SUBMIT"
                  )
                }
                variant="outlined"
                sx={{ width: 100, height: 40 }}
                onClick={async (e) => {
                  setDisableSubmit(true);
                  setIsUploading(true);
                  try {
                    await uploadDRxCSV({ data });
                    setStatusMsg("Success");
                    setIsUploading(false);
                    if (childRef.current) {
                      childRef.current.remove(e);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default UploadCSV;
