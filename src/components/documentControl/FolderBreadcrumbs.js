import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

import { Link as RouterLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";

import { ROOT_FOLDER } from "../hooks/useFolder";

function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        {<HomeIcon fontSize="small" color="primary" sx={{ mt: 0.8 }} />}
        {path.map((folder, index) => (
          <Link
            key={folder.id}
            sx={{ waxWidth: 200, textDecoration: "none" }}
            underline="hover"
            color="inherit"
            to={{
              pathname: folder.id ? `/folders/${folder.id}` : `/folders`,
            }}
            state= {{ folder: { ...folder, path: path.slice(1, index) } }}
            as={RouterLink}
          >

            <Typography noWrap color="textSecondary">
              {" "}
              {folder.name}
            </Typography>
          </Link>
        ))}
        {currentFolder && (
          <Typography noWrap color="textSecondary">
            {" "}
            {currentFolder.name}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}

export default FolderBreadcrumbs;
