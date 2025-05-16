"use client"
import { ReactNode } from "react";
import Navbar from "../components/Layout/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
     <Navbar/>
      <main>{children}</main>
    </div>
  );
}