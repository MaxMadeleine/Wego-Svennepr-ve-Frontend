import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLikedProducts } from "../../contexts/LikedContext";
import { useCart } from "../../contexts/CartContext";
import { Menu, X, Heart, User, Sun, Moon, Package, Phone, ShoppingCart } from "lucide-react";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();
  // tager værdier fra useAuth
  const { isAuthenticated, user, logout } = useAuth();
  const { likedProducts } = useLikedProducts();
  const { cartData } = useCart();

  const navigationLinks = [
    { name: "Produkter", path: "/produkter", icon: Package },
    { name: "Opret annonce", path: "/opret-annonce", icon: Phone },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <>
    <nav className="bg-white dark:bg-gray-950 fixed top-0 left-0 right-0 z-50 ">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center h-20 flex-shrink-0">
          {/* logo*/}
            <Link to="/forside" className="flex group items-center">
            <h2 className="text-2xl font-medium flex-shrink-0 pr-8 mr-8">Den Grønne Avis</h2>
            </Link>
        

          {/* højre side */}
          <div className="hidden md:flex items-center gap-x-8">
            {navigationLinks.map((link) => {
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground/70 text-base font-light hover:text-secondary transition-colors duration-200 flex items-center justify-center"
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Icons */}
            <div className="flex items-center gap-x-4">
            {/* Cart */}
            <Link
              to="/kurv"
              className="flex-shrink-0 relative flex items-center p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
              aria-label="Indkøbskurv"
            >
              <ShoppingCart className="w-7 h-7 z-10" />
              {cartData.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-secondary text-background text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartData.length}
                </span>
              )}
            </Link>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="flex-shrink-0 p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
              aria-label="Skift tema"
            >
              {isDarkMode ? (
                <Sun className="w-7 h-7" />
              ) : (
                <Moon className="w-7 h-7" />
              )}
            </button>

            {/* Liked */}
            <Link
              to="/liked-produkter"
              className="flex-shrink-0 relative flex items-center p-1 text-foreground/50 hover:text-like dark:text-gray-300 dark:hover:text-like transition-colors duration-200"
              aria-label="Favoritter"
            >
              <Heart className="w-7 h-7 z-10" />
              {/* hvis liked produkter er Greater than "operator" 0 og Hvis "Logical AND operator" / likedProducts.length > 0 er sandt, vil det rendere. */}
              {likedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-like text-background text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {likedProducts.length}
                </span>
              )}
            </Link>

            {/* profil */}
            {isAuthenticated ? (
              <div className="relative">
                <Link
                  to="/profil/min-profil"
                  className="flex-shrink-0 flex items-center space-x-1 p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
                >
                  <User className="w-8 h-8 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {/* hvis user er true så .name */}
                    {user?.name || "Bruger"}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex-shrink-0 flex items-center p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
              >
                <User className="w-8 h-8 flex-shrink-0" />
              </Link>
            )}
            </div>
          </div>

          {/* Mobil button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
              aria-label="Åbn menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <Breadcrumb />

      </div>
      {/* Mobil Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-background dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 space-y-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 my-3 rounded-md text-base transition-colors duration-200 bg-secondary text-background hover:bg-primary"
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="px-2 pb-3 space-y-3">
            <Link
              to="/liked-produkter"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Gemte Produkter</span>
              </div>
            </Link>

            {/* Cart Mobile */}
            <Link
              to="/kurv"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Indkøbskurv</span>
              </div>
              {cartData.length > 0 && (
                <span className="bg-secondary text-background text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleDarkMode}
              className="flex items-center w-full justify-start px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <p className="ml-2">Dark mode</p>
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profil/min-profil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>Min profil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
                >
                  <span>Log ud</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 my-8 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>Log ind</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  </>
  );
};
