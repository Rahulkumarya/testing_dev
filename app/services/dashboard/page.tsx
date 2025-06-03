"use client";

import { useLoadUserQuery } from "../../../redux/features/api/apiSlice"; // update with actual path
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./../../component/Loader/Loader";
import ServiceDashboard from "./pages/ServiceDashboard";

const ProtectedServiceDashboardPage = () => {
  const { data: user, isLoading } = useLoadUserQuery({});
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/services/auth/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loader />;

  return <ServiceDashboard />;
};

export default ProtectedServiceDashboardPage;
