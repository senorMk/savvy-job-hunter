import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
  return (
    <Card sx={{ maxHeight: 145 }}>
      <CardActionArea>
        <CardContent>
          <Link to={`/jobs/${job._id}`}>
            <Typography
              sx={{ fontSize: 18 }}
              align="left"
              variant="h2"
              gutterBottom
            >
              {job.position}
            </Typography>
          </Link>
          <Typography
            sx={{ fontSize: 18 }}
            align="left"
            variant="h2"
            gutterBottom
          >
            {job.companyName} - {job.location}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            align="left"
            variant="h2"
            color="text.secondary"
            gutterBottom
          >
            {job.jobDescriptionText.slice(0, 200)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobItem;
