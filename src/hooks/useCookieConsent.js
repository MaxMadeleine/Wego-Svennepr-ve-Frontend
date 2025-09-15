import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

export const useCookieConsent = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);

  // Tjek om bruger cookies, og initialiser GA hvis nødvendigt
  useEffect(() => {
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    if (cookieChoice !== null) {
      const accepted = cookieChoice === 'true';
      setCookiesAccepted(accepted);
      
      // Initialiser GA, hvis tidligere accepteret og ikke allerede initialiseret
      if (accepted && !window.gtag) {
        const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
        if (gaTrackingId) {
          ReactGA.initialize(gaTrackingId);
          console.log('GA initialized from stored consent');
        }
      }
    }
  }, []);

  const handleCookieChoice = (accepted) => {
    setCookiesAccepted(accepted);
    localStorage.setItem('cookiesAccepted', accepted.toString());
    
    if (accepted && !window.gtag) {
      const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
      if (gaTrackingId) {
        ReactGA.initialize(gaTrackingId);
        console.log('GA initialized from new consent');
      }
    }
  };

  return {
    cookiesAccepted,
    handleCookieChoice
  };
}; 