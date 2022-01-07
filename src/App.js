import { useState } from "react";

import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";

const App = () => {
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
  const toggleFavorie = (id) => {
    setProjects(
      projectList.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      )
    );
  };

  return (
    <div className="container">
      <Header />
      <AddProject onAdd={addProject} />
      {projectList.length > 0 ? (
        <ProjectList
          projectList={projectList}
          onDelete={deleteProject}
          onToggle={toggleFavorie}
        />
      ) : (
        "No Project to Show."
      )}
    </div>
  );
};

export default App;
