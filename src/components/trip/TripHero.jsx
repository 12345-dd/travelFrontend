import {
  Box,
  Chip,
  Paper,
  Typography
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function TripHero({ trip }) {
  return (
    <Paper
      elevation={8}
      sx={{
        p: 5,
        mb: 4,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#1565C0,#42A5F5)",
        color: "white",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <FlightTakeoffIcon
            sx={{ fontSize: 50 }}
          />

          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {trip.destination}
            </Typography>

            <Typography variant="h6">
              {trip.durationDays} Days •{" "}
              {trip.budgetTier} Budget
            </Typography>
          </Box>
        </Box>

        <Box textAlign="right">
          <Typography variant="body2">
            Total Budget
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            ${trip.estimatedBudget?.total}
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        {trip.interests?.map((item) => (
          <Chip
            key={item}
            label={item}
            sx={{
              mr: 1,
              mb: 1,
              bgcolor: "white",
              fontWeight: 600,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default TripHero;