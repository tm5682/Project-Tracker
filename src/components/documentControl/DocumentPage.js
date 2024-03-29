import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddFile from "./AddFile";
import FilesView from "./FilesView";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../hooks/useFolder";

import Folder from "./Folder";
import { Typography } from "@mui/material";

import { useParams, useLocation } from "react-router-dom";

import FolderBreadcrumbs from "./FolderBreadcrumbs";

function DocumentPage() {
  const { folderId } = useParams();

  //useLocation react router state 
  const { state= {}} = useLocation()

  console.log("State 1 is:", state)

  const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);
  
  console.log("Folder is:", folder)
  //console.log(childFolders);

  return (
    <Box>
       <FolderBreadcrumbs sx={{display:"inline-flex"}} currentFolder={folder} />
      <Box sx={{ display: "flex", mb: 5 }}>

        <AddFile currentFolder={folder}  />
        <AddFolderButton currentFolder={folder} />
      </Box>

      <Typography
        color="textSecondary"
        sx={{ mb: 2, display: "inline-block" }}
        variant="h6"
      >
        Folders
      </Typography>

      {childFolders.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {childFolders.map((childFolder) => (
            <Box
              key={childFolder.id}
              sx={{ maxWidth: "200", display: "inline-flex" }}
            >
              {/* {console.log(childFolder)} */}
              <Folder folder={childFolder} />
            </Box>
          ))}
        </Box>
      )}

            {console.log("childFiles are:", childFiles)}
      <FilesView files = {childFiles} />
    </Box>
  );
}

export default DocumentPage;
