import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import toast from 'react-hot-toast';

export const ProductComments = ({ product }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, user } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const reviews = await apiService.getReviewsByProduct(product.slug);      
      const mappedComments = reviews.map((review) => ({
        id: review.id,
        comment: review.comment,
        userId: review.userId,
        createdAt: new Date().toISOString(), // Siden backend ikke har createdAt, bruger jeg tid nu
        user: {
          name: review.user?.firstname || 'Anonym bruger'
        }
      }));
      
      setComments(mappedComments);
    } catch (error) {
      console.error('Fejl ved hentning af kommentare:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [product?.slug]); 

  // breaker så den ikke køre i loop
  
  useEffect(() => {
    if (product?.slug) {
      fetchComments();
    }
  }, [product?.slug, fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Du skal være logget ind for at skrive en kommentar');
      return;
    }
    
    try {
      setSubmittingComment(true);
      
      const reviewData = {
        comment: newComment.trim(),
        productId: product.id // giver comment og product id til backend 
      };

      await apiService.createReview(reviewData);
      toast.success('Kommentar tilføjet!');

      // Opdater kommentarer
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Kunne ikke tilføje kommentar:', error);
      toast.error('Kunne ikke tilføje kommentar');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Er du sikker på at du vil slette denne kommentar?')) return;
    
    try {
      await apiService.deleteReview(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success('Kommentar slettet');
    } catch (error) {
      console.error('Fejl ved sletning af kommentar:', error);
      toast.error('Kunne ikke slette kommentar');
    }
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
    <section className='mb-10'>
      {/* Besked input felt */}
        <div className="flex mb-6 ">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Skriv en besked til sælger......"
            className="flex-1 px-4 py-3 border-2 border-secondary focus:ring-secondary placeholder:text-gray-900 placeholder:text-lg text-xl"
            rows={6}
            disabled={!isAuthenticated || submittingComment}
          />
       
        </div>
        <button
            onClick={handleCommentSubmit}
            disabled={!isAuthenticated || !newComment.trim() || submittingComment}
            className="bg-secondary hover:bg-primary text-white px-9 py-2.5 mb-5 flex ml-auto "
          >
            {submittingComment ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Send'
            )}
          </button>

      {/* Login prompt hvis ikke logget ind */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 ">
          <p className="text-yellow-800 text-center">
            Du skal være logget ind for at sende en besked. 
            <Link to="/login" className="text-secondary hover:text-primary font-medium ml-1">
              Log ind her
            </Link>
          </p>
        </div>
      )}

      {/* Kommentarer */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Ingen beskeder endnu</p>
            <p className="text-sm text-gray-400 mt-1">
              Vær den første til at kontakte sælgeren
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const ownComment = comment.userId === user?.id;
            const isSellerComment = comment.userId === product?.userId;
            
            return (
              <div key={comment.id} className={`flex ${isSellerComment ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-md ${isSellerComment ? 'mr-auto' : 'ml-auto'}`}>
                    <div className={`flex items-center mb-1 ${isSellerComment ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex items-baseline ${isSellerComment ? 'justify-start' : 'justify-end'}`}>
                        <span className="font-light text-md text-gray-500">
                          {isSellerComment 
                            ? `${comment.user?.name || 'Sælger'} (sælger)` 
                            : comment.user?.name || 'Anonym bruger'
                          } 
                        </span> 
                        <span className={` ml-1 text-xs text-gray-500 ${isSellerComment ? 'ml-2' : 'mr-2'}`}>
                           d. {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm bg-white border-2 border-secondary/50 p-3">{comment.comment}</p>
                    <div className={`${isSellerComment ? 'text-left' : 'text-right'}`}>
                      {ownComment && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs font-light text-red-600 hover:text-red-800 "
                        >
                          slet kommentar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
            );
          })
        )}
      </div>
    </section>
  );
};
