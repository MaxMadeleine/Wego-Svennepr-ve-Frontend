import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import toast from 'react-hot-toast';


//! TODO KOMMENTARE SKAL LAVES DER ER BARE TAGET ET SNIPPET
//TODO


export const ProductComments = ({ productId, productName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, user } = useAuth();

  // Fetch comments når component mounts
  useEffect(() => {
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const reviews = await apiService.getReviewsByProduct(productId);
      
      // Filter out reviews that are just ratings (have meaningful comments)
      const meaningfulComments = reviews.filter(review => 
        review.comment && 
        review.comment.trim() !== '' && 
        !review.comment.startsWith('Rated ') // Filter out auto-generated rating comments
      );
      
      setComments(meaningfulComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error('Kommentar kan ikke være tom');
      return;
    }

    try {
      setSubmittingComment(true);
      
      const reviewData = {
        // Set a clear title for comments. If the user provided a title, use it, otherwise use a default.
        title: newComment.substring(0, 50), // Use first 50 chars of comment as title if no explicit title for review
        comment: newComment.trim(),
        numStars: 5, // Default rating for comments, as the backend requires it
        productId: parseInt(productId),
        isActive: true
      };

      await apiService.createReview(reviewData);
      toast.success('Kommentar tilføjet!');
      
      setNewComment('');
      setShowCommentForm(false);
      
      // Refresh comments
      await fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Kunne ikke tilføje kommentar');
    } finally {
      setSubmittingComment(false);
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Kommentarer ({comments.length})
          </h3>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            {showCommentForm ? 'Annuller' : 'Skriv kommentar'}
          </button>
        )}
      </header>

      {/* Comment Form */}
      {showCommentForm && isAuthenticated && (
        <form onSubmit={handleCommentSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Din kommentar
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Skriv din kommentar her..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={submittingComment}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowCommentForm(false);
                setNewComment('');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              disabled={submittingComment}
            >
              Annuller
            </button>
            <button
              type="submit"
              disabled={submittingComment || !newComment.trim()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {submittingComment ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sender...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send kommentar
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Not logged in message */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            Log ind for at skrive en kommentar
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Ingen kommentarer endnu</p>
            <p className="text-sm text-gray-400 mt-1">
              Vær den første til at dele dine tanker om dette produkt
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <header className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {comment.user?.name || 'Anonym bruger'}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                </div>
              </header>
              
              <div className="ml-11">
                {comment.title && comment.title !== newComment.substring(0, 50) && (
                  <h5 className="font-medium text-gray-900 mb-2">{comment.title}</h5>
                )}
                <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};
