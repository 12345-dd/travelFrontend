import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useForm, Controller} from "react-hook-form";

import {authHeader} from "../utils/auth";

import {showError, showSuccess} from "../utils/toast";

function EditTrip() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [interests, setInterests] = useState([]);

  const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm();

  const interestOptions = [
    "Food",
    "Culture",
    "Adventure",
    "Shopping",
    "Nature",
    "Nightlife",
    "History",
    "Photography",
  ];

  const fetchTrip = async () => {
    try {
      const res = await axios.get(
        `https://travelbackend-1-3zq9.onrender.com/trips/${id}`,
        {
          headers: authHeader(),
        }
      );

      const trip = res.data.trip;

      setValue("destination", trip.destination);

      setValue("durationDays", trip.durationDays);

      setValue("budgetTier", trip.budgetTier);

      setInterests(trip.interests || []);
    } catch (err) {
      showError(err.response?.data?.message || "Failed To Load Trip");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  const submitHandler = async (data) => {
    try {
      await axios.put(`https://travelbackend-1-3zq9.onrender.com/trips/${id}`,
        {
          budgetTier: data.budgetTier,
          interests,
        },
        {
          headers: authHeader(),
        }
      );

      showSuccess("Trip Updated Successfully");

      navigate(`/trip/${id}`);
    } catch (err) {
      showError(
        err.response?.data?.message || "Failed To Update Trip"
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignitems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ py: 5 }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{mb:1}}
        >
          Edit Trip
        </Typography>

        <Typography
          color="text.secondary"
          sx={{mb:4}}
        >
          Update your trip details
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextField
            fullWidth
            label="Destination"
            margin="normal"
            disabled
            {...register("destination")}
          />

          <TextField
            fullWidth
            type="number"
            label="Duration Days"
            margin="normal"
            disabled
            {...register("durationDays",)}
          />

          <TextField
            fullWidth
            select
            label="Budget Tier"
            margin="normal"
            defaultValue=""
            {...register("budgetTier",{
                required:
                  "Budget is required",
              }
            )}
            error={!!errors.budgetTier}
            helperText={errors.budgetTier?.message}
          >
            <MenuItem value="Low">
              Low
            </MenuItem>

            <MenuItem value="Medium">
              Medium
            </MenuItem>

            <MenuItem value="High">
              High
            </MenuItem>
          </TextField>

          <FormControl
            fullWidth
            margin="normal"
          >
            <InputLabel>
              Interests
            </InputLabel>

            <Select
              multiple
              value={interests}
              onChange={(e) =>setInterests(e.target.value)}
              input={
                <OutlinedInput label="Interests" />
              }
              renderValue={(selected) => (
                <Box
                  sx={{
                    display:"flex",
                    flexWrap:"wrap",
                    gap: 0.5,
                  }}
                >
                  {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                      />
                    )
                  )}
                </Box>
              )}
            >
              {interestOptions.map((interest) => (
                  <MenuItem
                    key={interest}
                    value={interest}
                  >
                    {interest}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              mt: 4,
              py: 1.5,
            }}
          >
            {isSubmitting
              ? "Updating..."
              : "Update Trip"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditTrip;