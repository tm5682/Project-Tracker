import Project from "./Project";

const ProjectList = ({ projectList, onDelete, onToggle }) => {
  return projectList.map((project) => (
    <Project
      key={project.id}
      project={project}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  ));
};

export default ProjectList;
