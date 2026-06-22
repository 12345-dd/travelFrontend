import {
  Card,
  CardContent,
  Chip,
  Typography,
  Box
} from "@mui/material";
import Grid from '@mui/material/Grid';

import HotelIcon from "@mui/icons-material/Hotel";
import StarIcon from "@mui/icons-material/Star";

function HotelsSection({ hotels }) {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Recommended Hotels
      </Typography>

      <Grid container spacing={3} mb={5}>
        {hotels?.map((hotel, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform:
                    "translateY(-8px)",
                  boxShadow: 10,
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
                  mb={1}
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

                <Typography>
                  ${hotel.estimatedCostNightUSD}
                  /Night
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default HotelsSection;