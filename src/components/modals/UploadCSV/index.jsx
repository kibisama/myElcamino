import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setApps } from "../../../reduxjs@toolkit/globalSlice";
import { Box, Button, Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import CSVReader from "./CSVReader";
import { checkDRxCSV } from "../../../lib/api/client";

const UploadCSV = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setApps(null));
  };
  const [data, setData] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const onAccepted = async ({ data }) => {
    try {
      await checkDRxCSV({ csvHeader: data[0] });
      setData(data);
      setDisableSubmit(false);
    } catch (e) {
      setDisableSubmit(true);
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
          <Box sx={{ justifySelf: "flex-end", pt: 2 }}>
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
              children="SUBMIT"
              variant="outlined"
              sx={{ width: 100, height: 40 }}
            />
          </Box>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default UploadCSV;
