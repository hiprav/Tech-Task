import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { createNewTask, fetchTaskById, updateTask } from "../../../ReduxToolkit/TaskSlice";

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

const UpdateTaskForm = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const { auth,task } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    deadline: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds,
    } = input;

    month = month + 1;

    const date = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );

    const formattedDate = date.toISOString();
    return formattedDate;
  };

  const handleDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const {deadline}=formData
    formData.deadline=formatDate(deadline)

    dispatch(updateTask({id:taskId, updatedTaskData:formData}))
    console.log("Form data:", formData, formatDate(deadline));
    handleClose(); 
  };

  useEffect(()=>{
    
    dispatch(fetchTaskById(taskId))

  },[taskId])

 

  useEffect(()=>{
    if(task.taskDetails){
      setFormData(task.taskDetails)
    }
    // 

  },[task.taskDetails])

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
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="w-full"
                  label="Deadline"
                  //   value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ padding: ".8rem" }}
                fullWidth
                className="customeButton"
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateTaskForm;
