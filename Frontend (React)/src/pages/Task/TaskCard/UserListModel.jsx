import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../ReduxToolkit/AuthSlice";
import { assignedTaskToUser } from "../../../ReduxToolkit/TaskSlice";

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

const users = [1, 1, 1, 1, 1];

export const UserListModel = ({ open, handleClose,taskId }) => {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
  },[])

  const handleAssignTask=(userId)=>{
    dispatch(assignedTaskToUser({userId,taskId}))

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {auth.users.map((item, i) => (
                <>
                  <div className="flex items-center justify-between w-full" key={i}>
                <div>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="https://cdn.leonardo.ai/users/f6c5ad77-7098-4040-bf46-6f9b62556804/generations/c60489f0-13ac-454d-8e17-2280222f205c/variations/alchemyrefiner_alchemymagic_1_c60489f0-13ac-454d-8e17-2280222f205c_0.jpg?w=512"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.fullName}
                      secondary={`@${item.fullName.toLowerCase().split(" ").join("_")}`}
                    />
                  </ListItem>
                </div>
                <div>
                  <Button onClick={()=>handleAssignTask(item.id)} className="customeButton" variant="contained" size="small">select</Button>
                </div>
              </div>
              {i!==users.length-1 && <Divider variant="inset"  />}
                </>
            
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
