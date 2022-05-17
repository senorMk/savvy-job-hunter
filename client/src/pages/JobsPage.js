import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "../config";
import { Box, Grid } from "@mui/material";
import JobItem from "../components/JobItem";
import JobInfo from "../components/JobInfo";
import "./JobPage.css";

const JobsPage = () => {
  const [jobsList, setJobsList] = useState({});

  useEffect(() => {
    let mounted = true;

    const getJobsList = async () => {
      let page = 1;
      let itemsPerPage = 10;
      let response = await Axios.get(
        `${config.SERVER}/api/v1/jobs/all?pageNo=${page}&size=${itemsPerPage}`
      );

      return response.data.message;
    };

    getJobsList().then((items) => {
      if (mounted) {
        setJobsList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="main">
      <div className="sidebar">
        {jobsList.length > 0 ? (
          <div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} columns={1}>
                {jobsList.map((job) => {
                  return (
                    <Grid item xs={1} key={job._id}>
                      <JobItem job={job} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </div>
        ) : (
          <div>
            <h5>No Jobs Found</h5>
          </div>
        )}
      </div>

      <JobInfo />
    </div>
  );
};

export default JobsPage;
