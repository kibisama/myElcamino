import React from "react";
import { Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 480,
  },
};

const UploadCSV = () => {
  return (
    <Modal sx={style.container}>
      <React.Fragment>
        <ModalBox sx={style.box}>
          <ModalHeader />
        </ModalBox>
      </React.Fragment>
    </Modal>
  );
};

export default UploadCSV;
