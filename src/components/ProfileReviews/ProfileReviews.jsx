import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Star, MessageCircle, Send, User } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileReviews = ({ tripId, driverId, driver, reviews: initialReviews }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState(initialReviews || []);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    // hvis initialReviews ikke er der fetch jeg dem
    if (!initialReviews && driverId) {
      fetchReviewsForTrip();
    }
  }, [driverId, initialReviews]);

  const fetchReviewsForTrip = async () => {
    setLoadingReviews(true);
    try {
      const fetchedReviews = await apiService.getReviewsByUser(driverId);
      const meaningfulReviews = fetchedReviews.filter(review =>
        review.comment && review.comment.trim() !== '' && !review.comment.startsWith('Rated ')
      );
      setReviews(meaningfulReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Kunne ikke hente anmeldelser for turen');
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!newReviewComment.trim() || newReviewRating === 0) {
      toast.error('Venligst udfyld både kommentar og giv en rating');
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewData = {
        comment: newReviewComment.trim(),
        numStars: newReviewRating,
        reviewedUserId: driverId, // choføren
      };

      await apiService.createReview(reviewData);
      toast.success('Anmeldelse tilføjet!');

      setNewReviewComment('');
      setNewReviewRating(0);
      setShowReviewForm(false);
      fetchReviewsForTrip(); // Refresh listen 
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Kunne ikke tilføje anmeldelse');
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ' kl. ' + date.toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const driverAvgStars = driver?.avgStars || 0;
  const driverNumReviews = driver?.numReviews || 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Chaufføren:</h2>
        
            <ProfileCard
              profileImageUrl={driver?.imageUrl}
              userName={driver ? `${driver.firstname} ${driver.lastname}` : 'Ukendt Chauffør'}
              userStars={driverAvgStars}
              onClickStars={isAuthenticated && !showReviewForm ? setNewReviewRating : undefined}
              layout="horizontal"
              memberSince={driver?.createdAt ? `Medlem siden ${new Date(driver.createdAt).toLocaleDateString('da-DK', { year: 'numeric', month: 'long' })}` : 'juli 2014'}
              numReviews={driverNumReviews}
              isAuthenticated={isAuthenticated}
              user={user}
              driverId={driverId}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
            
          </div>
          
          {showReviewForm && isAuthenticated && user?.id !== driverId && (
            <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
                  Din anmeldelse
                </label>
                <textarea
                  id="reviewComment"
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Skriv din anmeldelse her..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={submittingReview}
                />
              </div>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700 mb-2">Din rating:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= newReviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => setNewReviewRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setNewReviewComment('');
                    setNewReviewRating(0);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  disabled={submittingReview}
                >
                  Annuller
                </button>
                <button
                  type="submit"
                  disabled={submittingReview || !newReviewComment.trim() || newReviewRating === 0}
                  className="flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {submittingReview ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sender...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send anmeldelse
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
      {/* Reviews  */}
      {loadingReviews ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Ingen anmeldelser endnu</p>
          <p className="text-sm text-gray-400 mt-1">
            Vær den første til at anmelde denne chauffør!
          </p>
        </div>
      ) : (
        <div className="space-y-4 ">
          {reviews.map((review, index) => (
            <div key={review.id ? review.id : `review-${index}`} className="flex space-x-3 bg-gray-100 p-3 rounded-3xl">
              {/* Profil */}
              <div className="w-14 h-14 rounded-full  overflow-hidden bg-gray-200 flex-shrink-0">
                {review.reviewer?.imageUrl ? (
                  <img 
                    src={review.reviewer.imageUrl} 
                    alt={`${review.reviewer.firstname}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                  {review.reviewer?.firstname} {review.reviewer?.lastname ? review.reviewer.lastname.charAt(0) : ''}.
 
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.numStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-0.5">
                  {formatDate(review.createdAt)}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};