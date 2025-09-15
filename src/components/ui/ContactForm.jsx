import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const ContactForm = ({ 
  onSubmit, 
  submitText = 'SEND',
  className = '',
  initialData = { name: '', email: '', message: '' }
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    // Destrukturerer 'name' og 'value' fra input-element
    const { name, value } = e.target;

    // Opdaterer formData state med det nye input
    // 'prev' refererer til den tidligere state af formData
    setFormData(prev => ({
      ...prev, // Beholder alle eksisterende værdier i formData
      [name]: value // Opdaterer kun det felt, der matcher 'name', med den nye 'value'
    }));

    // Hvis der er en fejl for det aktuelle inputfelt (baseret på 'name'), fjernes den
    if (errors[name]) {
      setErrors(prev => ({
        ...prev, // Beholder alle eksisterende fejl
        [name]: '' // Fjerner fejlen for det specifikke felt ved at sætte dens værdi til en tom streng
      }));
    }
  };

  // Simpel validering med object mapping
  const validateForm = () => {
    const newErrors = {};
    
    // Validér alle felter på én gang
    if (!formData.name.trim()) newErrors.name = 'Navn er påkrævet';
    if (!formData.email.trim()) {
      newErrors.email = 'Email er påkrævet';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ugyldig email adresse';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Besked er påkrævet';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Besked skal være mindst 10 tegn';
    }
    
    setErrors(newErrors);
    // Tjekker om der er nogen fejl i newErrors-objektet. Hvis der ikke er nogen returnerer den true.
    return Object.keys(newErrors).length === 0;
  };

  // Håndter form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Reset form efter succes
      setFormData(initialData);
      setErrors({});
    } catch (error) {
      console.error('Fejl ved afsendelse af form:', error);
      toast.error('Kunne ikke sende form. Prøv igen senere.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // input felt med error - styling
  const getInputClasses = (fieldName) => 
    `w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 transition-colors duration-200 ${
      errors[fieldName] ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-500'
    }`;

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Navn felt */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={getInputClasses('name')}
          placeholder="indtast dit navn"
          required
        />
        {/* Conditional error message rendering */}
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email felt */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={getInputClasses('email')}
          placeholder="indtast din email"
          required
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Besked felt */}
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="8"
          className={getInputClasses('message')}
          placeholder="Fortæl os hvad du har på hjertet..."
          required
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Submit knap med conditional rendering af loading state */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-600 text-gray-300 px-16 py-3 rounded-sm text-xl bg-gray-100 hover:bg-orange-600 transition-colors duration-200 font-extralight disabled:opacity-50"
        >
          {/* Ternary operator for knap-tekst baseret på loading state */}
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sender besked...
            </div>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};