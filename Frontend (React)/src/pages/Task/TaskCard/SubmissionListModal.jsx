import { Box, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionsByTaskId } from "../../../ReduxToolkit/SubmissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmissionListModal = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const { submission } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchSubmissionsByTaskId({ taskId }));
  }, [taskId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
          <div className="space-y-2">
            {submission.submissions.length > 0 ? (
              submission.submissions.map((item) => <SubmissionCard submission={item}/>)
            ) : (
              <div className="text-center">No Submission Found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmissionListModal;
