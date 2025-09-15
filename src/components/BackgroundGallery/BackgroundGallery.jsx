import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImage1 from '../../assets/images/banners/banner_image1.jpg';
import bannerImage2 from '../../assets/images/banners/banner_image2.jpg';
import bannerImage3 from '../../assets/images/banners/banner_image3.jpg';

export const BackgroundGallery = ({ isContained = false }) => {
  // slide fra from assets, da det er bedre til serverhosting
  const [slides] = useState([
    {
      id: 1,
      imageUrl: bannerImage1,
      orderNum: 1,
      title: 'Velkommen til Den Grønne Afvis'
    },
    {
      id: 2,
      imageUrl: bannerImage2,
      orderNum: 2,
      title: 'Velkommen til Den Grønne Afvis'
    },
    {
      id: 3,
      imageUrl: bannerImage3,
      orderNum: 3,
      title: 'Velkommen til Den Grønne Afvis'
    }
  ]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(false); // vi loader ikke fra api

  useEffect(() => {
    // Tjekker før intervallet oprettes
    if (slides.length > 1) {
      // Opretter et interval, der opdaterer 'currentSlideIndex' hvert 8. sekund
      const interval = setInterval(() => {
        // Skifter til næste slide. Hvis det er den sidste slide, går den tilbage til den første
        setCurrentSlideIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000);

      // Rydder intervallet, når komponenten afmonteres eller slides.length ændres
      return () => clearInterval(interval);
    }
  }, [slides.length]); // kører igen når antallet af slides ændres

  if (loading) {
    return (
      <span className={`${isContained ? 'absolute' : 'fixed'} inset-0 bg-gray-900 flex items-center justify-center z-0`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </span>
    );
  }

  return (
    <figure className={`${isContained ? 'absolute' : 'fixed'} inset-0 z-0`}>
      <Link to="/forside" className="absolute inset-0 z-10 cursor-pointer">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
        
        <figcaption className='absolute inset-0 flex flex-col items-center justify-center text-white z-20'>
          <h1 className='text-6xl text-center font-medium'>Velkommen til Den Grønne Afvis</h1>
          <br />
          <p className='text-2xl font-light'>Vi går forest i kampen om klimaet ved at give 2 kr. til</p>
          <p className='text-2xl font-light'> klima-venlige formål, hver gang du handler brugt på Den</p>
          <p className='text-2xl font-light'> Grønne Avis</p>
        </figcaption>
      </Link>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50 cursor-pointer">
          {slides.map((_, index) => (
            // værdien er ligegyldig så jeg bruger underscore :)
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlideIndex
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Gå til slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </figure>
  );
};
