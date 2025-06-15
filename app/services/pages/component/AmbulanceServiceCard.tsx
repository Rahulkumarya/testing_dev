"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Ambulance {
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

interface AmbulanceServiceCardProps {
  ambulance: Ambulance;
}

const AmbulanceServiceCard: React.FC<AmbulanceServiceCardProps> = ({ ambulance }) => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          {ambulance.avatar ? (
            <Image
              src={ambulance.avatar}
              alt="Ambulance Service"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚑</span>
            </div>
          )}
        </div>

        <Typography variant="h6" component="h2" className="text-center mb-2">
          Ambulance Service
        </Typography>

        <div className="space-y-2">
          <Typography variant="body2" color="text.secondary">
            Registration: {ambulance.registrationNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {ambulance.experience} years
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {ambulance.location.city}, {ambulance.location.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {ambulance.location.address}
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

export default AmbulanceServiceCard; 