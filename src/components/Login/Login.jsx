import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { DonationSection } from "../DonationSection/DonationSection";

export const Login = () => {
  // State til at gemme brugerens input i loginformularen
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State til at vise loade og til at gemme valideringsfejl og Henter login-funktioner + fejl fra AuthContext
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Opdater det felt i formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hvis der er en fejl tilknyttet det felt, fjern den når brugeren skriver
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Hvis der er en generel auth-fejl (fx "Forkert login"), ryd den når brugeren skriver igen
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ugyldig email adresse";
    }

    if (!formData.password) {
      newErrors.password = "Adgangskode er påkrævet";
    } else if (formData.password.length < 4) {
      newErrors.password = "Adgangskode skal være mindst 6 tegn";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chekker om Object.keys er 0 og return breaker handlesubmit
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirect til profil efter vellykket login
    } catch (err) {
      console.error("Login fejl:", err);
      // Fejl håndteres allerede i AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-h-screen flex items-center justify-center p-5 -mt-20 -mb-6 py-8">
        <div className="p-6 w-full max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-5xl font-light text-gray-900 mb-2 text-center">
            Log ind
          </h2>

          {/* Viser auth-fejl */}
          {error && (
            <div className=" border border-red-600 text-red-600 px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Din email....."
                disabled={isLoading}
              />
              {errors.email && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Adgangskode
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all"
                placeholder="Dit password......"
                disabled={isLoading}
              />
              {errors.password && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white text-xl font-light py-2 px-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logger ind...
                </div>
              ) : (
                "Log ind"
              )}
            </button>
          </form>

          <p className="text-gray-600 my-8">
            Har du ikke en konto?{" "}
            <Link
              to="/register"
              className="text-secondary font-medium hover:text-green-800 transition-colors underline"
            >
              Klik her
            </Link>{" "}
            for at oprette en konto
          </p>
        </div>
      </div>
      <DonationSection />
    </>
  );
};
