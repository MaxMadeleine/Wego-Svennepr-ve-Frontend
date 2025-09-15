import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { SplashPage } from '../../pages/SplashPage/SplashPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { MyProfile } from '../MyProfile/MyProfile.jsx';
import { MyPosts } from '../MyPosts/MyPosts.jsx';
import { MyComments } from '../MyComments/MyComments.jsx';
import { MyReviews } from '../MyReviews/MyReviews.jsx';
import { LikedProductsPage } from '../../pages/LikedProductsPage/LikedProductsPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import { CookiePage } from '../../pages/CookiePage/CookiePage.jsx';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import { ProductList } from '../ProductList/ProductList';
import { CreatePosterPage } from '../../pages/CreatePosterPage/CreatePosterPage';
import { TermsOfServicePage } from '../../pages/TermsOfServicePage/TermsOfServicePage';
import { CartPage } from '../../pages/CartPage/CartPage';

export const AppRoutes = () => {
  return (
    
    <Routes>
      <Route index element={<SplashPage />} />
      <Route path="/forside" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/produkter" element={<ProductPage />}>
        <Route index element={<ProductList />} />
        <Route path=":slug" element={<ProductList />} />
        <Route path="detaljer/:slug" element={<ProductDetails />} />
      </Route>
      <Route path="/kurv" element={<CartPage />} />
      <Route path="/cookie" element={<CookiePage />} />
      <Route path="/handelsbetingelser" element={<TermsOfServicePage />} />
      



      
      <Route element={<ProtectedRoute />}>
        <Route path="/opret-annonce" element={<CreatePosterPage />} />
        <Route path="/profil" element={<ProfilePage />}>
          <Route index element={<MyProfile />} />
          <Route path="min-profil" element={<MyProfile />} />
          <Route path="mine-annoncer" element={<MyPosts />} />
          <Route path="mine-kommentarer" element={<MyComments />} />
          <Route path="mine-anmeldelser" element={<MyReviews />} />
        </Route>
        <Route path="/liked-produkter" element={<LikedProductsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};