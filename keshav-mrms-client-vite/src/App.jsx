import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Visits from "./pages/Visits";
import Payments from "./pages/Payments";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout */}
      <div className="flex flex-col flex-1 ml-60">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
