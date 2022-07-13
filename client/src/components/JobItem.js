import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Typography,
} from '@mui/material';

const JobItem = ({ job }) => {
  return (
    <Card variant="outlined" sx={{ maxHeight: 200 }}>
      <a
        href={`/job/${job._id}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <CardActionArea>
          <CardContent sx={{ p: '10px' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{ fontSize: 18, fontWeight: 'bold' }}
                align="left"
                variant="h2"
                gutterBottom
              >
                {job.position.length > 30
                  ? job.position.slice(0, 30) + '...'
                  : job.position}
              </Typography>
              <Typography
                sx={{ fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}
                align="right"
                variant="h2"
                gutterBottom
              >
                {moment().to(job.dateOpen)}
              </Typography>
            </Stack>
            <Typography
              sx={{ fontSize: 18 }}
              align="left"
              variant="h2"
              gutterBottom
            >
              {job.companyName}
            </Typography>
            <Typography
              sx={{ fontSize: 18 }}
              align="left"
              variant="h2"
              gutterBottom
            >
              {job.location}
            </Typography>
            {/* <Typography sx={{ fontSize: 14 }} align="left" variant="h2">
              {job.jobDescriptionText.slice(0, 100) + '...'}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </a>
    </Card>
  );
};

export default JobItem;
