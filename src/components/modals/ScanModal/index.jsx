import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setError } from "../../../reduxjs@toolkit/scanSlice";
import { Modal } from "@mui/material";
import ModalBox from "../ModalBox";
import ModalHeader from "../ModalHeader";
import ScanInputForm from "./ScanInputForm";
import ChildErrorModal from "../ChildErrorModal";

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

const ScanModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.scan);
  const { open, error } = state;
  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(setError(null));
  };
  const handleChildClose = () => {
    dispatch(setError(null));
  };

  return (
    <Modal sx={style.container} open={open}>
      <React.Fragment>
        <ModalBox sx={style.box}>
          <ModalHeader handleClose={handleClose} />
          <ScanInputForm state={state} />
          <ChildErrorModal error={error} handleClose={handleChildClose} />
        </ModalBox>
      </React.Fragment>
    </Modal>
  );
};

export default ScanModal;
