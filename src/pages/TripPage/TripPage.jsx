import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FilterSideBar } from '../../components/Aside/Aside';

export const TripPage = () => {
  const location = useLocation();
  // viser kun aside på find-lift siden
  const isTripDetailsPage = location.pathname.startsWith('/find-lift/') && location.pathname.split('/').length > 2; // Tjekker om url indeholder mindst to dele efter det første `/`.

  return (
    <section className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8 ">
      {!isTripDetailsPage && <FilterSideBar />} 
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};