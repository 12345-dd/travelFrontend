import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HotelIcon from "@mui/icons-material/Hotel";
import BackpackIcon from "@mui/icons-material/Backpack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function TripStats({ trip }) {
  const stats = [
    {
      icon: (
        <CalendarMonthIcon
          color="primary"
          sx={{ fontSize: 42 }}
        />
      ),
      value: trip.durationDays,
      title: "Days",
    },
    {
      icon: (
        <HotelIcon
          color="success"
          sx={{ fontSize: 42 }}
        />
      ),
      value: trip.hotels?.length || 0,
      title: "Hotels",
    },
    {
      icon: (
        <BackpackIcon
          color="warning"
          sx={{ fontSize: 42 }}
        />
      ),
      value: trip.packingList?.length || 0,
      title: "Packing Items",
    },
    {
      icon: (
        <AttachMoneyIcon
          color="success"
          sx={{ fontSize: 42 }}
        />
      ),
      value: `$${trip.estimatedBudget?.total || 0}`,
      title: "Budget",
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mb: 5,
      }}
    >
      {stats.map((item) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          key={item.title}
        >
          <Card
            elevation={3}
            sx={{
              height: 170,
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}

              <Typography
                variant="h4"
                fontWeight="bold"
                mt={2}
              >
                {item.value}
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TripStats;