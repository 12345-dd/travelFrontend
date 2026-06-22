import {
  Card,
  Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HotelIcon from "@mui/icons-material/Hotel";
import BackpackIcon from "@mui/icons-material/Backpack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function TripStats({ trip }) {
  const stats = [
    {
      icon: <CalendarMonthIcon color="primary" sx={{ fontSize: 40 }} />,
      value: trip.durationDays,
      title: "Days",
    },
    {
      icon: <HotelIcon color="success" sx={{ fontSize: 40 }} />,
      value: trip.hotels?.length,
      title: "Hotels",
    },
    {
      icon: <BackpackIcon color="warning" sx={{ fontSize: 40 }} />,
      value: trip.packingList?.length,
      title: "Packing Items",
    },
    {
      icon: <AttachMoneyIcon color="success" sx={{ fontSize: 40 }} />,
      value: `$${trip.estimatedBudget?.total}`,
      title: "Budget",
    },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {stats.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              height: "100%",
            }}
          >
            {item.icon}

            <Typography
              variant="h5"
              fontWeight="bold"
              mt={1}
            >
              {item.value}
            </Typography>

            <Typography color="text.secondary">
              {item.title}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TripStats;