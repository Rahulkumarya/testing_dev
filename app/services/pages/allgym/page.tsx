"use client";

import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { useGetAllGymServicesQuery } from "@/redux/features/services/gym/serviceApi";
import GymServiceCard from "../component/GymServiceCard";

const AllGymPage = () => {
  const { data: gyms, isLoading, error } = useGetAllGymServicesQuery();

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
          Error loading gym services. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Available Gym Services
      </Typography>
      <Grid container spacing={3}>
        {gyms?.map((gym) => (
          <Grid item xs={12} sm={6} md={4} key={gym.id}>
            <GymServiceCard gym={gym} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllGymPage;
