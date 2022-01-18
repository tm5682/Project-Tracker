import { Box, Typography } from "@mui/material";

function FilesView() {
  return (
    <Box>
      FilesView
      <Box>fileview row</Box>
      <Box>
        fileview titles
        <Box>
          FileView title left
          <Typography>Name</Typography>
        </Box>
        <Box>
          FileView title right
          <Typography>Last modified</Typography>
          <Typography>Files Size</Typography>
        </Box>
      </Box>
      {/* File items */}
    </Box>
  );
}

export default FilesView;
