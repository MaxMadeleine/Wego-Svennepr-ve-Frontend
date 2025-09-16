import React from "react";
import { Link, useLocation } from "react-router-dom";
import FooterImage from "../../assets/images/footer/Footer.svg";

export const Footer = () => {
  const location = useLocation();

  return (
    <footer
      style={{
        backgroundImage: `url(${FooterImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom 20%",
      }}
      className={`bg-transparent pb-4 text-white pt-36 ${
        location.pathname === "/" ? "fixed bottom-0 w-full" : "relative"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 flex justify-between items-end">
        <div className="text-xs sm:text-sm lg:text-xl text-gray-400 font-light">
          <p>© 2025 WeGo ApS</p>
          <p>Fartstræde 12c, 2. sal, 9000 Aalborg</p>
        </div>

        <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-light">
          <h3 className="text-lg text-transparent sm:text-xl lg:text-2xl mb-2 font-light">
            Information
          </h3>
          <div className="space-y-1">
            <Link
              to="/handelsbetingelser"
              className="block hover:underline transition-all duration-200"
            >
              Handelsbetingelser
            </Link>
            <Link
              to="/cookie"
              className="block hover:underline transition-all duration-200"
            >
              Cookiepolitik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
