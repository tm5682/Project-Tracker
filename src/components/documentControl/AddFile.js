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

function AddFile() {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const [downloadURL, setDownloadURL] = useState("");

  const [fileSize, setFileSize] = useState();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0)

  let organizationName = "ETC Marine";
  let projectName = "Hazel"


  const modalOpen = () => {
    setOpen(true);
    setUploadProgress(0)
  };

  const modalClose = () => {
    setOpen(false);
  };

  const modalChange = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };



  const modalUpload = () => {
    setUploading(true);

    const storageRef = ref(
      storage,
      `${organizationName}/${projectName}/${file.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on(
      "state-changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);

        setFileSize(snapshot.bytesTransferred)
      },
      (error) => {
        alert("error: file not uploaded");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
         setDownloadURL(downloadURL)
        });
      }
    );

    //we pass orgName+projectName changed to string and without any space as collection Name
    saveFileInfo((organizationName + projectName).toString().replace(/\s/g, ''))

    setOpen(false);
  
  };

 
  const saveFileInfo = async (collectionName) => {

   await addDoc(collection(db, collectionName), {
      name: file.name,
      file_type: file.type,
      creation_date: serverTimestamp(),
      url: downloadURL,
      project_name: projectName,
      org_name: organizationName,
      size: fileSize,
    }).then(() => alert("File is posted"))
    .catch((error) => alert("error: " + error));

    setFile(null)
    setUploading(false)
    setUploadProgress("Uploaded")     

  }


  return (
    <Box sx={{ ...addFile }}>
      <Box sx={{ ...addFileContainer }} onClick={modalOpen}>
        <AddIcon sx={{ mr: 1 }} />
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
            backgroundColor: "secondary", 
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
     

     { file &&
        <Box sx={{ ml: 5 }}>
        
            <Typography component={"span"} variant={"body2"} fontWeight={600}>
            Uploading % : {uploadProgress}
          </Typography>
        </Box>
      }

    </Box>
  );
}

export default AddFile;
