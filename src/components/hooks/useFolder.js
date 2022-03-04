import { QuerySnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";

import {
  db,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "../../firebase";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
};

const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };

    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    //if no folderId then we know its Root_Folder so we pass it
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    //if folderId not null
    getDoc(doc(db, "folders", folderId)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Folder Data:", docSnap.data());
        const formattedFolderData = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formattedFolderData },
        });
      } else {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      }
    });
  }, [folderId]);


  //looks for child folders of the current location 
  useEffect(() => {
    let childFolders = [];
    return getDocs(
      query(collection(db, "folders"), where("parentId", "==", folderId))
    ).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        childFolders.push({ id: doc.id, ...doc.data() });

        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: childFolders },
        });
      });
    });
  }, [folderId]);

  return state;
}
