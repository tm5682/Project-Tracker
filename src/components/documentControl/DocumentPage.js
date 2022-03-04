import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddFile from "./AddFile";
import FilesView from "./FilesView";
import AddFolderButton from "./AddFolderButton";
import {useFolder} from "../hooks/useFolder"

import Folder from "./Folder";



function DocumentPage() {

const { folder, childFolders} = useFolder("QNwTR6PaBV7Avsb3NTzq")
console.log(folder)



  return (
    <Box>
      <Box sx={{display:"flex"}}>
      <AddFile />
      <AddFolderButton currentFolder={folder}  />
      
      {childFolders.length > 0 && (
        <Box>
          {childFolders.map( childFolder => (
            <Box key={folder.id} sx={{ maxWidth: "250" }}> 
              <Folder folder={childFolder} />
            </Box>
          ))}
        </Box>
      )}

      </Box>

      <FilesView />
    </Box>
  );
}

export default DocumentPage;
