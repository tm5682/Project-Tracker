//importing font awesome icons from react-icons
import { FaTimes } from 'react-icons/fa'




const Project = ({ project }) => {
    return (
        <div className='project'>
            <br />
            <h3> 
                {project.name}  <FaTimes style={{ color: 
                'red', cursor: 'pointer'}} />
            </h3>
            <br />
            <p> <b>Client Name:</b> {project.client_name} </p>
            <br />
        </div>
    )
}

export default Project
