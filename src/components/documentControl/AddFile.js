import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

import { Modal, Typography } from "@mui/material";

import firebase from "firebase/compat/app";

//these functions represent css that will be used within add file component

const addFile = {
  display: "flex",
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  padding: "12px 0",
};

const addFileContainer = {
  display: "Flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "6px 15px 6px 8px",
  borderRadius: "50px",
  boxShadow:
    "0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149)",
  cursor: "pointer",
};

const paper = {
  position: "absolute",
  width: 400,
  backgroundColor: (theme) => theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: (theme) => theme.shadows[5],
  padding: (theme) => theme.spacing(2, 4, 3),
};

//function for modal
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function AddFile() {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  return (
    <Box sx={{ ...addFile }}>
      <Box sx={{ ...addFileContainer }}>
        <AddIcon sx={{ mr: 1 }} />
        <Typography> New File </Typography>
      </Box>
    </Box>
  );
}

export default AddFile;
