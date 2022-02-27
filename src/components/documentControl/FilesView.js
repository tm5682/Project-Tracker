import React, { useState, useEffect } from 'react'

import FileItem from './FileItem'
import RecentFileCard from './RecentFileCard'
import './DocumentControl.css'

import {
  db,
  getDocs,
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

import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';

const FilesView = () => {
    const [files, setFiles] = useState([])

      //to grab route parameters
   const { projectId } = useParams();
   let organizationName = "ETCMarine"
   let projectName = "Matrix"

    //useEffect - we use this to fetch data beforehand and populate state
  useEffect(() => {
    const getFiles = async () => {
      const filesFromServer = await fetchFiles();
      setFiles(filesFromServer);
    };
    getFiles();
  }, []);

  //collection reference for firebase connection to projectList
  const collectionRef = collection(db,`Files/${organizationName}/${projectName}`);

  //Fetch project data - calls firebase store and
  const fetchFiles = async () => {
    let filesList = [];
    await getDocs(collectionRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          filesList.push({ id: doc.id, item: doc.data() });
        });
      })
      //error catch
      .catch((err) => {
        console.log(err.message);
      });
     
    return filesList;
  };

    return (
        <div className='fileView'>

<Typography
        color="textSecondary"
        sx={{ mt:5, display: "inline-block" }}
        variant="h6"
        id="tableTitle"
      >
        Recent Files:
      </Typography>

            <div className="fileView__row">
                {
                    files.slice(0, 5).map(({ id, item }) => (
                        <RecentFileCard key={id} name={item.name} />
                    ))

                }
            </div>
            <div className="fileView__titles">
                <div className="fileView__titles--left">
                    <p>Name</p>
                </div>
                <div className="fileView__titles--right">
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div>
            {
                files.map(({ id, item }) => (
                    <FileItem key={id} id={id} name={item.name} timestamp={item.creation_date} fileUrl={item.url} size={item.size} />
                ))
            }
        </div>
    )
}

export default FilesView
