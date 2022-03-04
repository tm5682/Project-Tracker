import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddFile from "./AddFile";
import FilesView from "./FilesView";
import AddFolderButton from "./AddFolderButton";
import {useFolder} from "../hooks/useFolder"

import Folder from "./Folder";
import RecentFileCard from "./RecentFileCard";



function DocumentPage() {

const { folder, childFolders} = useFolder("QNwTR6PaBV7Avsb3NTzq")
//console.log("childFolder data:", childFolders)
console.log(childFolders instanceof Object)


  return (  
    <Box>
      <Box sx={{display:"flex"}}>
      <AddFile />
      <AddFolderButton currentFolder={folder}  />
      
      {childFolders.length > 0 && (
        <Box>
          {childFolders.map( childFolder => (
            <Box key={childFolder.id} sx={{ maxWidth: "250" }}> 
              {console.log(childFolder)}
              <RecentFileCard key={childFolder.id} folder={childFolder} /> 
            </Box>
          ))}
        </Box>
      )}

      </Box>

    </Box>
  );
}

export default DocumentPage;
