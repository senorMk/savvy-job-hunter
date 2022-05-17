import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div align="center">
      <h1 className="display-4">
        <span className="text-danger">404 - </span> Page Not Found
      </h1>
      <h3 className="lead">Sorry, that page does not exist</h3>
      <Link to="/">
        <h4>Home</h4>
      </Link>
    </div>
  );
};

export default NotFound;
