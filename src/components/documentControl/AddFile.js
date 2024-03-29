import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

import { Modal, Typography } from "@mui/material";

import {
  db,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
  collection,
  addDoc,
} from "../../firebase";

import { useAuth } from "../contexts/AuthContext";

import { useParams } from "react-router-dom";
import { ROOT_FOLDER } from "../hooks/useFolder";

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

function AddFile({ currentFolder }) {
  //to grab route parameters
  const { projectId } = useParams();

  const { currentUser } = useAuth();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
    setUploading(false);
  };

  const modalChange = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFileType(e.target.files[0].type);
    }
  };

  const modalUpload = (e) => {
    if (currentFolder == null || file == null) return;

    setUploading(true);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${fileName}`
        : `${currentFolder.id}/${fileName}`;

    console.log("filePath is:", filePath);

    const storageRef = ref(storage, `Files/${filePath}`);

    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on(
      "state-changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert("error: file not uploaded");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL)
          await addDoc(collection(db, `files/`), {
            folderId: currentFolder.id,
            name: fileName,
            file_type: fileType,
            creation_date: serverTimestamp(),
            url: downloadURL,
            size: file.size,
          })
            .then(() => alert("File is posted"))
            .catch((error) => alert("error: " + error));

          setFile(null);
          setFileType("");
          setFileName("");
          setUploading(false);
        });
      }
    );

    setOpen(false);
  };

  return (
    <Box sx={{ ...addFile }}>
      <Box sx={{ ...addFileContainer }} onClick={modalOpen}>
        <AddIcon sx={{ mr: 1 }} color="primary" />
        <Typography> New File </Typography>
      </Box>

      {/* modal for uploading file */}
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
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
          <Typography>Select files you want to upload!</Typography>
          {uploading ? (
            <Typography>Uploading...</Typography>
          ) : (
            <>
              <input type="file" onChange={modalChange} />
              <button onClick={modalUpload}>Upload</button>
            </>
          )}
        </Box>
      </Modal>

      {file && (
        <Box sx={{ ml: 5 }}>
          <Typography component={"span"} variant={"body2"} fontWeight={600}>
            Uploading % : {uploadProgress}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AddFile;
