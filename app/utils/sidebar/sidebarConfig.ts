// utils/sidebarConfig.ts

import {
  FaTachometerAlt,
  FaBell,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStethoscope,
  FaAmbulance,
  FaXRay,
  FaHotel,
} from "react-icons/fa";

export type SidebarItem = {
  name: string;
  icon: React.ElementType;
  label: string;
};

export type SidebarConfig = {
  [role: string]: SidebarItem[];
};

export const sidebarConfig: SidebarConfig = {
  doctor: [
    { name: "KPI", icon: FaTachometerAlt, label: "Dashboard" },
    { name: "Notifications", icon: FaBell, label: "Notifications" },
    { name: "Availability", icon: FaStethoscope, label: "Availability" },
  ],
  ambulance: [
    { name: "KPI", icon: FaTachometerAlt, label: "Dashboard" },
    { name: "Notifications", icon: FaBell, label: "Notifications" },
    { name: "AddService", icon: FaPlus, label: "Add Ambulance" },
    { name: "UpdateService", icon: FaEdit, label: "Update Ambulance" },
  ],
  radiology: [
    { name: "KPI", icon: FaTachometerAlt, label: "Dashboard" },
    { name: "AddService", icon: FaPlus, label: "Add Scan Service" },
    { name: "UpdateService", icon: FaEdit, label: "Update Scan" },
    { name: "DeleteService", icon: FaTrash, label: "Delete Scan" },
  ],
  resort: [
    { name: "KPI", icon: FaTachometerAlt, label: "Dashboard" },
    { name: "AddService", icon: FaPlus, label: "Add Resort" },
    { name: "UpdateService", icon: FaEdit, label: "Update Resort" },
    { name: "AllServices", icon: FaStethoscope, label: "All Resorts" },
  ],
};
