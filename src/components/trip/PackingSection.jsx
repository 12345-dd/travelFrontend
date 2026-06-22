import {
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

import BackpackIcon from "@mui/icons-material/Backpack";

function PackingSection({ packingList }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 5,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2
        }}       
      >
        <BackpackIcon color="warning" />

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Packing Assistant
        </Typography>
      </Box>

      <Box>
        {packingList?.map(
          (item, index) => (
            <Chip
              key={index}
              label={item.item}
              color="success"
              sx={{
                m: 1,
                fontWeight: 600,
              }}
            />
          )
        )}
      </Box>
    </Paper>
  );
}

export default PackingSection;