import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import { RatingModal } from '../RatingModal/RatingModal';
import toast from 'react-hot-toast';


//! TODO DER ER BARE TAGET EN SNIPPET. DEN SKAL LAVES
//TODO


export const ProductRating = ({ productId, productName }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, user } = useAuth();

  // Fetch ratings når component mounts
  useEffect(() => {
    fetchRatings();
  }, [productId, isAuthenticated, user]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const reviews = await apiService.getReviewsByProduct(productId);
      
      if (reviews && reviews.length > 0) {
        // avg rating
        const totalStars = reviews.reduce((sum, review) => sum + review.numStars, 0);
        const average = totalStars / reviews.length;
        
        setAverageRating(average);
        setRatingCount(reviews.length);

        // Find user's rating hvis logged ind
        if (isAuthenticated && user) {
          const userReview = reviews.find(review => review.user.email === user.email);
          setUserRating(userReview ? userReview.numStars : 0);
        }
      } else {
        setAverageRating(0);
        setRatingCount(0);
        setUserRating(0);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = () => {
    if (!isAuthenticated) {
      toast.error('Du skal være logget ind for at rate produkter');
      return;
    }
    setShowRatingModal(true);
  };

  const handleRatingSubmit = async (rating) => {
    try {
      const reviewData = {
        title: `Rating for ${productName}`,
        comment: `Rated ${rating} stars`,
        numStars: rating,
        productId: parseInt(productId),
        isActive: true
      };

      await apiService.createReview(reviewData);
      toast.success('Rating sendt!');
      
      setUserRating(rating);
      setShowRatingModal(false);
      
      // Refresher ratings
      await fetchRatings();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Kunne ikke sende rating');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Produktbedømmelse</h3>
      </header>

      {/* avg rating view */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= averageRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-lg font-medium text-gray-900">
            {/* ternary operator */}
            {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Baseret på {ratingCount} {ratingCount === 1 ? 'bedømmelse' : 'bedømmelser'}
        </p>
      </div>

      {/* User Rating Section */}
      {isAuthenticated && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Din bedømmelse</p>
              {userRating > 0 ? (
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= userRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{userRating} stjerner</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-1">Du har ikke bedømt dette produkt endnu</p>
              )}
            </div>
            <button
              onClick={handleRatingClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              {userRating > 0 ? 'Opdater rating' : 'Rate produkt'}
            </button>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 text-center">
            Log ind for at bedømme dette produkt
          </p>
        </div>
      )}

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
        currentRating={userRating}
        className={productName}
      />
    </section>
  );
};
