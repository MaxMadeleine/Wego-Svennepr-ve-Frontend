import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SplashPage } from '../../pages/SplashPage/SplashPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { MyProfile } from '../MyProfile/MyProfile.jsx';
import { MyTrips } from '../../components/MyPosts/MyPosts.jsx';
import { MyComments } from '../../components/MyComments/MyComments.jsx';
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
        <Route path="/profil" element={<ProfilePage />}>
          <Route index element={<MyProfile />} />
          <Route path="min-profil" element={<MyProfile />} />
          <Route path="mine-annoncer" element={<MyTrips />} />
          <Route path="mine-kommentarer" element={<MyComments />} />
          <Route path="mine-anmeldelser" element={<MyReviews />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};