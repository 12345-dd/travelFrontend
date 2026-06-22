import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function BudgetSection({ estimatedBudget }) {
  const budgetItems = [
    {
      title: "Transport",
      value: estimatedBudget?.transport,
      icon: <DirectionsBusIcon sx={{ fontSize: 34 }} />,
      color: "#E3F2FD",
    },
    {
      title: "Accommodation",
      value: estimatedBudget?.accommodation,
      icon: <HotelIcon sx={{ fontSize: 34 }} />,
      color: "#E8F5E9",
    },
    {
      title: "Food",
      value: estimatedBudget?.food,
      icon: <RestaurantIcon sx={{ fontSize: 34 }} />,
      color: "#FFF3E0",
    },
    {
      title: "Activities",
      value: estimatedBudget?.activities,
      icon: <LocalActivityIcon sx={{ fontSize: 34 }} />,
      color: "#F3E5F5",
    },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{mb:3}}
      >
        Budget Summary
      </Typography>

      <Grid container spacing={3}>
        {budgetItems.map((item) => (
          <Grid
            key={item.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                bgcolor: item.color,
                height: 170,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
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
                  textAlign: "center",
                }}
              >
                <Box mb={1}>
                  {item.icon}
                </Box>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  ${item.value}
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
    </Box>
  );
}

export default BudgetSection;