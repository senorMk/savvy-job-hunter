import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const Header = () => {
  return (
    <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <WorkIcon sx={{ color: '#a66e58', fontSize: '40px' }} />
        <Typography variant="h1" sx={{ fontSize: 40, textAlign: 'center' }}>
          Savvy Job Hunter
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: 20, textAlign: 'center', marginTop: '10px' }}
        >
          Powered by lots of real data...
        </Typography>
      </Box>
    </Link>
  );
};

export default Header;
