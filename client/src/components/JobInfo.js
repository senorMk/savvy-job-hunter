import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Axios from 'axios';
import config from '../config';

const JobInfo = () => {
  const [selectedJob, setJob] = useState({});
  const { jobId } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getJobsDetail = async (jobId) => {
      setLoading(true);

      let response = await Axios.get(
        `${config.SERVER}/api/v1/jobs/get/${jobId}`
      );

      setLoading(false);

      return response.data;
    };

    if (jobId) {
      getJobsDetail(jobId).then((job) => {
        setJob(job);
      });
    }
  }, [jobId]);

  return jobId ? (
    <Card
      variant="outlined"
      sx={{ padding: '10px', minWidth: '60%', maxWidth: '60%' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ fontSize: 24, fontWeight: 'bold' }}
          align="left"
          variant="h2"
          gutterBottom
        >
          {selectedJob.position}
        </Typography>
        <Typography
          sx={{ fontSize: 22, fontStyle: 'italic' }}
          align="left"
          variant="h2"
          gutterBottom
        >
          {selectedJob.link ? new URL(selectedJob.link).hostname : ''}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 18 }} align="left" variant="h2" gutterBottom>
        {selectedJob.companyName}
      </Typography>
      <Typography sx={{ fontSize: 18 }} align="left" variant="h2" gutterBottom>
        {selectedJob.location}
      </Typography>
      <Typography
        sx={{ fontSize: 16 }}
        align="left"
        variant="body2"
        gutterBottom
        dangerouslySetInnerHTML={{ __html: selectedJob.jobDescriptionHtml }}
      ></Typography>
    </Card>
  ) : isLoading ? (
    <Box alignItems="center">
      <CircularProgress />
    </Box>
  ) : (
    <Container align="center">
      <ArrowBackIcon sx={{ fontSize: '64px' }} />
      <Typography variant="h2" sx={{ fontSize: '24px', marginTop: '10px' }}>
        Please Select a job
      </Typography>
    </Container>
  );
};

export default JobInfo;
