"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const WelcomeButton = styled(Button)({
  backgroundColor: "#ffffff",
  color: "#1e88e5",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export default function About() {
  return (
    <Container maxWidth="lg" className="min-h-screen  items justify-center">
      <Box
        textAlign="center"
        p={4}
        bgcolor="rgba(255, 255, 255, 0.1)"
        borderRadius={4}
        boxShadow={3}
      >
        <Typography variant="h2" gutterBottom color="white">
          Welcome to Workout Log
        </Typography>
        <Typography variant="h6" paragraph color="white ">
        Unleash your potential and get fit with us!
        </Typography>
        <WelcomeButton href="/" variant="contained" size="large">
          Get Started
        </WelcomeButton>
      </Box>
    </Container>
  );
}
