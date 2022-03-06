import React from "react";
import "./DocumentControl.css";

import FolderIcon from '@mui/icons-material/Folder';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const RecentFileCard = ({ folder }) => {
  return (
    <>
    <Box  sx={{
                  "&:hover": {
                    color: "red",
                    bgcolor: "lightYellow",
                  },

                  backgroundColor: "white",
                }}>
      <div className="fileCard">
        <div className="fileCard--top">
          <FolderIcon color="primary" style={{ fontSize: 50 }} />
        </div>

        <div className="fileCard--bottom">
         <Typography sx={{mt:1}}variant="body2"> {folder.name} </Typography>
        </div>
      </div>
      </Box>
    </>
  );
};

export default RecentFileCard;
