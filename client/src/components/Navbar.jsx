import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../modules/auth/auth.action";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="relative md:hidden bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name || "Unknown"}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-48 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-semibold">{user?.name || "Unknown"}</p>
                    <p className="text-xs">{user?.email || "No email"}</p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
