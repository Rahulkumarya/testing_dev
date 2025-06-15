"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Diagnosis {
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

interface DiagnosisServiceCardProps {
  diagnosis: Diagnosis;
}

const DiagnosisServiceCard: React.FC<DiagnosisServiceCardProps> = ({ diagnosis }) => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          {diagnosis.avatar ? (
            <Image
              src={diagnosis.avatar}
              alt="Diagnosis Service"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          )}
        </div>

        <Typography variant="h6" component="h2" className="text-center mb-2">
          Diagnosis Service
        </Typography>

        <div className="space-y-2">
          <Typography variant="body2" color="text.secondary">
            Registration: {diagnosis.registrationNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {diagnosis.experience} years
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {diagnosis.location.city}, {diagnosis.location.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {diagnosis.location.address}
          </Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={() => {
            // Handle booking or details view
          }}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiagnosisServiceCard; 