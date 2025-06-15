"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAllServicesQuery } from "@/redux/features/patients/patientApi";
import FeaturedCarousel from "./component/FeaturedCarousel"; // ✅ Reusable Carousel for each serviceType
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

interface Category {
  img: string;
  title: string;
}

interface Location {
  city?: string;
  state?: string;
}

interface Service {
  serviceName: string;
  serviceType: string;
  location?: {
    city?: string;
    state?: string;
  };
  name?: string;
}

interface ServiceResponse {
  services: Service[];
}

// Optional dummy categories to display in homepage (can be from backend too)
const categories: Category[] = [
  { img: "/icons/doctor.png", title: "Doctor" },
  { img: "/icons/ambulance.png", title: "Ambulance" },
  { img: "/icons/lab.png", title: "Diagnostics" },
  { img: "/icons/resort.png", title: "Resorts" },
  { img: "/icons/pharmacy.png", title: "Pharmacy" },
];

const Hero = () => {
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch all services from a single backend API
  const { data } = useAllServicesQuery();
  const allServices = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data as ServiceResponse).services || [];
  }, [data]);

  console.log("All Services:", allServices);
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Close suggestion dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Initially show all services
  useEffect(() => {
    if (allServices.length > 0) {
      setFilteredServices(allServices);
    }
  }, [allServices]);

  // ✅ Debounced search with suggestions
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim().toLowerCase();
      if (trimmed) {
        const matched = allServices.filter(
          (s) =>
            s.name?.toLowerCase().includes(trimmed) ||
            s.location?.city?.toLowerCase().includes(trimmed) ||
            s.location?.state?.toLowerCase().includes(trimmed)
        );
        setFilteredServices(matched);
        setSuggestions(matched.slice(0, 5));
        setIsSearching(true);
      } else {
        setFilteredServices(allServices);
        setSuggestions([]);
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, allServices]);

  // ✅ Handle suggestion click and update list
  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    const matched = allServices.filter((s) =>
      s.name?.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredServices(matched);
    setSuggestions([]); // close dropdown
  };

  // ✅ Group filtered services by serviceType for <FeaturedCarousel />
  const groupByType = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const type = service.name?.toLowerCase() || "other";
      if (!acc[type]) acc[type] = [];
      acc[type].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, [filteredServices]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero Background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Find the Best Healthcare Services
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            fontSize: { xs: "1.1rem", md: "1.3rem" },
          }}
        >
          Connect with top-rated hospitals, clinics, and healthcare providers in
          your area
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            href="/services"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Find Services
          </Button>
          <Button
            component={Link}
            href="/about"
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
