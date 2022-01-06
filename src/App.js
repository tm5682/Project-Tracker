import { useState } from "react";

import Header from "./components/Header";
import Projects from "./components/Projects";

const App = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project Nexus",
      client_name: "Vale",
      current_status: true,
    },
    {
      id: 2,
      name: "Project Pegasus",
      client_name: "Exxon",
      current_status: true,
    },
    {
      id: 3,
      name: "Project Enron",
      client_name: "Suncor",
      current_status: false,
    },
  ]);

  //Delete Project
  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, current_status: !project.current_status }
          : project
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {projects.length > 0 ? (
        <Projects
          projects={projects}
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
