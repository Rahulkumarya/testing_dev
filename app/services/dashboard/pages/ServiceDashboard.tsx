"use client";

import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaBars,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { SiGreatlearning } from "react-icons/si";
import { GiGrowth } from "react-icons/gi";
import { BsCashStack } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Sidebar from "./../layout/Sidebar";
import dynamic from "next/dynamic";
import DashboardLayout from "./../layout/DashboardLayout";

// Dynamically import NotificationIcon to disable SSR (avoids hydration mismatch)
const NotificationIcon = dynamic(
  () => import("../../../context/Notification").then((mod) => mod.NotificationIcon),
  { ssr: false }
);
// Page Components
import DashboardKpi from "./component/DashboardKpi";
// import Notifications from "./component/Notifications";
import PaymentDetails from "./component/PaymentDetails";
import AddServices from "./component/AddServices"
import AllServices from "./component/AllServices";

  const doctorMenu = [
    { name: "DashboardKpi", icon: <FaTachometerAlt />, label: "Dashboard" },
    { name: "Availability", icon: <FaToggleOn />, label: "Availability" },
    // { name: "Notifications", icon: <FaBell />, label: "Notifications icons " },
    { name: "Earning", icon: <SiGreatlearning />, label: "Earning" },
    { name: "Growth", icon: <GiGrowth />, label: "Growth" },
    { name: "Lead", icon: <MdLeaderboard />, label: "Lead Manager" },
    { name: "Payment", icon: <BsCashStack />, label: "Payment Details" },
    { name: "AddService", icon: <FaPlus />, label: "Add Service" },
    { name: "UpdateService", icon: <FaEdit />, label: "Update Service" },
    { name: "DeleteService", icon: <FaTrash />, label: "Delete Service" },
    { name: "Suggestion", icon: <FaCog />, label: "Suggestion" },
    { name: "Settings", icon: <FaCog />, label: "Settings" },
    { name: "Logout", icon: <FaSignOutAlt />, label: "Logout" },
  ];



  const hospitalMenu = [
    { name: "DashboardKpi", icon: <FaTachometerAlt />, label: "Dashboard" },
    { name: "Notifications", icon: <FaBell />, label: "Notifications" },
    { name: "Payment", icon: <BsCashStack />, label: "Payment Details" },
    { name: "AllService", icon: <FaPlus />, label: "Add Service" },
    { name: "Suggestion", icon: <FaCog />, label: "Suggestion" },
    { name: "Settings", icon: <FaCog />, label: "Settings" },
    { name: "Logout", icon: <FaSignOutAlt />, label: "Logout" },
  ];

const radiologyMenu = [
  { name: "DashboardKpi", label: "Dashboard KPI" },
  { name: "Notifications", label: "Notifications" },
  { name: "Payment", label: "Payment Details" },
];

const ServiceDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activePage, setActivePage] = useState("DashboardKpi");

  const getMenuByRole = (role: string) => {
    switch (role) {
      case "doctor":
        return doctorMenu;
      case "radiology":
        return radiologyMenu;
        case "hospital":
            return hospitalMenu;
      default:
        return [];
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "DashboardKpi":
        return <DashboardKpi />;
      case "Notifications":
        return <NotificationIcon/>;
      case "Payment":
        return <PaymentDetails />;
    case "AddService":
        return <AddServices/>
    case "AllService":
      return <AllServices/>
      default:
        return <div>Page Not Found</div>;
    }
  };

  const menu = getMenuByRole(user.role);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          menu={menu}
          activePage={activePage}
          setActivePage={setActivePage}
          userName={user.name}
        />
      }
    >
      {renderPage()}
    </DashboardLayout>
  );
};

export default ServiceDashboard;
