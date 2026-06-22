import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authHeader } from "../../utils/auth";
import {
  showSuccess,
  showError,
} from "../../utils/toast";

function TripCard({
  trip,
  fetchTrips,
}) {
  const navigate = useNavigate();

  const handleDelete = async (
    tripId
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete trip to ${trip.destination}?`
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:4000/trips/${tripId}`,
        {
          headers: authHeader(),
        }
      );

      showSuccess(
        "Trip Deleted Successfully"
      );

      if (fetchTrips) {
        fetchTrips();
      }
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed To Delete Trip"
      );
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 5,
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform:
            "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{mb:2}}
        >
          <LocationOnIcon color="primary" />

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {trip.destination}
          </Typography>
        </Box>

        <Chip
          icon={<CalendarMonthIcon />}
          label={`${trip.durationDays} Days`}
          sx={{ mb: 2 }}
        />

        <Typography sx={{mb:1}}>
          Budget : {trip.budgetTier}
        </Typography>

        <Typography sx={{mb:2}}>
          Hotels :{" "}
          {trip.hotels?.length || 0}
        </Typography>

        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{mb:3}}
        >
          {trip.interests?.map(
            (interest) => (
              <Chip
                key={interest}
                label={interest}
                size="small"
              />
            )
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <VisibilityIcon />
            }
            onClick={() =>
              navigate(
                `/trip/${trip._id}`
              )
            }
          >
            View
          </Button>

          <Button
            fullWidth
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() =>
              handleDelete(
                trip._id
              )
            }
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TripCard;