"use client";

import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { useGetAllAmbulanceQuery } from "@/redux/features/services/ambulance/ambulanceApi";
import AmbulanceServiceCard from "../component/AmbulanceServiceCard";

const AllAmbulancePage = () => {
  const { data: ambulances, isLoading, error } = useGetAllAmbulanceQuery();

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" className="text-center mt-8">
          Error loading ambulance services. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Available Ambulance Services
      </Typography>
      <Grid container spacing={3}>
        {ambulances?.map((ambulance) => (
          <Grid item xs={12} sm={6} md={4} key={ambulance.id}>
            <AmbulanceServiceCard ambulance={ambulance} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllAmbulancePage;
