import Project from "./Project";

const Projects = ({ projects, onDelete, onToggle }) => {
  return (
    <>
      'we are looping through the projects, outputting the project component and
      passing the project as a prop
      {projects.map((project) => (
        <Project
          key={project.id}
          project={project}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Projects;
