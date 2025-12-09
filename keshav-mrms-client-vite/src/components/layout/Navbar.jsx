import { Bell, Menu, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-[64px] w-full bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
        <span className="text-base font-semibold">
          Medical Representative System
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <User className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}
