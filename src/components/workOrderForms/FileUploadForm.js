//from material ui dropzone website code example

import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default class DropzoneDialogExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <Box>
        <IconButton onClick={this.handleOpen.bind(this)}>
          <FileUploadIcon />{" "}
          <Typography variant="body1" color="textSecondary" sx={{ ml: 1 }}>
            Upload (multiple files)
          </Typography>
        </IconButton>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          //acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
        />
      </Box>
    );
  }
}
