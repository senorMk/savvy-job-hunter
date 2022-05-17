import React, { useState, useEffect } from "react";
import "./JobInfo.css";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import config from "../config";

const getJobsDetail = async (jobId) => {
  let response = await Axios.get(`${config.SERVER}/api/v1/jobs/get/${jobId}`);

  return response.data;
};

const JobInfo = () => {
  const [selectedJob, setJob] = useState({});
  const { jobId } = useParams();

  useEffect(() => {
    if (jobId) {
      getJobsDetail(jobId).then((job) => {
        setJob(job);
      });
    }
  }, [jobId]);

  return (
    <div className="info">
      <Paper className="body">
        <Link to={`/jobs/${selectedJob._id}`}>
          <Typography
            sx={{ fontSize: 18 }}
            align="left"
            variant="h2"
            gutterBottom
          >
            {selectedJob.position}
          </Typography>
        </Link>
        <Typography
          sx={{ fontSize: 18 }}
          align="left"
          variant="h2"
          gutterBottom
        >
          {selectedJob.companyName} - {selectedJob.location}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          align="left"
          variant="h2"
          color="text.secondary"
          gutterBottom
        >
          <div
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: selectedJob.jobDescriptionHtml }}
          ></div>
        </Typography>
      </Paper>
    </div>
  );
};

export default JobInfo;
