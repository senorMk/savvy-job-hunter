import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import toast from "react-hot-toast";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    toast.error(error);
    toast.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container component="main" maxWidth="xm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Something went wrong...
            </Typography>
            <SentimentDissatisfiedOutlinedIcon
              sx={{ fontSize: 80, marginTop: "20px" }}
            />
            <Link to="/">
              <Button variant="contained" sx={{ marginTop: "20px" }}>
                Go Home
              </Button>
            </Link>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
