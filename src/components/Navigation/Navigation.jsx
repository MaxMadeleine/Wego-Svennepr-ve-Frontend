import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X, User, LogOut, Car, Book, UserPlus } from "lucide-react";
import logo from "../../assets/images/logo/WEGO_Logo_1_SW 1.svg";
import { Modal } from "../../components/InfoModal/Modal";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // luk hvis åben
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Så er den ikke sticky der hvor der er til og fra filter
    <nav
      className={`bg-white dark:bg-gray-950 ${
        location.pathname.startsWith("/find-lift") || location.pathname.startsWith("/profil")
          ? "relative"
          : "fixed top-0 left-0 right-0"
      } z-50`}
    >
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center h-20 flex-shrink-0">
          {/* Logo */}
          <Link
            to="/"
            className="flex group items-center h-32 w-32 duration-300 transform md:hover:scale-105"
          >
            <img
              className="object-contain h-full w-full"
              src={logo}
              alt="Wego Logo"
            />
          </Link>

          {/* Desk Navigation ventre */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              key="Find et lift"
              to="/find-lift"
              className={`text-foreground/70 text-base font-light hover:text-secondary transition-colors duration-300 transform md:hover:scale-105 flex items-center justify-center ${
                location.pathname === "/find-lift"
                  ? "border-b-2 border-secondary"
                  : ""
              }`}
            >
              Find et lift
            </Link>

            <button
              onClick={handleOpenModal}
              className={`text-foreground/70 text-base font-light hover:text-secondary transition-colors duration-300 transform md:hover:scale-105 flex items-center justify-center ${
                location.pathname === "/sadan-virker-det"
                  ? "border-b-2 border-secondary"
                  : ""
              }`}
            >
              Sådan virker det
            </button>
          </div>

          {/* Desk User Info højre */}
          <div className="hidden md:flex items-center gap-x-8">
            <div className="flex items-center gap-x-4">
              {isAuthenticated ? (
                <div className="relative flex items-center space-x-4">
                  <Link
                    to="/profil/min-profil"
                    className="flex-shrink-0 flex items-center space-x-1 p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transform hover:scale-[1.02] transition-colors duration-300"
                  >
                    <span className="text-sm font-medium">
                      {user?.firstname || "Min side"}
                    </span>
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-gradient-to-tr  from-primary to-secondary font-medium text-white transition-colors duration-300 border px-4 py-3 transform hover:scale-[1.02] rounded-2xl"
                  >
                    Log ud
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="flex-shrink-0 flex items-center p-1 text-foreground/50 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors transform hover:scale-[1.02] duration-300"
                  >
                    <span className="text-sm font-medium">Log Ind</span>
                    <User className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm bg-gradient-to-tr from-primary to-secondary font-medium text-white transition-colors duration-300 border px-3 py-3 transform hover:scale-[1.02] rounded-2xl"
                  >
                    Opret Konto
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* mobil x */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-secondary dark:text-gray-300 dark:hover:text-secondary transition-colors duration-300"
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
            <Link
              key="Find et lift"
              to="/find-lift"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center text-sm font-medium space-x-2 px-3 py-2 mt-3 rounded-md  bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300"
            >
              <Car />
              <p>Find et lift</p>
            </Link>

            <button
              onClick={handleOpenModal}
              className="flex w-full items-center text-sm font-medium space-x-2 px-3 py-2 mt-3 rounded-md bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 "
            >
              <Book />
              <span>Sådan virker det</span>
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profil/min-profil"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 my-3 rounded-md bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 "
                >
                  <User className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {user?.firstname || "Min side"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 my-3 rounded-md bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 "
                >
                  <LogOut />
                  <span>Log ud</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 my-8 rounded-md bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 "
                >
                  <User className="w-6 h-7" />
                  <span>Log ind</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-3 py-2 my-8 rounded-md bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 "
                >
                  <UserPlus className="w-6 h-6 ml-0.5" />
                  <span>Opret Konto</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {/* passer prop med id så modal component kunne brges andre steder hvis der var mere info */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} contentId={1} />
    </nav>
  );
};
