import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { ClipLoader } from 'react-spinners';


const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_API_URL;

export const BackgroundGallery = ({ isContained = false }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true); // Initialiser loading til true, da jeg henter data fra API'en
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await apiService.getSlides();
        setSlides(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []); // kører kun én gang ved mount

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (loading || slides.length === 0) {
      return;
    }
    // Tjekker før intervallet oprettes
    if (slides.length > 1) {
      // Opretter et interval, der opdaterer 'currentSlideIndex' hvert 5. sekund
      const interval = setInterval(() => {
        // Skifter til næste slide. Hvis det er den sidste slide, går den tilbage til den første
        setCurrentSlideIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      // Rydder intervallet, når komponenten afmonteres eller slides.length ændres
      return () => clearInterval(interval);
    }
  }, [slides.length, loading]); // kører igen når antallet af slides ændres eller loading-tilstand ændres

  if (loading) {
    return  <ClipLoader size={50} color="secondary" />

  }

  if (error) {
    return (
      <span className={`${isContained ? 'absolute' : 'fixed'} inset-0 bg-red-900 flex items-center justify-center z-0 text-white`}>
        Fejl ved indlæsning af billeder: {error.message}
      </span>
    );
  }

  return (
    <figure className={`${isContained ? 'absolute' : 'fixed'} inset-0 z-0`}>
      <Link to="/find-lift" className="absolute inset-0 z-10 cursor-pointer">
        {slides.map((slide, index) => (
          <div
          //Bruger slide.id som key hvis det findes
            key={slide.id || index}
            className={`absolute inset-0 mb-20 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <figcaption className='absolute inset-0 flex flex-col items-center justify-center text-white z-40'>
          <h1 className='text-6xl text-center font-medium'>{slide.text}</h1>
        </figcaption>
          </div>
        ))}
        
      
      </Link>

      {slides.length > 1 && (
        // jeg har dem til eventuel tilvalg men de gemmer sig bag footer XD
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50 cursor-pointer">
          {slides.map((_, index) => (
            // værdien er ligegyldig så jeg bruger underscore 
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
