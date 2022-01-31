import { Box } from "@mui/system";
import React, { useState } from "react";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import Header from "./Header";

function SelectProject() {
  const [showAddProject, setShowAddProject] = useState(false);

  return (
    <Box>
      {/* Header and Add project */}
      <Header
        onAdd={() => setShowAddProject(!showAddProject)}
        showAdd={showAddProject}
      />

      {showAddProject && <AddProject />}

      <ProjectList />

      {/* end of main arent object */}
    </Box>
  );
}

export default SelectProject;
