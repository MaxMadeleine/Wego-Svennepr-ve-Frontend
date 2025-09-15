import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterImage from "../../assets/images/footer/Footer.svg";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${FooterImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`bg-transparent text-white py-8 ${
        location.pathname === "/" ? "md:fixed bottom-0  w-full" : "relative"
      }`}
    >
      <div className="px-4 sm:px-6 flex flex-col lg:flex-row justify-between gap-6 lg:gap-24 items-end">
        {/* Copyright Section */}
        <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-light mb-2 lg:-mb-5 lg:-pb-5">
          <p>© 2025 WeGo ApS</p>
          <p>Fartstræde 12c, 2. sal, 9000 Aalborg</p>
        </div>

        {/* Information */}
        <div className="text-xs sm:text-sm text-gray-400  font-light mb-2 lg:-mb-5 lg:-pb-5">
          <h3 className="text-xl text-transparent sm:text-2xl lg:text-4xl p-8 font-light">
            Information
          </h3>
          <div className="space-y-1 text-xs sm:text-sm lg:text-base text-foreground lg:whitespace-nowrap">
            <br />
            <br />
            <Link
              to="/handelsbetingelser"
              className="block hover:underline transition-all lg:text-base duration-200 text-gray-400 font-light"
            >
              Handelsbetingelser
            </Link>
            <Link
              to="/cookie"
              className="block hover:underline transition-all duration-200 lg:text-base text-gray-400 font-light"
            >
              Cookiepolitik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
