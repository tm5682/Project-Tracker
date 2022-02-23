import React, { useState, useEffect } from 'react'
import '../../styles/FilesView.css'

import FileItem from './FileItem'
import RecentFileCard from './RecentFileCard'

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

const FilesView = () => {
    const [files, setFiles] = useState([])

      //to grab route parameters
   const { projectId } = useParams();
   let organizationName = "ETCMarine"
   let projectName = "Enron"

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
          filesList.push({ ...doc.data(), id: doc.id });
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
            <div className="fileView__row">
                {
                    files.slice(0, 5).map(({ id, item }) => (
                        <RecentFileCard name={item.name} />
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
                    <FileItem id={id} name={item.name} timestamp={item.creation_date} fileUrl={item.url} size={item.size} />
                ))
            }
        </div>
    )
}

export default FilesView
