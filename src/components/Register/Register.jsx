import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Check } from "lucide-react";
import { DonationSection } from "../DonationSection/DonationSection";

export const Register = () => {
  // Form-data med alle felter fra billedet
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    zipcode: "",
  });

  // Terms checkbox state
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Errors fra validering og register auth-funktioner fra context
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

    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email er ugyldig";
    }

    if (!formData.password) {
      newErrors.password = "Adgangskode er påkrævet";
    } else if (formData.password.length < 4) {
      newErrors.password = "Adgangskode skal være mindst 6 tegn";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Bekræft venligst din adgangskode";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Adgangskoder matcher ikke";
    }

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Fornavn er påkrævet";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Efternavn er påkrævet";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adresse er påkrævet";
    }

    if (!formData.city.trim()) {
      newErrors.city = "By er påkrævet";
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Postnummer er påkrævet";
    } else if (!/^\d{4}$/.test(formData.zipcode)) {
      newErrors.zipcode = "Postnummer skal være 4 cifre";
    }

    if (!acceptedTerms) {
      newErrors.terms = "Du skal acceptere betingelserne";
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
      // Data til backend - matcher præcis det backend forventer
      const userData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        zipcode: parseInt(formData.zipcode),
        city: formData.city,
        email: formData.email,
        password: formData.password,
        hasNewsletter: false,
        hasNotification: false,
        refreshToken: "",
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
    <>
      <section className="min-h-screen flex items-center justify-center p-5">
        <article className="p-10 w-full max-w-4xl mx-auto">
          <h2 className="text-5xl font-light text-gray-900 mb-2 text-center">
            Opret en konto
          </h2>

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

            {/* Password og confirm */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Dit password......"
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
                className="block text-lg font-normal text-foreground mb-2"
              >
                Bekræft password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Gentag dit password......"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Fornavn */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Fornavn
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                autoComplete="given-name"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Dit fornavn......."
                disabled={isLoading}
              />
              {errors.firstname && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.firstname}
                </span>
              )}
            </div>

            {/* Efternavn */}
            <div>
              <label
                htmlFor="lastname"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Efternavn
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                autoComplete="family-name"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Dit efternavn......"
                disabled={isLoading}
              />
              {errors.lastname && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.lastname}
                </span>
              )}
            </div>

            {/* Adresse */}
            <div>
              <label
                htmlFor="address"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                autoComplete="street-address"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Din adresse......"
                disabled={isLoading}
              />
              {errors.address && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.address}
                </span>
              )}
            </div>

            {/* By */}
            <div>
              <label
                htmlFor="city"
                className="block text-lg font-normal text-foreground mb-2"
              >
                By
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Din by......"
                disabled={isLoading}
              />
              {errors.city && (
                <span className="text-red-600 text-sm mt-1">{errors.city}</span>
              )}
            </div>

            {/* Postnummer */}
            <div>
              <label
                htmlFor="zipcode"
                className="block text-lg font-normal text-foreground mb-2"
              >
                Postnummer
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                autoComplete="postal-code"
                className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-secondary transition-all "
                placeholder="Dit postnummer......"
                disabled={isLoading}
              />
              {errors.zipcode && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.zipcode}
                </span>
              )}
            </div>

            <p className="text-gray-600 my-20">
              Har du allerede en konto hos os?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:text-green-800 transition-colors underline"
              >
                Klik her
              </Link>{" "}
              for at vende tilbage til login
            </p>

            {/* Terms  */}
            <div className="flex items-start justify-between space-x-4 mt-20">
              <div className="flex items-start space-x-12 flex-1">
                <button
                  type="button"
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                  className={`mt-1 p-1 border-2 transition-all ${
                    acceptedTerms
                      ? "border-secondary bg-secondary text-white"
                      : "border-secondary bg-white text-transparent"
                  }`}
                >
                  <Check size={12} />
                </button>
                <div className="text-sm text-gray-600">
                  <label className="cursor-pointer">
                    Jeg har læst og forstået{" "}
                    <Link
                      to="/register"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      de gældende betingelser
                    </Link>{" "}
                    for oprettelse af kundekonto og brug af denne side
                  </label>
                  {errors.terms && (
                    <span className="text-red-600 text-sm block mt-1">
                      {errors.terms}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white text-xl font-light py-2 px-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Opretter...
                  </div>
                ) : (
                  "Opret"
                )}
              </button>
            </div>
          </form>
        </article>
      </section>
      <DonationSection />
    </>
  );
};
