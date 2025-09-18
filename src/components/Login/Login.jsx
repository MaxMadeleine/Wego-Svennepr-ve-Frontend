import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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
//bruger trim til at cutte whitespace
    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ugyldig email adresse";
    }

    if (!formData.password) {
      newErrors.password = "Adgangskode er påkrævet";
    } else if (formData.password.length < 6) {
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
      toast.success("Du er nu logget ind!");
      navigate("/find-lift"); // Redirect til profil efter vellykket login
    } catch (err) {
      console.error("Login fejl:", err);
      // Fejl håndteres allerede i AuthContext
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-500">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-black  mb-2 text-center">
          Velkommen tilbage
        </h2>
        <p className="text-gray-600 text-center mb-8">Log ind på din konto</p>

        {/* Viser fejlbesked fra AuthContext hvis der er en */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Indtast din email"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Indtast din adgangskode"
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
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-8 text-center flex justify-center">
          <p className="text-gray-600 mr-2">
            Har du ikke en konto? 
            </p>
            <Link
              to="/register"
              className="text-primary font-medium flex-shrink-1  hover:text-primary transition-colors"
            >
              <p className="animate-bounce"> Opret her</p>
              
            </Link>
          
        </div>
      </div>
    </div>
  );
};

