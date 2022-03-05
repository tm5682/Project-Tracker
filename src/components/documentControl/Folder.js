import React from "react"
import { Link } from "react-router-dom"

import FolderIcon from '@mui/icons-material/Folder';
import { Button, Typography } from "@mui/material"



export default function Folder({ folder }) {

  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outlined"
      as={Link}
      sx={{ maxWidth: 200, minWidth:200, display:"inline-flex", mr:5, mb:4, alignSelf:"center", textDecoration: "none"}}
    >
      <FolderIcon style={{fontSize: 30}} color="primary"/>
      <Typography noWrap sx={{mt:0.6, ml:2}} variant="body2" color="black"> {folder.name} </Typography>
    </Button>
  )
}