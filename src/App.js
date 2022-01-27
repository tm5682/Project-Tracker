import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";

import Create from "./components/Create";
import Issues from "./components/Issues";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container, createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import Layout from "./components/Layout";

import DocumentPage from "./components/documentControl/DocumentPage";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import cuid from "cuid";

import AddWorkOrder from "./components/workOrderForms/AddWorkOrder";

//custom theme using MUI theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#fefefe",
//     },
//     secondary: purple,
//   },
// });

const App = () => {
  const [showAddProject, setShowAddProject] = useState(false);
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

  //Add Project with just state
  //const addProject = (name, clientName, actionList) => {
  // const id = Math.floor(Math.random() * 1000) + 1;

  // const newProject = { id, ...project };

  // setProjects([...projectList, newProject]);

  //add project with json server
  // const addProject = async (project) => {
  //   const res = await fetch("http://localhost:8000/projectList", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(project),
  //   });

  //   const data = await res.json();
  //   setProjects([...projectList, data]);
  // };

  //add project with firebase installed and setup
  //we destructure the prop before adding
  const addProject = async ({
    name,
    clientName,
    actionList,
    status,
    startDate,
    estimatedEndDate,
    estimatedBudget,
    currentTotalCost,
    finalBudget,
    actualEndDate,
  }) => {
    //unique id for the project
    const newProjectId = cuid();

    //mapping new project data to be added
    const newProjectData = {
      id: newProjectId,
      name: name,
      clientName: clientName,
      actionList: actionList,
      status: status,
      startDate: startDate,
      estimatedEndDate: estimatedEndDate,
      actualEndDate: actualEndDate || null,
      estimatedBudget: estimatedBudget,
      finalBudget: finalBudget || null,
      currentTotalCost: currentTotalCost,
    };

    await setDoc(doc(db, "projectList", newProjectId), newProjectData);

    //we are updating the state with the newly added project values
    setProjects([...projectList, newProjectData]);
  };

  //Delete Project with json server
  // const deleteProject = async (id) => {
  //   await fetch("http://localhost:8000/projectList/" + id, {
  //     method: "DELETE",
  //   });

  //   setProjects(projectList.filter((project) => project.id !== id));
  // };

  //Delete Project with firebase
  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projectList", id));

    //update state
    setProjects(projectList.filter((project) => project.id !== id));
  };

  //Toggle Reminder
  const toggleProjectActionList = (id) => {
    setProjects(
      projectList.map((project) =>
        project.id === id
          ? { ...project, actionList: !project.actionList }
          : project
      )
    );
  };

  //v6 routers
  return (
    //<ThemeProvider theme={theme}>
    <Router>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Container>
                <div>
                  <Header
                    onAdd={() => setShowAddProject(!showAddProject)}
                    showAdd={showAddProject}
                  />

                  {showAddProject && <AddProject onAdd={addProject} />}

                  {projectList.length > 0 ? (
                    <ProjectList
                      projectList={projectList}
                      onDelete={deleteProject}
                      onToggle={toggleProjectActionList}
                    />
                  ) : (
                    "No Project to Show."
                  )}
                </div>
              </Container>
            }
          />

          <Route path="/create" element={<Create />} />

          <Route path="/issues" element={<Issues />} />

          <Route path="/document" element={<DocumentPage />} />
          <Route path="/addWorkOrder" element={<AddWorkOrder />} />
        </Routes>
      </Layout>
    </Router>
    //</ThemeProvider>
  );
};

export default App;
