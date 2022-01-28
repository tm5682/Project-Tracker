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

function DowntimeMaintenance() {
  //states

  //this is to hold selected assets
  const [selectedAssets, setSelectedAssets] = useState([]);

  //this is to deal with selected assets for the checklist
  const onSelectedAssets = (event, selectedAssets) => {
    setSelectedAssets(selectedAssets);
  };

  return (
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
              Downtime Maintenance
            </Typography>
          }
        />
      </Divider>

      {/* This is select the asset for downtime maintenance on first column then long text on second */}

      {/* asset select */}
      <Box>
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
              label="Select Assets For Downtime Maintenance"
              placeholder="Select Assets"
            />
          )}
        />
      </Box>

      {/* Long text field descripion of inspection task */}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="standard-multiline-static"
          label="Description of Issue(s)"
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

      {/* ENd of parent box object */}
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

export default DowntimeMaintenance;
