import React from "react";
import { Modal, Typography } from "@mui/material";
import lasomarie from "../../../wav/lasomarie.wav";
import ModalHeader from "../ModalHeader";
import ModalBox from "../ModalBox";

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 420,
  },
  msg: {
    minHeight: 80,
    px: 2,
    display: "flex",
    fontSize: "1.2rem",
    justifyContent: "center",
    alignItems: "center",
  },
};

const generateErrorMsg = (error) => {
  switch (error) {
    case 1:
      return "An invalid code scanned. Please try again.";
    default:
      return "Unexpected Error";
  }
};

const ChildErrorModal = ({ error, handleClose }) => {
  React.useEffect(() => {
    if (error) {
      new Audio(lasomarie).play();
    }
  }, [error]);

  return (
    <Modal sx={style.container} open={error != null}>
      <React.Fragment>
        <ModalBox sx={style.box}>
          <ModalHeader handleClose={handleClose} />
          <Typography sx={style.msg}>{generateErrorMsg(error)}</Typography>
        </ModalBox>
      </React.Fragment>
    </Modal>
  );
};

export default ChildErrorModal;
