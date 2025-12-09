import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Wallet2
} from "lucide-react";

const menuItems = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/" },
  { text: "Doctors", icon: Users, path: "/doctors" },
  { text: "Visits", icon: Calendar, path: "/visits" },
  { text: "Payments", icon: Wallet2, path: "/payments" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-60 border-r bg-white fixed left-0 top-0 flex flex-col">
      <div className="h-[64px] flex items-center px-6 border-b">
        <h1 className="text-lg font-semibold tracking-tight">Keshav Pharma</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.text}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              {item.text}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
