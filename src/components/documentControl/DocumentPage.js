import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

import AddFile from "./AddFile";

import FilesView from "./FilesView";

function DocumentPage() {
  return (
    <Box>
      <AddFile />
      <FilesView />
    </Box>
  );
}

export default DocumentPage;
