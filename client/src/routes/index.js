import React from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import JobsPage from "../pages/JobsPage";
import NotFound from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JobsPage />} />
      <Route path="/jobs/:jobId" element={<JobsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
