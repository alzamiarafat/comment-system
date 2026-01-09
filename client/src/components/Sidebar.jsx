import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { ImImage } from "react-icons/im";
import { logout } from "../modules/auth/auth.action";

export default function Sidebar({ user }) {
  const dispatch = useDispatch();
  const borderColor = useMemo(() => randomBorderColor(), []);
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="sticky top-8 left-8 hidden md:flex bg-white flex-col w-64 h-[calc(100vh-300px)] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm z-20 overflow-hidden">
      {/* 1. Header/Profile Section (Centered) */}
      <div className="flex flex-col items-center p-6 border-b bg-gradient-to-r from-cyan-50 to-red-50 border-gray-100 dark:border-gray-800">
        <div className="relative group mb-3">
          <img
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "data:image/png;base64,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"
            }
            alt={user?.name}
            className={`w-24 h-24 rounded-full object-cover border-2 ${borderColor} p-1 transition-transform group-hover:scale-105`}
          />

          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center leading-tight">
          {user?.name || "Guest User"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center truncate w-full">
          {user?.email || "Sign in to sync"}
        </p>
      </div>

      {/* 2. Navigation/Action Area (Grows to fill space) */}
      <nav className="flex-1 p-4 space-y-2">
        <button className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold border border-gray-400 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-3xl transition-all active:scale-95">
          {/* <FaRegUser className="w-5 h-5 mr-2" /> */}
          View Profile
        </button>
      </nav>

      {/* 3. Bottom Action Area (Logout) */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all active:scale-95"
        >
          <LiaSignOutAltSolid className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
const randomBorderColor = () => {
  const colors = [
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-purple-500",
    "border-pink-500",
    "border-yellow-500",
    "border-indigo-500",
    "border-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
