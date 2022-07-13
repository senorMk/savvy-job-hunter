import { Box, Container } from '@mui/material';
import Header from './Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="false">
      <Header />
      <Box sx={{ marginTop: '50px', marginBottom: '50px' }}>{children}</Box>
    </Container>
  );
};

export default Layout;
