import Project from "./Project";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

const ProjectList = () => {
  const [projectList, setProjects] = useState([]);

  //useEffect - we use this to fetch data beforehand and populate state
  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects();
      setProjects(projectsFromServer);
    };
    getProjects();
  }, []);

  //collection reference for firebase connection to projectList
  const collectionRef = collection(db, "projectList");

  //Fetch project data - calls firebase store and
  const fetchProjects = async () => {
    let projectListObjects = [];
    await getDocs(collectionRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          projectListObjects.push({ ...doc.data(), id: doc.id });
        });
      })
      //error catch
      .catch((err) => {
        console.log(err.message);
      });
    return projectListObjects;
  };

  //Delete Project with firebase
  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projectList", id));

    //update state
    setProjects(projectList.filter((project) => project.id !== id));
  };

  //Toggle Reminder
  const toggleProject = (id) => {
    setProjects(
      projectList.map((project) =>
        project.id === id
          ? { ...project, actionList: !project.actionList }
          : project
      )
    );
  };

  return (
    <Container sx={{ boxShadow: 0 }}>
      <Grid container spacing={3}>
        {projectList.map((project) => (
          <Grid item key={project.id} sm={4}>
            <Project
              project={project}
              onDelete={deleteProject}
              onToggle={toggleProject}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectList;
