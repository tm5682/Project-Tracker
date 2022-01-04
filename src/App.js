import { useState } from 'react'

import Header from './components/Header'
import Projects from './components/Projects';

const App = () => {

  const [projects, setProjects] = useState([
    {
        id: 1,
        name: 'Project Nexus',
        client_name: 'Vale',
        current_status: true,
    },
    {
        id: 2,
        name: 'Project Pegasus',
        client_name: 'Exxon',
        current_status: true,
    },
    {
        id: 3,
        name: 'Project Enron',
        client_name: 'Suncor',
        current_status: false,
    }
    ])

  return (
    <div className="container">
     <Header />
     <Projects projects={projects} />

    </div>
  );
}

export default App;
