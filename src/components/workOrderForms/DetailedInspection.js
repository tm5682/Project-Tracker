import {
  Box,
  Chip,
  Divider,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";

import FileUploadForm from "./FileUploadForm";

function DetailedInspection() {
  //states

  //this is to hold selected assets
  const [selectedAssets, setSelectedAssets] = useState([]);

  //this is to deal with selected assets for the checklist
  const onSelectedAssets = (event, selectedAssets) => {
    setSelectedAssets(selectedAssets);
  };

  //this is to hold checkListTask value
  const [checkListTask, setCheckListTask] = useState();

  return (
    //Main parent object
    <Box>
      {/* Form Header Label */}
      {/* We use a divider with chip and inside chip use the form header */}
      <Divider sx={{ mb: 3 }}>
        <Chip
          label={
            <Typography
              variant="h6"
              color={"textSecondary"}
              sx={{ fontWeight: 400, mt: -0.5 }}
              gutterBottom
              align="center"
            >
              Detailed Inspection
            </Typography>
          }
        />
      </Divider>

      {/* This will have the select asset o its left and text field to its right */}
      <Box sx={{ display: "flex", mt: 6 }}>
        {/* asset select */}
        <Autocomplete
          sx={{ minWidth: 200 }}
          size="medium"
          onChange={onSelectedAssets}
          multiple
          id="tags-filled"
          options={assetOptions}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              // foo(option);

              return (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Select Asset"
              placeholder="Select Asset"
            />
          )}
        />

        {/* TextBox */}
        <TextField
          multiline
          maxRows={4}
          value={checkListTask}
          onChange={(e) => setCheckListTask(e.target.value)}
          id="outlined-multiline-flexible"
          label="Inspection Task"
          variant="outlined"
          sx={{ ml: 4, minWidth: 400 }}
        />
      </Box>

      {/* Long text field descripion of inspection task */}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="standard-multiline-static"
          label="Description of Inspection"
          multiline
          rows={4}
          // defaultValue=""
          variant="standard"
        />
      </Box>

      {/* This handles multiple file upload for technical spec */}
      <Box sx={{ mt: 6 }} display={"block"}>
        <Typography color="textSecondary" sx={{ mb: 1 }}>
          {" "}
          Upload Technical Specification Documents
        </Typography>
        <Box sx={{ ml: -1 }}>
          <FileUploadForm />
        </Box>
      </Box>

      {/* End of main parent Box */}
    </Box>
  );
}

//for now keeping the assset options to select for labels
const assetOptions = [
  "galley",
  "cleaning",
  "sea water cooling pipework",
  "starboard generator",
  "Micro-commander",
  "UPS",
  "Generator",
  "Main Engine",
  "Propulsion",
  "steering",
  "crane",
  "bow thruster",
  "haul",
  "rudder",
  "stern frame",
  "Tank soundings",
  "Fuel tank #3 PORT",
  "Engine Room",
  "Dishwasher",
  "Public Address System",
  "windlass",
  "Navigation Lights",
  "Fuses",
  "A-Frame",
  "hydraulic",
  "Radar",
  "Magnetron",
  "Wiper Seal",
  "hydraulic cylinder",
  "telephone",
  "convection oven",
  "dry store",
  "SKF Coupling",
  "Intermediate shaft",
  "docking",
  "Assessment",
  "Repair",
  "HQ",
  "Hull",
  "Silva",
  "Labour",
  "Parts",
  "Piping",
  "electronic",
  "Electrical",
  "KS",
  "Mechanical",
  "operations",
  "Trim Tabs",
  "Certificate",
  "Inspection",
  "harness",
  "lanyard",
  "Striker",
  "Survey",
  "Fire Detection",
  "Fire safety",
  "Life Saving",
  "Safety",
  "Lift",
  "LIfting Gear",
  "Davits",
  "hauler",
  "davit",
  "Rigging",
  "Report",
];

export default DetailedInspection;
