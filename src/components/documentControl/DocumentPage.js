import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddFile from "./AddFile";
import FilesView from "./FilesView";
import AddFolderButton from "./AddFolderButton";
import { useFolder } from "../hooks/useFolder";

import Folder from "./Folder";
import { Typography } from "@mui/material";

import {useParams} from "react-router-dom"

function DocumentPage() {
  const { folderId } = useParams()
  const { folder, childFolders } = useFolder(folderId);
  //console.log("childFolder data:", childFolders)
  console.log(childFolders);

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 5 }}>
        <AddFile />
        <AddFolderButton currentFolder={folder} />
      </Box>

      <Typography
        color="textSecondary"
        sx={{  mb:2, display: "inline-block" }}
        variant="h6"
      >
        Folders
      </Typography>

      {childFolders.length > 0 && (
        <Box sx={{mb:3}}>
          {childFolders.map((childFolder) => (
            <Box
              key={childFolder.id}
              sx={{ maxWidth: "200", display: "inline-flex" }}
            >
              {/* {console.log(childFolder)} */}
              <Folder key={childFolder.id} folder={childFolder} />
            </Box>
          ))}
        </Box>
      )}

      <FilesView />
    </Box>
  );
}

export default DocumentPage;
