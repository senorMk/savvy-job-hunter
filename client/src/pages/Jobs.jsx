import React, { useCallback, useState } from 'react';
import Axios from 'axios';
import config from '../config';
import { Box, Container, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import JobItem from '../components/JobItem';

const JobsPage = () => {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const fetchMore = useCallback(async () => {
    const getJobsList = async () => {
      let itemsPerPage = 10;

      let response = await Axios.get(
        `${config.SERVER}/api/v1/jobs?pageNo=${pageNo}&size=${itemsPerPage}`
      );

      return response.data.data;
    };

    if (isLoading) {
      return;
    }

    setLoading(true);

    try {
      const jobs = await getJobsList();

      setJobsList([...jobsList, ...jobs]);
      setPageNo(pageNo + 1);
    } finally {
      setLoading(false);
    }
  }, [jobsList, isLoading, pageNo]);

  const loader = (
    <Box
      key="loader"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: '15px' }}
    >
      <CircularProgress>Loading</CircularProgress>
    </Box>
  );

  return (
    <Container maxWidth="false">
      <InfiniteScroll loadMore={fetchMore} hasMore={true} loader={loader}>
        <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}>
          {jobsList.map((job) => (
            <Grid item xs={2} sm={4} md={4} lg={3} key={job._id}>
              <JobItem key={job._id} job={job} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default JobsPage;
