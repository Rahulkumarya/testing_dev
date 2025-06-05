"use client";

import React, { useEffect, useState } from "react";
import { BarChart2, DollarSign } from "lucide-react";
import axios from "axios";

const DoctorServiceStats = () => {
  const [stats, setStats] = useState<{
    totalServices: number;
    averageFee: number;
  }>({
    totalServices: 0,
    averageFee: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/doctor-service/stats");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading stats...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Service Overview</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Total Services Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wide">
              Total Services
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {stats.totalServices}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <BarChart2 className="w-6 h-6" />
          </div>
        </div>

        {/* Average Fee Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-sm text-gray-500 uppercase tracking-wide">
              Average Fee
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-1">
              ₹{stats.averageFee.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorServiceStats;
