//Will have all the projects
//Getting state from global app in app.js 

import Project from "./Project"

const Projects = ({ projects }) => {

    

    return (
        <>
            {projects.map(project => <Project key={project.id} project={project} /> )}    
        </>
    )
}

export default Projects
