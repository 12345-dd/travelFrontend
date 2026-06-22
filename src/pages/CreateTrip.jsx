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
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../utils/auth";
import { showError, showSuccess } from "../utils/toast";

function CreateTrip() {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const submitHandler = async (data) => {
    try {
      const payload = {
        destination: data.destination,
        durationDays: Number(data.durationDays),
        budgetTier: data.budgetTier,
        interests,
      };

      const res = await axios.post(
        "http://localhost:4000/trips",
        payload,
        {
          headers: authHeader(),
        }
      );

      showSuccess("Trip Generated Successfully");

      setTimeout(() => {
        navigate(`/trip/${res.data.Trip._id}`);
      }, 1000);
    } catch (err) {
      console.log(err);

      showError(
        err.response?.data?.message ||
          "Failed To Generate Trip"
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
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
          gutterBottom
        >
          Create New Trip
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Tell us about your dream trip and let AI
          generate a complete itinerary.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextField
            fullWidth
            label="Destination"
            margin="normal"
            {...register("destination", {
              required: "Destination is required",
            })}
            error={!!errors.destination}
            helperText={errors.destination?.message}
          />

          <TextField
            fullWidth
            type="number"
            label="Number Of Days"
            margin="normal"
            {...register("durationDays", {
              required: "Duration is required",
              min: {
                value: 1,
                message: "Minimum 1 day",
              },
            })}
            error={!!errors.durationDays}
            helperText={errors.durationDays?.message}
          />

          <TextField
            fullWidth
            select
            label="Budget Type"
            margin="normal"
            defaultValue=""
            {...register("budgetTier", {
              required: "Budget is required",
            })}
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
              onChange={(e) =>
                setInterests(e.target.value)
              }
              input={
                <OutlinedInput label="Interests" />
              }
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                    />
                  ))}
                </Box>
              )}
            >
              {interestOptions.map(
                (interest) => (
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
              ? "Generating..."
              : "Generate AI Trip"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateTrip;