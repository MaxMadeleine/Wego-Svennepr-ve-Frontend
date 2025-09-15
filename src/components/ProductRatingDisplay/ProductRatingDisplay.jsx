import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import { RatingModal } from '../RatingModal/RatingModal';
import toast from 'react-hot-toast';



//! TODO DER ER BARE TAGET EN SNIPPET. DEN SKAL LAVES
//TODO



export const ProductRatingDisplay = ({ productId }) => {
  const { isAuthenticated } = useAuth();
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const reviews = await apiService.getReviewsByProduct(productId);
      
      if (reviews && reviews.length > 0) {
        const totalStars = reviews.reduce((sum, review) => sum + review.numStars, 0);
        const average = totalStars / reviews.length;
        
        setAverageRating(average);
        setRatingCount(reviews.length);
      } else {
        setAverageRating(0);
        setRatingCount(0);
      }
    } catch (error) {
      console.error('Error fetching ratings for product '+ productId + ':', error);
      setAverageRating(0);
      setRatingCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [productId]);

  const handleDisplayClick = (event) => {
    if (isAuthenticated) {
      if (!isAuthenticated) return;
      event.preventDefault();   // stopper default link behavior
      event.stopPropagation();  // stopper "bubbling" så vi ikke får flere events
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitRating = async (numStars) => {
    try {
      await apiService.createReview({ productId, numStars });
      toast.success('Bedømmelse sendt!');
      fetchRatings(); // Refresh ratings after submission
      setIsModalOpen(false); // Close modal after successful submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Kunne ikke sende bedømmelse.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center">
        <div className="animate-pulse h-4 w-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={(event) => handleDisplayClick(event)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= averageRating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {averageRating > 0 ? averageRating.toFixed(1) : '0.0'} ({ratingCount})
      </span>
      {isAuthenticated && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRating}
          productId={productId}
          currentRating={averageRating}
        />
      )}
    </div>
  );
};
