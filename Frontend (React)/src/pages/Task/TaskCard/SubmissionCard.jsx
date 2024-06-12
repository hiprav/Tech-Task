import { Button, IconButton } from "@mui/material";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { acceptDeclineSubmission } from "../../../ReduxToolkit/SubmissionSlice";

const SubmissionCard = ({ submission }) => {
  const dispatch = useDispatch();
  const handleAcceptDecline = (status) => {
    dispatch(acceptDeclineSubmission({id:submission.id,status}));
  };
  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>Git hub :</span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a target="_blank" href={submission.githubLink}>
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time : </p>
          <p className="text-gray-400">{submission.submissionTime}</p>
        </div>
      </div>
      <div>
        {(!submission.status || submission?.status==="PENDING") ? (
          <div className="flex gap-5">
            <div className="text-green-500">
              <IconButton
                onClick={() => handleAcceptDecline("ACCEPTED")}
                color="success"
              >
                <CheckIcon />
              </IconButton>
            </div>
            <div className="text-red-500">
              <IconButton
                onClick={() => handleAcceptDecline("DECLINED")}
                color="error"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button size="small" 
            variant="outlined" 
            color={submission.status==="ACCEPTED" ? "success" : "error"}>
            {submission.status}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
