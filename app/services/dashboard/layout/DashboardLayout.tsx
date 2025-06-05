"use client"
import Footer from "../../../service/home/Footer"
const DashboardLayout = ({ sidebar, children }: any) => {
  return (
    <div
      className="flex  overflow-hidden container mx-auto mt-20"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex-shrink-0">{sidebar}</div>
      <main className="flex-1 custom-scrollbar  overflow-auto bg-blue-10 p-4 ">
        {children}
      </main>


    </div>
  );
};

export default DashboardLayout;

// "use client"

// const DashboardLayout = ({ sidebar, children }: any) => {
//   return (
//     <div className="flex h-screen overflow-hidden container mx-auto mt-20">
//       {/* Sidebar fixed width */}
//       <div className="flex-shrink-0">{sidebar}</div>

//       {/* Scrollable main content area */}
//       <main
//         className="flex-1 overflow-y-auto bg-blue-50 p-4"
//         style={{ height: 'calc(100vh - 80px)' }} // Adjust 80px to your header height
//       >
//         {children}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
