import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  FormControlLabel,
} from "@mui/material";

import * as Yup from "yup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { submitTask } from "../../../ReduxToolkit/SubmissionSlice";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.string()
    .url("Please enter a valid URL")
    .required("Image URL is required"),
  description: Yup.string().required("Description is required"),
  deadline: Yup.date().required("Deadline is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 4,
  boxShadow: "rgba(215, 106, 255, 0.507) 0px 0px 100px",
};

const SubmitTaskForm = ({ open, handleClose,taskId }) => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    githubLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
dispatch(submitTask({taskId,githubLink:formData.githubLink}))
    console.log("Form data: submit task", formData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Github URL"
                fullWidth
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                sx={{ padding: ".8rem" }}
                fullWidth
                className="customeButton"
                variant="contained"
                type="submit"
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default SubmitTaskForm;
