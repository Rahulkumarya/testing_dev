"use client";

import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { useGetAllDiagnosisServicesQuery } from "@/redux/features/services/diagnosis/serviceApi";
import DiagnosisServiceCard from "../component/DiagnosisServiceCard";

const AllDiagnosisPage = () => {
  const { data: diagnoses, isLoading, error } = useGetAllDiagnosisServicesQuery();

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
          Error loading diagnosis services. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Available Diagnosis Services
      </Typography>
      <Grid container spacing={3}>
        {diagnoses?.map((diagnosis) => (
          <Grid item xs={12} sm={6} md={4} key={diagnosis.id}>
            <DiagnosisServiceCard diagnosis={diagnosis} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllDiagnosisPage;
