import React, { useState, useEffect } from 'react'

import FileItem from './FileItem'

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

const FilesView = ({files}) => {
  

    return (
        <div className='fileView'>

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
                files.map((file) => (
                    <FileItem key={file.id} id={file.id} name={file.name} timestamp={file.creation_date} fileUrl={file.url} size={file.size} />
                ))
            }
        </div>
    )
}

export default FilesView
