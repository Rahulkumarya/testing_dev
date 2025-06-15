"use client";

import React from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { useGetAllRadiologyServicesQuery } from "@/redux/features/services/radiology/serviceApi";
import RadiologyServiceCard from "../component/RadiologyServiceCard";

interface Service {
  id: string;
  registrationNumber: string;
  experience: string;
  gstNumber: string;
  licenceNumber: string;
  location: {
    coordinates: [string, string];
    city: string;
    state: string;
    pincode: string;
    address: string;
    landmark: string;
  };
  accountDetails: {
    HolderName: string;
    Ifsc: string;
    accountNumber: string;
    bankName: string;
  };
  avatar?: string;
}

const AllRadiologyPage = () => {
  const { data, isLoading, error } = useGetAllRadiologyServicesQuery();
  const allServices = data || [];

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
          Error loading radiology services. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Available Radiology Services
      </Typography>
      <Grid container spacing={3}>
        {allServices?.map((service: Service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <RadiologyServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllRadiologyPage;
