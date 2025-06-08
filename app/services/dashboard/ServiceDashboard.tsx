"use client";
import { FC, useState } from "react";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import Notification from "../../context/Notification"
type Props = {
  
};
export const ServiceDashboard: FC<Props> = ({}) => {
  const [activePage, setActivePage] = useState("DashboardKpi");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarMini, setSidebarMini] = useState(false);
const user=useSelector((state:store)=>state.auth.user)
console.log(`userDatais Dashboard and role is ${user.role} and name is ${user.name}`)
  const menu = [
    { name: "DashboardKpi", icon: <FaTachometerAlt />, label: "Dashboard" },
    { name: "Availability", icon: <FaToggleOn />, label: "Availability" },
    { name: <Notification/>, icon: <FaBell />, label: "Notifications" },
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

  const getWelcomeMessage = () => {
    switch (activePage) {
      case "DashboardKpi":
        return "Welcome to Hospital Dashboard";
      case "Availability":
        return "Welcome Doctor, manage your availability.";
      case "AddService":
        return "Welcome Admin, add new services here.";
      case "UpdateService":
        return "Update your services as needed.";
      case "DeleteService":
        return "Delete services with caution.";
      case "Lead":
        return "View and manage your leads.";
      case "Payment":
        return "Track and manage payment details.";
      case "Earning":
        return "Your earnings overview.";
      case "Growth":
        return "Analyze your growth metrics.";
      case "Notifications":
        return "All your notifications.";
      case "Settings":
        return "Manage your preferences.";
      case "Suggestion":
        return "Suggestions to improve services.";
      case "Logout":
        return "Goodbye! Logging you out.";
      default:
        return "Welcome to Hospital Panel";
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row ">
      {/* Mobile Top Nav */}
      <header className="sm:hidden flex items-center justify-between bg-blue-800 text-white p-4">
        <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold">Hospital Panel</h1>
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-blue-800 text-white p-2 sm:p-4 flex flex-col fixed sm:static z-40 max-h-screen transition-all duration-300 ease-in-out
        ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0
        ${sidebarMini ? "w-20" : "w-64"}`}
      >
        {/* Toggle mini sidebar */}
        <div className="flex items-center justify-between mb-4">
          {!sidebarMini && (
            <h1 className="text-lg font-bold whitespace-nowrap text-center">UronHealth Welcome to {user.name}</h1>
          )}
          <button
            onClick={() => setSidebarMini(!sidebarMini)}
            className="text-white p-2 hover:bg-blue-700 rounded"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActivePage(item.name);
                setMobileSidebarOpen(false);
              }}
              className={`flex items-center gap-2 justify-center sm:justify-start w-full p-2 rounded hover:bg-blue-700 transition-all duration-200 ${
                activePage === item.name ? "bg-blue-700" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!sidebarMini && (
                <span className="hidden sm:inline">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 sm:hidden z-30"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-y-auto h-screen sm:p-6">
        <div className="text-2xl font-semibold mb-6 text-blue-800">
          {getWelcomeMessage()}
        </div>

        {activePage === "DashboardKpi" && <UpdateService />}
        {activePage === "Availability" && <DeleteService />}
        {activePage === "AddService" && <UpdateService />}
        {activePage === "UpdateService" && <UpdateService />}
        {activePage === "DeleteService" && <DeleteService />}
        {activePage === "Growth" && <UpdateService />}
        {activePage === "Earning" && <UpdateService />}
        {activePage === "Payment" && <UpdateService />}
        {activePage === "Lead" && <UpdateService />}
        {activePage === "Notifications" && <Notifications />}
        {activePage === "Settings" && <Settings />}
        {activePage === "Suggestion" && <UpdateService />}
        {activePage === "Logout" && <Logout />}
      </main>
    </div>
  );
}

// Placeholder Components
function UpdateService() {
  return <div className="text-black">Update Service Panel</div>;
}
function DeleteService() {
  return <div className="text-black">Delete Service Panel</div>;
}
function Notifications() {
  return <div className="text-black">Notification Center</div>;
}
function Settings() {
  return <div className="text-black">Settings Panel</div>;
}
function Logout() {
  return <div className="text-black">You have been logged out.</div>;
}

export default ServiceDashboard