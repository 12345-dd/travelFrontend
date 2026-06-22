import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TripHero from "../components/trip/TripHero";
import TripStats from "../components/trip/TripStats";
import BudgetSection from "../components/trip/BudgetSection";
import HotelsSection from "../components/trip/HotelsSection";
import PackingSection from "../components/trip/PackingSection";
import ItinerarySection from "../components/trip/ItinerarySection";

import { authHeader } from "../utils/auth";
import { showError } from "../utils/toast";

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const res = await axios.get(
        `https://travelbackend-1-3zq9.onrender.com/trips/${id}`,
        {
          headers: authHeader(),
        }
      );

      setTrip(res.data.trip);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed To Load Trip"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
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

  if (!trip) {
    return (
      <Typography
        align="center"
        variant="h5"
        mt={5}
      >
        Trip Not Found
      </Typography>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <TripHero trip={trip} />

      <TripStats trip={trip} />

      <BudgetSection
        estimatedBudget={
          trip.estimatedBudget
        }
      />

      <HotelsSection
        hotels={trip.hotels}
      />

      <PackingSection
        packingList={trip.packingList}
      />

      <ItinerarySection
        itinerary={trip.itinerary}
        tripId={trip._id}
        fetchTrip={fetchTrip}
      />
      
    </Container>
  );
}

export default TripDetails;