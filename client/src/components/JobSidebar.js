import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import JobItem from "./JobItem";
import "./JobSidebar.css";

const JobSidebar = ({ jobsList }) => {
  return (
    <div className="sidebar">
      {jobsList.length > 0 ? (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={5} columns={1}>
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
  );
};

export default JobSidebar;
