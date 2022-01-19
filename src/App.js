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
import { collection, getDocs } from "firebase/firestore";

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

  //Fetch project data - calls firebase store and
  const fetchProjects = async () => {
    let projectListObjects = [];
    const colRef = collection(db, "projectList");
    await getDocs(colRef)
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

  //Add Project
  //const addProject = (name, clientName, actionList) => {
  // const id = Math.floor(Math.random() * 1000) + 1;

  // const newProject = { id, ...project };

  // setProjects([...projectList, newProject]);

  const addProject = async (project) => {
    const res = await fetch("http://localhost:8000/projectList", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const data = await res.json();
    setProjects([...projectList, data]);
  };

  //Delete Project
  const deleteProject = async (id) => {
    await fetch("http://localhost:8000/projectList/" + id, {
      method: "DELETE",
    });

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
        </Routes>
      </Layout>
    </Router>
    //</ThemeProvider>
  );
};

export default App;
