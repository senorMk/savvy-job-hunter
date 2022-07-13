import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Pages
import Job from '../pages/Job';
import Jobs from '../pages/Jobs';
import List from '../pages/List';
import NotFound from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Jobs />} />
      <Route path="/job/:jobId" element={<Job />} />
      <Route path="/list" element={<List />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
