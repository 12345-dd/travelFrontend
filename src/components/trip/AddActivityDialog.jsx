import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";

function AddActivityDialog({open, onClose, onSubmit}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    onSubmit({
      title: data.title,
      description: data.description,
      estimatedCostUSD: Number(
        data.estimatedCostUSD
      ),
      timeOfDay: data.timeOfDay,
    });

    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add Activity
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          {...register("title", {
            required:
              "Title is required",
          })}
          error={!!errors.title}
          helperText={
            errors.title?.message
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          margin="normal"
          {...register("description")}
        />

        <TextField
          fullWidth
          type="number"
          label="Estimated Cost"
          margin="normal"
          {...register(
            "estimatedCostUSD"
          )}
        />

        <TextField
          fullWidth
          select
          label="Time Of Day"
          margin="normal"
          defaultValue="Morning"
          {...register("timeOfDay")}
        >
          <MenuItem value="Morning">
            Morning
          </MenuItem>

          <MenuItem value="Afternoon">
            Afternoon
          </MenuItem>

          <MenuItem value="Evening">
            Evening
          </MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(submitHandler)}
        >
          Add Activity
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddActivityDialog;