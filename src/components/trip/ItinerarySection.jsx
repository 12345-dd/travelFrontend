import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";


import { useState } from "react";
import axios from "axios";

import AddActivityDialog from "./AddActivityDialog";

import { authHeader } from "../../utils/auth";
import {showError, showSuccess} from "../../utils/toast";

function ItinerarySection({itinerary, tripId, fetchTrip}) {
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);

  const handleOpenDialog = (dayNumber) => {
    setSelectedDay(dayNumber);
    setOpenDialog(true);
  };

  const handleAddActivity = async (activity) => {
      try {
        await axios.post(`http://localhost:4000/trips/${tripId}/activity`,
          {
            dayNumber: selectedDay,
            activity,
          },
          {
            headers: authHeader(),
          }
        );

        showSuccess("Activity Added Successfully");

        setOpenDialog(false);

        fetchTrip();
      } catch (err) {
        showError(err.response?.data?.message || "Failed To Add Activity");
      }
    };

  const handleDeleteActivity =
    async (dayNumber, activityId) => {
      try {
        await axios.delete(`http://localhost:4000/trips/${tripId}/activity`,
          {
            headers: authHeader(),
            data: {
              dayNumber,
              activityId,
            },
          }
        );

        showSuccess("Activity Deleted Successfully");

        fetchTrip();
      } catch (err) {
        showError(err.response?.data?.message || "Failed To Delete Activity"
        );
      }
    };    

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Travel Itinerary
      </Typography>

      {itinerary?.map((day) => (
        <Paper
          key={day.dayNumber}
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            borderLeft:
              "6px solid #1976D2",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:2}}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
            >
              Day {day.dayNumber}
            </Typography>

            <Button
              variant="contained"
              sx={{mt:2}}
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog(day.dayNumber)}
            >
              Add Activity
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {day.activities?.map(
            (activity, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <ExploreIcon color="primary" />

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {activity.title}
                      </Typography>
                    </Box>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteActivity(
                          day.dayNumber,
                          activity._id
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Typography mb={1}>
                    {
                      activity.description
                    }
                  </Typography>

                  <Typography
                    color="primary"
                    mb={1}
                  >
                    {
                      activity.timeOfDay
                    }
                  </Typography>

                  <Typography>
                    Cost: $
                    {
                      activity.estimatedCostUSD
                    }
                  </Typography>
                </CardContent>
              </Card>
            )
          )}
        </Paper>
      ))}

      <AddActivityDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddActivity}
      />
    </>
  );
}

export default ItinerarySection;