import React, {  } from 'react';
import { CardCarousel } from './kibo-ui/card-carousel';

export const TheCardCarousel = () => {

  // Sample images for the carousel
  const sampleImages = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
      alt: "Mountain landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop",
      alt: "Forest"
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop",
      alt: "Ocean"
    }
  ];

  

  return (
    <>
    <div className="p-6 space-y-8">
      {/* CardCarousel */}
      <CardCarousel 
        images={sampleImages}
        autoplayDelay={3000}
        showPagination={true}
        showNavigation={true}
        />
    </div>
        </>
  );
};


