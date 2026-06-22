import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { showError, showSuccess } from "../utils/toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      await axios.post(
        "http://localhost:4000/signup",
        data
      );

      showSuccess("Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A,#3B82F6)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Circles */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          top: -100,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          bottom: -80,
          right: -80,
        }}
      />

      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            display: "flex",
            minHeight: 650,
            backdropFilter: "blur(20px)",
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              flex: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              flexDirection: "column",
              justifyContent: "center",
              background:
                "linear-gradient(135deg,#1565C0,#42A5F5)",
              color: "white",
              p: 6,
            }}
          >
            <FlightTakeoffIcon
              sx={{
                fontSize: 90,
                mb: 3,
              }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              Join The Journey
            </Typography>

            <Typography
              sx={{
                mt: 2,
                mb:2,
                lineHeight: 1.8,
                opacity: 0.9,
                fontSize: "1.05rem",
              }}
            >
              Create your account and start
              generating AI-powered travel
              itineraries, hotel suggestions,
              budget plans and packing lists.
            </Typography>

            <Box mt={5}>
              <Typography mb={2}>
                ✓ Personalized Travel Plans
              </Typography>

              <Typography mb={2}>
                ✓ Smart Budget Planning
              </Typography>

              <Typography mb={2}>
                ✓ Hotel Recommendations
              </Typography>

              <Typography>
                ✓ AI Packing Assistant
              </Typography>
            </Box>
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              flex: 1,
              p: {
                xs: 4,
                md: 6,
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              mb={1}
            >
              Create Account
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Start planning your next adventure.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(
                submitHandler
              )}
            >
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 3,
                    },
                }}
                {...register("name", {
                  required:
                    "Name is required",
                })}
                error={!!errors.name}
                helperText={
                  errors.name?.message
                }
              />

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 3,
                    },
                }}
                {...register("email", {
                  required:
                    "Email is required",
                })}
                error={!!errors.email}
                helperText={
                  errors.email?.message
                }
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius: 3,
                    },
                }}
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Minimum 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={
                  errors.password?.message
                }
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                startIcon={
                  <PersonAddIcon />
                }
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg,#1565C0,#42A5F5)",
                  boxShadow:
                    "0 10px 25px rgba(25,118,210,0.35)",
                  transition: "0.3s",
                  "&:hover": {
                    transform:
                      "translateY(-2px)",
                  },
                }}
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              <Typography
                sx={{mt:2}}
                textAlign="center"
              >
                Already have an account?
                <Link
                  to="/"
                  style={{
                    marginLeft: 5,
                    color: "#1976d2",
                    fontWeight: 600,
                    textDecoration:
                      "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;