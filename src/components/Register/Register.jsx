import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Register = () => {
  // Form-data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
    imageUrl: "",
    refreshToken: "",
  });

  // Errors fejl fra validering og register auth-funktioner fra context
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Ryd felt-specifik fejl når bruger skriver i feltet
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Ryd global auth-fejl når bruger skriver
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    //bruger trim til at cutte whitespace
    if (!formData.name.trim()) {
      newErrors.name = "Navn er påkrævet";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email er ugyldig";
    }

    if (!formData.password) {
      newErrors.password = "Adgangskode er påkrævet";
    } else if (formData.password.length < 6) {
      newErrors.password = "Adgangskode skal være mindst 6 tegn";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Bekræft venligst din adgangskode";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Adgangskoder matcher ikke";
    }

    if (!formData.imageUrl) {
      newErrors.imageUrl = "Profilbillede URL er påkrævet";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Beskrivelse er påkrævet";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chekker om Object.keys er 0 i validateform og return breaker handlesubmit
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
// jeg deler brugerens fulde navn (formData.name) op i fornavn og efternavn ved at bruge split(" ") det opdeler navnet i en array baseret på mellemrum. derefter nameParts[0] tager første ord som fornavn. nameParts.slice(1).join(" ")
      const nameParts = formData.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      // Data til backend
      const userData = {
        firstname: firstname,
        lastname: lastname,
        email: formData.email,
        password: formData.password,
        description: formData.description || "",
        imageUrl: formData.imageUrl || "",
        refreshToken: formData.refreshToken || "",
        isActive: true,
      };

      // Forsøg at registrere bruger
      await register(userData);
      navigate("/login"); // Redirect til login efter vellykket registrering
    } catch (err) {
      console.error("Registrering fejl:", err);
      // Fejl håndteres allerede i AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-32 justify-center bg-white-500">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-black  mb-2 text-center">
          Opret konto
        </h2>
        <p className="text-gray-600 text-center mb-8">Tilslut dig i dag</p>

        {/* Viser auth-fejl */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Fuldt navn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Indtast dit fulde navn"
              disabled={isLoading}
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">{errors.name}</span>
            )}
          </div>

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
              autoComplete="new-password"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bekræft adgangskode
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Gentag din adgangskode"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profilbillede URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              autoComplete="photo"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.imageUrl
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Indtast URL til dit profilbillede"
              disabled={isLoading}
            />
            {errors.imageUrl && (
              <span className="text-red-600 text-sm mt-1">{errors.imageUrl}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Beskrivelse (valgfrit)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Fortæl os om dig selv"
              disabled={isLoading}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Opretter konto...
              </div>
            ) : (
              "Opret konto"
            )}
          </button>
        </form>

        <div className="mt-8 text-center flex justify-center">
          <p className="text-gray-600 mr-2">
            Har du allerede en konto? 
            </p>
            <Link
              to="/login"
              className="text-primary font-medium flex-shrink-1  hover:text-primary transition-colors"
            >
              <p className="animate-bounce"> Log ind</p>
            </Link>
          
        </div>
      </div>
    </div>
  );
};
