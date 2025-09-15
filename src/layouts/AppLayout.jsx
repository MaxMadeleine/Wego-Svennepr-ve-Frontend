import React from 'react';
import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';
import { Cookie } from '../components/Cookie/Cookie';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { Navigation } from '@/components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { TripFilter } from '../components/TripFilter/TripFilter';

export const AppLayout = ({ children }) => {
  const { cookiesAccepted, handleCookieChoice } = useCookieConsent();
  const location = useLocation();
  
  const showTripFilter = location.pathname.startsWith('/find-lift');

  return (
    <>
    <Navigation/>
    {showTripFilter && <TripFilter />}
      <Main>
        {children}
      </Main>
      <Footer />
      {/* Vis cookie banner kun hvis brugeren ikke har taget stilling endnu */}
      {cookiesAccepted === null && <Cookie onCookieChoice={handleCookieChoice} />}
    </>
  );
}; 