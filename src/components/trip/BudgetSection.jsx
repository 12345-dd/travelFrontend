import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import Grid from '@mui/material/Grid';

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function BudgetSection({ estimatedBudget }) {
  const budgetItems = [
    {
      title: "Transport",
      value: estimatedBudget?.transport,
      icon: <DirectionsBusIcon />,
      color: "#E3F2FD",
    },
    {
      title: "Accommodation",
      value: estimatedBudget?.accommodation,
      icon: <HotelIcon />,
      color: "#E8F5E9",
    },
    {
      title: "Food",
      value: estimatedBudget?.food,
      icon: <RestaurantIcon />,
      color: "#FFF3E0",
    },
    {
      title: "Activities",
      value: estimatedBudget?.activities,
      icon: <LocalActivityIcon />,
      color: "#F3E5F5",
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Budget Summary
      </Typography>

      <Grid container spacing={3} mb={5}>
        {budgetItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card
              sx={{
                borderRadius: 4,
                bgcolor: item.color,
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {item.icon}

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    ${item.value}
                  </Typography>
                </Box>

                <Typography mt={2}>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default BudgetSection;