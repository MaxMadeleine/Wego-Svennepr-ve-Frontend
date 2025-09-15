import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";


//TODO SKAL LAVES

export const ProfilePage = () => {
  const location = useLocation(); 

  return (
    <section className="min-h-screen mt-40">
      <nav className="flex flex-wrap justify-center bg-white dark:bg-gray-900 shadow-md mb-8">
        <Link
          className={`py-3 px-6 text-center text-lg font-medium transition-colors duration-200 border-b-2 ${
            location.pathname === "/profil" || location.pathname === "/profil/min-profil" // til både/profile og /profile/
            ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
            : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
          }`}
          to="/profil/min-profil"
        >
          Min Profil
        </Link>
        <Link
          className={`py-3 px-6 text-center text-lg font-medium transition-colors duration-200 border-b-2 ${
            location.pathname === "/profil/mine-annoncer"
              ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
              : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
          }`}
          to="/profil/mine-annoncer"
        >
          Mine Annoncer
        </Link>
        <Link
          className={`py-3 px-6 text-center text-lg font-medium transition-colors duration-200 border-b-2 ${
            location.pathname === "/profil/mine-kommentarer"
              ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
              : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
          }`}
          to="/profil/mine-kommentarer"
        >
          Mine Kommentarer
        </Link>
        <Link
          className={`py-3 px-6 text-center text-lg font-medium transition-colors duration-200 border-b-2 ${
            location.pathname === "/profil/mine-anmeldelser"
              ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400" 
              : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
          }`}
          to="/profil/mine-anmeldelser"
        >
          Mine Anmeldelser
        </Link>
      </nav>
      <Outlet />
    </section>
  );
}; 