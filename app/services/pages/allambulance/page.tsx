"use client";

import React from "react";
import { useGetAllAmbulanceQuery } from "@/redux/features/services/ambulance/ambulanceApi";
import { Container, Grid, Typography } from "@mui/material";
import AmbulanceServiceCard from "../component/AmbulanceServiceCard";

const AllAmbulancePage = () => {
  const { data: ambulances, isLoading, error } = useGetAllAmbulanceQuery();

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Error loading ambulances</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
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
