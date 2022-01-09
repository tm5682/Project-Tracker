import { useState } from "react";

import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [showAddProject, setShowAddProject] = useState(false);

  const [projectList, setProjects] = useState([
    {
      id: 1,
      name: "Project Nexus",
      clientName: "Vale",
      favorite: true,
    },
    {
      id: 2,
      name: "Project Pegasus",
      clientName: "Exxon",
      favorite: true,
    },
    {
      id: 3,
      name: "Project Enron",
      clientName: "Suncor",
      favorite: false,
    },
  ]);

  //Add Project
  const addProject = (project) => {
    const id = Math.floor(Math.random() * 1000) + 1;

    const newProject = { id, ...project };

    setProjects([...projectList, newProject]);
  };

  //Delete Project
  const deleteProject = (id) => {
    setProjects(projectList.filter((project) => project.id !== id));
  };

  //Toggle Reminder
  const toggleFavorite = (id) => {
    setProjects(
      projectList.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      )
    );
  };

  //v6 routers
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="container">
              <Header
                onAdd={() => setShowAddProject(!showAddProject)}
                showAdd={showAddProject}
              />

              {showAddProject && <AddProject onAdd={addProject} />}
              {projectList.length > 0 ? (
                <ProjectList
                  projectList={projectList}
                  onDelete={deleteProject}
                  onToggle={toggleFavorite}
                />
              ) : (
                "No Project to Show."
              )}
            </div>
          }
        />

        <Route path="/notes" element={<div>Hi</div>} />
      </Routes>
    </Router>
  );
};

export default App;
