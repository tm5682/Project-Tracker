import React, { useState } from "react";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

//import { database } from "../../firebase"
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
//import { ROOT_FOLDER } from "../../hooks/useFolder"

import { db, collection, setDoc, addDoc, serverTimestamp } from "../../firebase";

export default function AddFolderButton({currentFolder}) {
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

    if (currentFolder == null) return

    //create a folder in firebase
    await addDoc(collection(db,`folders/`),  {
      name: name,
     parentId: currentFolder.id,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
    })
      .then(() => alert("Folder is created"))
      .catch((error) => alert("error: " + error));



    setName("");
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline">
        <CreateNewFolderIcon color="primary" />
      </Button>
 
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
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

            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
