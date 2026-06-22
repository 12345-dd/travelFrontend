import React from "react";
import { useForm } from "react-hook-form";
import { showError, showSuccess } from "../utils/toast";
import axios from "axios";
import { setToken } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LoginIcon from "@mui/icons-material/Login";

function Login() {
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
      const res = await axios.post(
        "https://travelbackend-1-3zq9.onrender.com/login",
        data
      );

      setToken(res.data.token);

      showSuccess("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Login Failed"
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
      {/* Decorative Circle */}
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
            minHeight: 620,
            backdropFilter: "blur(20px)",
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          {/* Left Section */}
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
              AI Travel Planner
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
              Generate complete AI-powered
              itineraries, budget planning,
              hotel recommendations and
              packing lists in seconds.
            </Typography>

            <Box mt={5}>
              <Typography mb={2}>
                &#10003; Smart Itinerary Generation
              </Typography>

              <Typography mb={2}>
                &#10003; Hotel Recommendations
              </Typography>

              <Typography mb={2}>
                &#10003; Budget Estimation
              </Typography>

              <Typography>
                &#10003; Packing Assistant
              </Typography>
            </Box>
          </Box>

          {/* Right Section */}
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
              Welcome Back
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Sign in to continue planning
              your next adventure.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(
                submitHandler
              )}
            >
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
                startIcon={<LoginIcon />}
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
                  ? "Logging In..."
                  : "Login"}
              </Button>

              <Typography
                sx={{mt:2}}
                textAlign="center"
              >
                Don't have an account?
                <Link
                  to="/signup"
                  style={{
                    marginLeft: 5,
                    color: "#1976d2",
                    fontWeight: 600,
                    textDecoration:
                      "none",
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;