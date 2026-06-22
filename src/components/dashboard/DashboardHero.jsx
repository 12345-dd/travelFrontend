import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

function DashboardHero() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeToken();
    navigate("/");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        mb: 4,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#1565C0,#42A5F5)",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
      >
        Welcome Back
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          opacity: 0.9,
        }}
      >
        Plan your next adventure with AI
      </Typography>

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/create-trip")
          }
          sx={{
            bgcolor: "white",
            color: "#1565C0",
            fontWeight: "bold",
          }}
        >
          Create Trip
        </Button>

        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={logoutHandler}
          sx={{
            color: "white",
            borderColor: "white",
            ml:3
          }}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default DashboardHero;