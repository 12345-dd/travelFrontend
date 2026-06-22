import {
  Card,
  CardContent,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import HotelIcon from "@mui/icons-material/Hotel";
import StarIcon from "@mui/icons-material/Star";

function HotelsSection({ hotels }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Recommended Hotels
      </Typography>

      <Grid container spacing={3}>
        {hotels?.map((hotel, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={2}
                >
                  <HotelIcon color="primary" />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {hotel.name}
                  </Typography>
                </Box>

                <Chip
                  label={hotel.tier}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={2}
                >
                  <StarIcon
                    sx={{
                      color: "#FFC107",
                    }}
                  />

                  <Typography>
                    {hotel.rating}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  fontWeight={600}
                >
                  ${hotel.estimatedCostNightUSD}/Night
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HotelsSection;