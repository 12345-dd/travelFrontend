import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import TripCard from "../components/dashboard/TripCard";
import EmptyTrips from "../components/dashboard/EmptyTrips";

import { authHeader } from "../utils/auth";
import { showError } from "../utils/toast";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const fetchTrips = async () => {
    try {
      const res = await axios.get(
        "https://travelbackend-1-3zq9.onrender.com/trips",
        {
          headers: authHeader(),
        }
      );

      setTrips(res.data.trips);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed To Load Trips"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const totalTrips = trips.length;

  const totalHotels = trips.reduce(
    (acc, trip) =>
      acc + (trip.hotels?.length || 0),
    0
  );

  const totalPackingItems =
    trips.reduce(
      (acc, trip) =>
        acc +
        (trip.packingList?.length || 0),
      0
    );

  const totalBudget = trips.reduce(
    (acc, trip) =>
      acc +
      (trip.estimatedBudget?.total || 0),
    0
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <DashboardHero />

      <DashboardStats
        totalTrips={totalTrips}
        totalHotels={totalHotels}
        totalPackingItems={
          totalPackingItems
        }
        totalBudget={totalBudget}
      />

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{mb:3}}
      >
        My Trips
      </Typography>

      {trips.length === 0 ? (
        <EmptyTrips />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            },
            gap: 3,
          }}
        >
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              fetchTrips={fetchTrips}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Dashboard;