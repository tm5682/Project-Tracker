import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";

import CardNote from "./CardNote";

import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

function Issues() {
  const [issues, setIssues] = useState([]);

  // json-server code
  // useEffect(() => {
  //   fetch("http://localhost:8000/issues")
  //     .then((res) => res.json())
  //     .then((data) => setIssues(data));
  // }, []);

  //this is to load data to state from firestore
  useEffect(() => {
    const getIssues = async () => {
      const issuesFromServer = await fetchIssues();
      setIssues(issuesFromServer);
    };
    getIssues();
  }, []);

  //collection reference for firebase connection to projectList
  const collectionRef = collection(db, "issues");

  //Fetch project data - calls firebase store and
  const fetchIssues = async () => {
    let issuesList = [];
    await getDocs(collectionRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          issuesList.push({ ...doc.data(), id: doc.id });
        });
      })
      //error catch
      .catch((err) => {
        console.log(err.message);
      });
    return issuesList;
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/issues/" + id, {
      method: "DELETE",
    });

    const newIssues = issues.filter((issue) => issue.id !== id);
    setIssues(newIssues);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {issues.map((issue) => (
          <Grid item key={issue.id} xs={12} md={6} lg={4}>
            <CardNote issue={issue} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Issues;
