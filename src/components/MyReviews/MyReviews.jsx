import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Star, Edit3, Save, Trash2, Calendar } from 'lucide-react';

export const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [editReviewRating, setEditReviewRating] = useState(0);

  useEffect(() => {
    fetchUserReviews();
  }, [user?.id]);

  const fetchUserReviews = async () => {
    if (!user?.id) return;
    setLoadingReviews(true);
    try {
      const allReviews = await apiService.getUserReviews();
      const reviews = allReviews.filter(review => 
        review.userId === user.id &&
        !review.comment.startsWith('Rated ') // Filter  comments, focus på ratings
      );
      setUserReviews(reviews);
    } catch (error) {
      console.error('Fejl ved hentning af anmeldelser:', error);
      toast.error('Kunne ikke hente anmeldelser');
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review.id);
    setEditReviewRating(review.numStars);
  };

  const handleSaveReview = async (reviewId) => {
    try {
      await apiService.updateReview(reviewId, {
        numStars: editReviewRating,
        title: userReviews.find(r => r.id === reviewId)?.title,
        comment: userReviews.find(r => r.id === reviewId)?.comment
      });
      
      setUserReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { ...review, numStars: editReviewRating } 
            : review
        )
      );
      
      setEditingReview(null);
      setEditReviewRating(0);
      toast.success('Anmeldelse opdateret');
    } catch (error) {
      console.error('Fejl ved opdatering af anmeldelse:', error);
      toast.error('Kunne ikke opdatere anmeldelse');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Er du sikker på at du vil slette denne anmeldelse?')) return;
    
    try {
      await apiService.deleteReview(reviewId);
      setUserReviews(prev => prev.filter(review => review.id !== reviewId));
      toast.success('Anmeldelse slettet');
    } catch (error) {
      console.error('Fejl ved sletning af anmeldelse:', error);
      toast.error('Kunne ikke slette anmeldelse');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Star className="w-5 h-5 mr-2" />
        Mine Anmeldelser ({userReviews.length})
      </h2>

      {loadingReviews ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : userReviews.length === 0 ? (
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Du har ikke givet nogen anmeldelser endnu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userReviews.map((review) => (
            <article key={review.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{review.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    aria-label="Rediger anmeldelse"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    aria-label="Slet anmeldelse"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {editingReview === review.id ? (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                    <div className="flex space-x-1" role="group" aria-label="Vælg stjerne rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setEditReviewRating(star)}
                          className={`w-6 h-6 ${
                            star <= editReviewRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          aria-label={`${star} stjerner`}
                        >
                          <Star className="w-full h-full" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveReview(review.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-blue-700"
                    >
                      <Save className="w-3 h-3" />
                      <span>Gem</span>
                    </button>
                    <button
                      onClick={() => setEditingReview(null)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                    >
                      Annuller
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex" role="img" aria-label={`${review.numStars} ud af 5 stjerner`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.numStars
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {review.numStars}/5 stjerner
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
