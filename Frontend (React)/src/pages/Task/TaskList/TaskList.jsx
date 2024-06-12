import React, { useEffect } from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useLocation } from "react-router-dom";
import { fetchTasks, fetchUsersTasks } from "../../../ReduxToolkit/TaskSlice";

const TaskList = () => {
  const [age, setAge] = React.useState("");
  const { task,auth } = useSelector((store) => store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get('filter');
  const dispatch=useDispatch()

  useEffect(()=>{

  },[])

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(()=>{
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}))
    }
    else{
      
      dispatch(fetchUsersTasks({status:filterValue || "ASSIGNED"}))
    }
  },[filterValue])

  return (
    <div className="space-y-5 w-[67vw]">
      

      {task.tasks.length>0 ?<div className="space-y-2 ">
        {task.tasks.map((item) => (
          <TaskCard item={item} />
        ))}
      </div>:<div className="flex flex-col justify-center items-center h-[70vh]">
        <NotInterestedIcon sx={{fontSize:"15rem"}}/>
        <h1 className="font-bold text-xl">You Don't Have Any Pending Task</h1>
        </div>}
    </div>
  );
};

export default TaskList;
