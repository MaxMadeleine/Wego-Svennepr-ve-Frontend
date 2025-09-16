import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X, User, LogOut, Car, Book } from "lucide-react";
import logo from '../../assets/images/logo/WEGO_Logo_1_SW 1.svg';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navigationLinks = [
    { name: "Find et lift", path: "/find-lift", icon: <Car/>, },
    { name: "Sådan virker det", path: "/sadan-virker-det", icon: <Book/>, },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    // Så er den ikke sticky der hvor der er til og fra filter
    <nav className={`bg-white dark:bg-gray-950 ${location.pathname.startsWith('/find-lift') ? 'relative' : 'fixed top-0 left-0 right-0'} z-50`}> 
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center h-20 flex-shrink-0">
          {/* Logo */}
          <Link to="/" className="flex group items-center h-32 w-32 duration-300 transform md:hover:scale-105"> 
            <img className="object-contain h-full w-full" src={logo} alt="Wego Logo" /> 
          </Link>
          
          {/* Desk Navigation ventre */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-foreground/70 text-base font-light hover:text-secondary transition-colors duration-300 transform md:hover:scale-105 flex items-center justify-center ${location.pathname === link.path ? 'border-b-2 border-secondary' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        
          {/* Desk User Info højre */}
          <div className="hidden md:flex items-center gap-x-8">
            <div className="flex items-center gap-x-4">
              {isAuthenticated ? (
                <div className="relative flex items-center space-x-4">
                  <Link
                    to="/profil/min-profil"
                    className="flex-shrink-0 flex items-center space-x-1 p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">
                      {user?.name || "Bruger"}
                    </span>
                    <User className="w-5 h-5" />
                  </Link>
                  <button onClick={handleLogout} className="text-sm bg-primary font-medium text-white transition-colors duration-200 border px-3 py-3 rounded-2xl">Log ud</button>
                </div>
              ) : (
                <div className="relative flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="flex-shrink-0 flex items-center p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">Log Ind</span>
                    <User className="w-5 h-5" />
                  </Link>
                  <Link to="/register" className="text-sm bg-primary font-medium text-white transition-colors duration-200 border px-3 py-3 rounded-2xl">Opret Konto</Link>
                </div>
              )}
            </div>
          </div>

          {/* mobil x */}
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
      </div>
      {/* mobil meny */}
      {isMenuOpen && (
        <div className="md:hidden bg-background dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center text-sm font-medium space-x-2 px-3 py-2 mt-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
            >
              <p>{link.icon}</p>
              <p>{link.name}</p>
            </Link>
          ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profil/min-profil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
                >
                  
                  <User className="w-6 h-6" />
                  <span className="text-sm font-medium">
                      {user?.name || "Bruger"}
                    </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 my-3 bg-secondary text-background hover:bg-primary rounded-md transition-colors duration-200"
                >
                  <LogOut/>
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
  );
};
