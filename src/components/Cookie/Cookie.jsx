import React from "react";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga4';

export const Cookie = ({ onCookieChoice }) => {
    const handleAcceptCookies = () => {
        // Initialiser Google Analytics når cookies accepteres (hvis ikke allerede initialiseret)
        if (!window.gtag) {
            const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
            if (gaTrackingId) {
                ReactGA.initialize(gaTrackingId);
            }
        }
        
        localStorage.setItem('cookiesAccepted', 'true');
        onCookieChoice(true);
    };

    const handleRejectCookies = () => {
        // Gem bruger afvisning i localStorage
        localStorage.setItem('cookiesAccepted', 'false');
        // Underret forældre komponent
        onCookieChoice(false);
    };

    return(<section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
        <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Vi bruger cookies!</h2>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Hej, denne hjemmeside bruger essentielle cookies for at sikre dens korrekte funktion og tracking-cookies for at forstå, hvordan du interagerer med den. Sidstnævnte vil kun blive sat efter samtykke.{" "}
            <Link to={"/cookie-policy"} className="font-medium text-gray-700 underline transition-colors duration-300 dark:hover:text-blue-400 dark:text-white hover:text-blue-500">
                Se Cookiepolitik
            </Link>.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4 shrink-0">
            <button
                onClick={handleAcceptCookies}
                className="text-xs bg-secondary font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
            >
                Accepter alle
            </button>
            <button
                onClick={handleRejectCookies}
                className="text-xs border text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none"
            >
                Afvis cookies
            </button>
        </div>
    </section>
    )
}