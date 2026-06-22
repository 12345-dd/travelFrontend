import {
  Card,
  Typography,
  Box,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HotelIcon from "@mui/icons-material/Hotel";
import BackpackIcon from "@mui/icons-material/Backpack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function DashboardStats({
  totalTrips,
  totalHotels,
  totalPackingItems,
  totalBudget,
}) {
  const stats = [
    {
      icon: (
        <FlightTakeoffIcon
          sx={{
            fontSize: 40,
            color: "#1976d2",
          }}
        />
      ),
      value: totalTrips,
      title: "Trips Created",
      bg: "#E3F2FD",
    },
    {
      icon: (
        <HotelIcon
          sx={{
            fontSize: 40,
            color: "#2E7D32",
          }}
        />
      ),
      value: totalHotels,
      title: "Hotels Suggested",
      bg: "#E8F5E9",
    },
    {
      icon: (
        <BackpackIcon
          sx={{
            fontSize: 40,
            color: "#EF6C00",
          }}
        />
      ),
      value: totalPackingItems,
      title: "Packing Items",
      bg: "#FFF3E0",
    },
    {
      icon: (
        <AttachMoneyIcon
          sx={{
            fontSize: 40,
            color: "#7B1FA2",
          }}
        />
      ),
      value: `$${totalBudget}`,
      title: "Total Budget",
      bg: "#F3E5F5",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        },
        gap: 3,
        mb: 5,
      }}
    >
      {stats.map((item) => (
        <Card
          key={item.title}
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 8,
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: item.bg,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            {item.icon}
          </Box>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {item.value}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              fontWeight: 500,
            }}
          >
            {item.title}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

export default DashboardStats;