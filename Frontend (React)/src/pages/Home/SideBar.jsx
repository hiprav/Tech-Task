import React, { useState } from "react";
import "./SideBar.css";
import { Avatar, Box, Button, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreateTaskForm from "../Task/CreateTask/CreateTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxToolkit/AuthSlice";

const menu = [
  { name: "Home", value:"HOME", role:["ROLE_ADMIN","ROLE_CUSTOMER"] },
  { name: "DONE", value:"DONE", role:["ROLE_ADMIN","ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value:"ASSIGNED", role:["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value:"PENDING", role:["ROLE_ADMIN"]},
  { name: "Create New Task", value:"", role:["ROLE_ADMIN"] },
  { name: "Notification", value:"NOTIFICATION", role:["ROLE_CUSTOMER"] },
];
const isAdmin = true;
const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)
  const navigate = useNavigate();
  const location = useLocation();
  const [openCreateTaskModel, setOpenCreateTaskModel] = useState(false);
  const handleOpenCreateTaskModel = () => setOpenCreateTaskModel(true);
  const handleCloseCreateTaskModel = () => setOpenCreateTaskModel(false);

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);

    if(item.name==="Create New Task"){
      handleOpenCreateTaskModel()
    }
  
    else if (item.name === "Home") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;

      navigate(updatedPath);
    } else {
      const updatedParams = new URLSearchParams(location.search);
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }

    setActiveMenu(item.name);
  };
  const handleLogout = () => {
    dispatch(logout())
    console.log("handle logout");
  };
  return (
    <div className="min-h-[85vh] flex flex-col justify-center card fixed w-[20vw]">
      <div className="space-y-5  h-full">
         <div className="flex justify-center">
         <p className="font-bold text-lg">Tech Bar</p>
          {/* <Avatar
            sx={{ width: "8rem", height: "8rem" }}
            className="border-2 border-[#c24dd0]"
            src="https://res.cloudinary.com/dxoqwusir/image/upload/v1703852575/Code_With_Zosh_e0bbz7.png"
            alt=""
          /> */}
        </div> 
        {menu
          .filter(
            (item) => item.role.includes(auth.user?.role)
          )
          .map((item) => (
            <p
              onClick={() => handleMenuChange(item)}
              className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                activeMenu === item.name ? "activeMenuItem" : "menuItem"
              }`}
            >
              {item.name}
            </p>
          ))}
        <Button
          variant="outlined"
          className="logoutButton"
          fullWidth
          sx={{ padding: ".7rem", borderRadius: "2rem", color: "white" }}
          onClick={handleLogout}
        >
          {"Logout"}
        </Button>
      </div>

      <CreateTaskForm
        open={openCreateTaskModel}
        handleClose={handleCloseCreateTaskModel}
      />
    </div>
  );
};

export default SideBar;
