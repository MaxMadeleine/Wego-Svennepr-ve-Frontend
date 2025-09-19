import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SplashPage } from '../../pages/SplashPage/SplashPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { MyProfile } from '../MyProfile/MyProfile.jsx';
import { MyBookings } from '../MyBookings/MyBookings.jsx';
import { MyReviews } from '../../components/MyReviews/MyReviews.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import { CookiePage } from '../../pages/CookiePage/CookiePage.jsx';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { TripPage } from '../../pages/TripPage/TripPage'; 
import { TripDetails } from '../TripDetails/TripDetails'; 
import { TripList } from '../TripList/TripList'; 
import { TermsOfServicePage } from '../../pages/TermsOfServicePage/TermsOfServicePage';
import { BookTrip } from '../TripBooking/TripBooking';

export const AppRoutes = () => {
  return (
    
    <Routes>
      <Route index element={<SplashPage />} />
      <Route path="/find-lift" element={<TripPage />}>
        <Route index element={<TripList />} />
        <Route path=":id" element={<TripDetails />} />
        <Route path=":id/book-plads" element={<BookTrip />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cookie" element={<CookiePage />} />
      <Route path="/handelsbetingelser" element={<TermsOfServicePage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/profil">
          <Route index element={<MyProfile />} />
          <Route path="min-profil" element={<MyProfile />} />
          <Route path="mine-bookinger" element={<MyBookings />} />
          <Route path="mine-reviews" element={<MyReviews />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};