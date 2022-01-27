import { Chip, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

function PassFail() {
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
              Pass Fail Form
            </Typography>
          }
        />
      </Divider>

      {/* This will have the select asset on left and an add button to its right */}
      <Box sx={{ display: "flex" }}></Box>

      {/* end of main object Box */}
    </Box>
  );
}

export default PassFail;
