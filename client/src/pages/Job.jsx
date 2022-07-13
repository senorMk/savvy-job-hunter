import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Axios from 'axios';
import config from '../config';

const Job = () => {
  const [selectedJob, setJob] = useState({});
  const { jobId } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getJobsDetail = async (jobId) => {
      setLoading(true);

      let response = await Axios.get(`${config.SERVER}/api/v1/jobs/${jobId}`);

      setLoading(false);

      return response.data.data;
    };

    if (jobId) {
      getJobsDetail(jobId).then((job) => {
        setJob(job);
      });
    }
  }, [jobId]);

  return jobId ? (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <a
          href={`/list/?position=${selectedJob.position}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 'bold' }}
            align="left"
            variant="h2"
            gutterBottom
          >
            {selectedJob.position}
          </Typography>
        </a>
        <a
          href={`${selectedJob.link}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <Typography
            sx={{ fontSize: 22, fontStyle: 'italic' }}
            align="left"
            variant="h2"
            gutterBottom
          >
            {selectedJob.link ? new URL(selectedJob.link).hostname : ''}
          </Typography>
        </a>
      </Stack>
      <Typography
        sx={{ fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}
        align="right"
        variant="h2"
        gutterBottom
      >
        Posted: {moment().to(selectedJob.dateOpen)}
      </Typography>
      <a
        href={`/list/?companyName=${selectedJob.companyName}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <Typography
          sx={{ fontSize: 18, fontWeight: 'bold' }}
          align="left"
          variant="h2"
          gutterBottom
        >
          {selectedJob.companyName}
        </Typography>
      </a>
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
    </Container>
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

export default Job;
