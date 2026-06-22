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
  Card,
  CardContent,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SavingsIcon from "@mui/icons-material/Savings";
import ExploreIcon from "@mui/icons-material/Explore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
        "https://travelbackend-1-3zq9.onrender.com/trips",
        payload,
        {
          headers: authHeader(),
        }
      );

      showSuccess("Trip Generated Successfully");

      setTimeout(() => {
        navigate(`/trip/${res.data.Trip._id}`);
      }, 3000);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed To Generate Trip"
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>

      <Paper
        elevation={6}
        sx={{
          p: 5,
          mb: 4,
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "white",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <FlightTakeoffIcon
            sx={{ fontSize: 45 }}
          />

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Create New Trip
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{ opacity: 0.9 }}
        >
          Let AI generate your complete travel
          itinerary, hotels, budget planning and
          packing checklist.
        </Typography>
      </Paper>

      <Grid container spacing={4}>

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 5,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              Trip Information
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(
                submitHandler
              )}
            >
              <TextField
                fullWidth
                label="Destination"
                margin="normal"
                placeholder="e.g. Paris, Dubai, Tokyo"
                {...register("destination", {
                  required:
                    "Destination is required",
                })}
                error={!!errors.destination}
                helperText={
                  errors.destination?.message
                }
              />

              <TextField
                fullWidth
                type="number"
                label="Number Of Days"
                margin="normal"
                {...register("durationDays", {
                  required:
                    "Duration is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 day",
                  },
                })}
                error={!!errors.durationDays}
                helperText={
                  errors.durationDays?.message
                }
              />

              <TextField
                fullWidth
                select
                label="Budget Tier"
                margin="normal"
                defaultValue=""
                {...register("budgetTier", {
                  required:
                    "Budget is required",
                })}
                error={!!errors.budgetTier}
                helperText={
                  errors.budgetTier?.message
                }
              >
                <MenuItem value="Low">
                  Low Budget
                </MenuItem>

                <MenuItem value="Medium">
                  Medium Budget
                </MenuItem>

                <MenuItem value="High">
                  Luxury Budget
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
                    setInterests(
                      e.target.value
                    )
                  }
                  input={
                    <OutlinedInput label="Interests" />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {selected.map(
                        (value) => (
                          <Chip
                            key={value}
                            label={value}
                            color="primary"
                          />
                        )
                      )}
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
                startIcon={
                  <AutoAwesomeIcon />
                }
                sx={{
                  mt: 4,
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {isSubmitting
                  ? "Generating AI Trip..."
                  : "Generate AI Trip"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Card
            sx={{
              borderRadius: 5,
              mb: 3,
            }}
          >
            <CardContent>
              <ExploreIcon
                color="primary"
                sx={{
                  fontSize: 45,
                  mb: 1,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Smart Itinerary
              </Typography>

              <Typography
                color="text.secondary"
              >
                Day wise travel planning generated
                by AI.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 5,
              mb: 3,
            }}
          >
            <CardContent>
              <SavingsIcon
                color="success"
                sx={{
                  fontSize: 45,
                  mb: 1,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Budget Planning
              </Typography>

              <Typography
                color="text.secondary"
              >
                Get estimated travel, food and
                hotel expenses.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 5,
            }}
          >
            <CardContent>
              <AutoAwesomeIcon
                color="warning"
                sx={{
                  fontSize: 45,
                  mb: 1,
                }}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                AI Recommendations
              </Typography>

              <Typography
                color="text.secondary"
              >
                Hotels, activities and packing list
                generated automatically.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateTrip;