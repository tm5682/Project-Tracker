import { useState } from "react";

import Header from "./components/Header";
import ProjectList from "./components/ProjectList";

const App = () => {
  const [projectList, setProjects] = useState([
    {
      id: 1,
      name: "Project Nexus",
      clientName: "Vale",
      currentStatus: true,
    },
    {
      id: 2,
      name: "Project Pegasus",
      clientName: "Exxon",
      currentStatus: true,
    },
    {
      id: 3,
      name: "Project Enron",
      clientName: "Suncor",
      currentStatus: false,
    },
  ]);

  //Delete Project
  const deleteProject = (id) => {
    setProjects(projectList.filter((project) => project.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setProjects(
      projectList.map((project) =>
        project.id === id
          ? { ...project, currentStatus: !project.currentStatus }
          : project
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {projectList.length > 0 ? (
        <ProjectList
          projectList={projectList}
          onDelete={deleteProject}
          onToggle={toggleReminder}
        />
      ) : (
        "No Project to Show."
      )}
    </div>
  );
};

export default App;
