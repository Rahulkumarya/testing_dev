"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Gym {
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

interface GymServiceCardProps {
  gym: Gym;
}

const GymServiceCard: React.FC<GymServiceCardProps> = ({ gym }) => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          {gym.avatar ? (
            <Image
              src={gym.avatar}
              alt="Gym Service"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
          )}
        </div>

        <Typography variant="h6" component="h2" className="text-center mb-2">
          Gym Service
        </Typography>

        <div className="space-y-2">
          <Typography variant="body2" color="text.secondary">
            Registration: {gym.registrationNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {gym.experience} years
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {gym.location.city}, {gym.location.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {gym.location.address}
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

export default GymServiceCard; 