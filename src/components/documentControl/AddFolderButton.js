import React, { useState } from "react";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

//import { database } from "../../firebase"
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
//import { ROOT_FOLDER } from "../../hooks/useFolder"

import {
  db,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
} from "../../firebase";

import { ROOT_FOLDER } from "../hooks/useFolder";

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

const addFile = {
  display: "flex",
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  padding: "12px 0",
};

const paper = {
  position: "absolute",
  width: 400,
  border: "2px solid #000",

};

//function for modal
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

export default function AddFolderButton({ currentFolder }) {
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    //create a folder in firebase
    await addDoc(collection(db, `folders/`), {
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: serverTimestamp(),
    })
      .then(() => alert("Folder is created"))
      .catch((error) => alert("error: " + error));

    setName("");
    closeModal();
  }

  return (
    <>
      <Box sx={{ ...addFile, ml: 5 }}>
        <Box sx={{ ...addFileContainer }} onClick={openModal}>
          <CreateNewFolderIcon color="primary" sx={{ fontSize: 20, mr: 1.5 }} />
          <Typography> New Folder </Typography>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={modalStyle}
          sx={{
            ...paper,
            backgroundColor: "white",
            boxShadow: 5,
            padding: 5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New Folder Name
              </Typography>

              <Input
                id="input-with-icon-adornment"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <CreateNewFolderIcon />
                  </InputAdornment>
                }
              />
            </FormControl>


            <ButtonGroup>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Modal>
    </>
  );
}
