import { useDispatch } from "react-redux";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { ImImage } from "react-icons/im";
import { logout } from "../modules/auth/auth.action";

export default function Sidebar({ user }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="fixed top-8 left-8 hidden md:flex bg-white flex-col w-64 h-[calc(100vh-300px)] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm z-20 overflow-hidden">
      {/* 1. Header/Profile Section (Centered) */}
      <div className="flex flex-col items-center p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="relative group mb-3">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary-500 p-1 transition-transform group-hover:scale-105"
            />
          ) : (
            <ImImage className="w-20 h-20 text-gray-300 dark:text-gray-700 border rounded-full" />
          )}
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
        <button className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold bg-slate-200 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all active:scale-95">
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
