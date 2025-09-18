import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const ProfilePage = () => {
  const location = useLocation();

  const links = [
    { to: "/profil/min-profil", label: "Min Profil" },
    { to: "/profil/mine-annoncer", label: "Mine Bookinger" },
    { to: "/profil/mine-anmeldelser", label: "Mine Anmeldelser" },
  ];

  const isActive = (path) =>
    //path skal være == url :D og && siger og der er true du er her /profil 
    location.pathname === path ||
    (path === "/profil/min-profil" && location.pathname === "/profil");

  return (
    <section className="w-full bg-white dark:bg-gray-950 shadow-md mt-0.5 sticky top-0 z-10">
      <nav className="w-full dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-gradient-to-tr from-primary to-secondary text-white"
                    : "bg-secondary text-white hover:bg-gradient-to-tr hover:from-primary hover:to-secondary "
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Siderne */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Outlet />
      </div>
    </section>
  );
};
