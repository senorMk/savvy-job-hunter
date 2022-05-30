import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "../config";
import { Box, Container, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import JobItem from "../components/JobItem";
import JobInfo from "../components/JobInfo";

const JobsPage = () => {
  const [jobsList, setJobsList] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getJobsList = async () => {
      let page = 1;
      let itemsPerPage = 10;
      setLoading(true);
      let response = {};
      try {
        response = await Axios.get(
          `${config.SERVER}/api/v1/jobs/all?pageNo=${page}&size=${itemsPerPage}`
        );
      } catch (error) {
        if (error?.response?.data) console.log(error?.response?.data);
      }
      setLoading(false);
      return response.data.message;
    };

    getJobsList().then((items) => {
      if (items) {
        setJobsList(items);
      }
    });
  }, []);

  const showJobs = () => {
    if (jobsList?.length > 0) {
      return (
        <Stack spacing={2}>
          {jobsList.map((job) => (
            <JobItem key={job._id} job={job} sx={{ padding: "10px" }} />
          ))}
        </Stack>
      );
    } else if (isLoading) {
      return (
        <Box alignItems="center">
          <CircularProgress />
        </Box>
      );
    }
  };

  return (
    <Container sx={{ marginTop: "20px" }} maxWidth="false">
      <Stack direction="row" spacing={2}>
        <Stack direction="column" sx={{ minWidth: 500, maxWidth: 500 }}>
          {showJobs()}
        </Stack>
        <JobInfo sx={{ minHeight: 1000 }} />
      </Stack>
    </Container>
  );
};

export default JobsPage;
