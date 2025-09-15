import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import toast from 'react-hot-toast';

export const Footer = () => {
  const location = useLocation(); 

  const [email, setEmail] = useState(''); // til email
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault(); 
    if (!email.trim()) return; // Stopper hvis mail er tom
    setIsSubmitting(true);

    try {
      await apiService.subscribeToNewsletter(email); // post
      toast.success('Tak for din tilmelding til nyhedsbrevet!');
      setIsSubscribed(true);
      setEmail('');

      setTimeout(() => setIsSubscribed(false), 3000); // Reset efter 3 sekunder
    } catch (error) {
      toast.error('Der opstod en fejl ved tilmelding. Prøv venligst igen.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-24">
          
          {/* nyhedsbrev */}
          <div className="space-y-3 lg:space-y-4 w-full lg:w-[125%]">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-light">Nyhedsbrev</h3>
            <p className="text-xs sm:text-sm lg:text-base text-foreground leading-relaxed">
              Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev 
              og få de seneste klima opdateringer direkte i din indbakke
            </p>
            
            {isSubscribed ? (
              <div className="bg-background text-primary p-3 sm:p-4 rounded-md font-medium text-sm sm:text-base">
                Tak for din tilmelding! 
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din email adresse"
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-sm text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-white px-4 sm:px-8 py-2 sm:py-3 rounded-sm font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'TILMELDER...' : 'Tilmeld'}
                </button>
              </div>
            </form>
          )}
        </div>

           {/* Kontakt */}
               <div className="space-y-3 lg:space-y-4 min-w-0 flex-shrink-0">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-light">Kontakt</h3>
            <div className="space-y-1 text-xs sm:text-sm lg:text-base text-foreground lg:whitespace-nowrap">
              <p>Redningen 32</p>
              <p>2210 Virum/Lyngby-Øster</p>
              <p>+45 88229422</p>
              <p>dga@info.dk</p>
            </div>
          </div>

          {/* FN */}
          <div className="space-y-3 lg:space-y-4 w-full lg:w-[125%]">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-light">FN´s Verdensmål</h3>
            <div className="space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-base text-foreground">
              <p className="leading-relaxed">
                Vi støtter på organisatorisk plan op om FN´s verdensmål 
                og har derfor besluttet at en del af overskuddet går 
                direkte til verdensmål nr. 13: Klimahandling
              </p>
              <Link 
                to="#" 
                className="inline-block underline hover:no-underline transition-all duration-200 text-white font-light text-sm sm:text-base"
              >
                Læs mere om verdensmålene her
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-3 lg:space-y-4 min-w-0 flex-shrink-0">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-light">Information</h3>
            <div className="space-y-1 text-xs sm:text-sm lg:text-base text-foreground lg:whitespace-nowrap">
              <Link to="/handelsbetingelser" className="block hover:underline transition-all duration-200 text-white font-light">
                Handelsbetingelser
              </Link>
              <Link to="/cookie" className="block hover:underline transition-all duration-200 text-white font-light">
                Cookiepolitik
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};