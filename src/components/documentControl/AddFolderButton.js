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
         <Box sx={{ ...addFile, ml:5 }}>
        <Box sx={{ ...addFileContainer }} onClick={openModal}>
        <CreateNewFolderIcon color="primary" sx={{ fontSize: 20, mr:1.5 }}/>
        <Typography> New Folder </Typography>
      </Box>
      </Box>
 \
 
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
