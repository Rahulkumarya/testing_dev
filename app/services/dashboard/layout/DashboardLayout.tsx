"use client"
const DashboardLayout = ({ sidebar, children }: any) => {
  return (
    <div className="flex h-screen overflow-hidden container mx-auto">
      <div className="flex-shrink-0">{sidebar}</div>
      <main className="flex-1 overflow-auto bg-gray-100 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
