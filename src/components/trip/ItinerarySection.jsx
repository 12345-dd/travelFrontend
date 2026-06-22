import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import ExploreIcon from "@mui/icons-material/Explore";

function ItinerarySection({ itinerary }) {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Travel Itinerary
      </Typography>

      {itinerary?.map((day) => (
        <Paper
          key={day.dayNumber}
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            borderLeft:
              "6px solid #1976D2",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            mb={2}
          >
            Day {day.dayNumber}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {day.activities?.map(
            (activity, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                  >
                    <ExploreIcon color="primary" />

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {activity.title}
                    </Typography>
                  </Box>

                  <Typography mb={1}>
                    {
                      activity.description
                    }
                  </Typography>

                  <Typography
                    color="primary"
                    mb={1}
                  >
                    {
                      activity.timeOfDay
                    }
                  </Typography>

                  <Typography>
                    Cost: $
                    {
                      activity.estimatedCostUSD
                    }
                  </Typography>
                </CardContent>
              </Card>
            )
          )}
        </Paper>
      ))}
    </>
  );
}

export default ItinerarySection;