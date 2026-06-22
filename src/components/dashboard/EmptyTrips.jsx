import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import LuggageIcon from "@mui/icons-material/Luggage";

import { useNavigate } from "react-router-dom";

function EmptyTrips() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 6,
        borderRadius: 5,
        textAlign: "center",
      }}
    >
      <Box mb={2}>
        <LuggageIcon
          color="primary"
          sx={{ fontSize: 70 }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
      >
        No Trips Yet
      </Typography>

      <Typography
        color="text.secondary"
        sx={{mt:1,mb:2}}
      >
        Create your first AI trip
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          navigate("/create-trip")
        }
      >
        Create Trip
      </Button>
    </Paper>
  );
}

export default EmptyTrips;