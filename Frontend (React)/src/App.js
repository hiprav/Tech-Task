import { ThemeProvider } from "@mui/material";
import "./App.css";

import Home from "./pages/Home/Home";
import darkTheme from "./theme/darkTheme";
import Navbar from "./pages/Navbar/Navbar";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import { fetchTasks, fetchUsersTasks } from "./ReduxToolkit/TaskSlice";


function App() {
  const dispatch=useDispatch()
  const {auth}=useSelector(store=>store)
  
  useEffect(()=>{
    dispatch(getUserProfile(localStorage.getItem("jwt")))
    
  },[auth.jwt])

  useEffect(()=>{
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks())
    }
    else{
      dispatch(fetchUsersTasks())
    }
  },[auth.user])
  return (
    <ThemeProvider theme={darkTheme}>
      
      {auth.user?<div>
      <Navbar/>
      <Home />
      </div>:<Auth/> }
      
      
    </ThemeProvider>
  );
}

export default App;
