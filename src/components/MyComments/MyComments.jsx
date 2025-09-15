import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { MessageCircle, Edit3, Trash2, Save, Calendar } from 'lucide-react';

export const MyComments = () => {
  const { user } = useAuth();
  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    fetchUserComments();
  }, [user?.id]);

  const fetchUserComments = async () => {
    if (!user?.id) return;
    setLoadingComments(true);
    try {
      const allReviews = await apiService.getUserReviews();
      const comments = allReviews.filter(review => 
        review.userId === user.id &&
        review.comment && 
        review.comment.trim() !== '' && 
        !review.comment.startsWith('Rated ')
      );
      setUserComments(comments);
    } catch (error) {
      console.error('Fejl ved hentning af kommentarer:', error);
      toast.error('Kunne ikke hente kommentarer');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.comment);
  };

  const handleSaveComment = async (commentId) => {
    try {
      await apiService.updateReview(commentId, {
        comment: editCommentText,
        title: userComments.find(c => c.id === commentId)?.title,
        numStars: userComments.find(c => c.id === commentId)?.numStars
      });
      
      setUserComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, comment: editCommentText } 
            : comment
        )
      );
      
      setEditingComment(null);
      setEditCommentText('');
      toast.success('Kommentar opdateret');
    } catch (error) {
      console.error('Fejl ved opdatering af kommentar:', error);
      toast.error('Kunne ikke opdatere kommentar');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Er du sikker på at du vil slette denne kommentar?')) return;
    
    try {
      await apiService.deleteReview(commentId);
      setUserComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success('Kommentar slettet');
    } catch (error) {
      console.error('Fejl ved sletning af kommentar:', error);
      toast.error('Kunne ikke slette kommentar');
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
        <MessageCircle className="w-5 h-5 mr-2" />
        Mine Kommentarer ({userComments.length})
      </h2>

      {loadingComments ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : userComments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Du har ikke skrevet nogen kommentarer endnu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userComments.map((comment) => (
            <article key={comment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{comment.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    aria-label="Rediger kommentar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    aria-label="Slet kommentar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {editingComment === comment.id ? (
                <div className="space-y-3">
                  <label htmlFor={`comment-${comment.id}`} className="sr-only">
                    Rediger kommentar
                  </label>
                  <textarea
                    id={`comment-${comment.id}`}
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows="3"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveComment(comment.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 hover:bg-blue-700"
                    >
                      <Save className="w-3 h-3" />
                      <span>Gem</span>
                    </button>
                    <button
                      onClick={() => setEditingComment(null)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                    >
                      Annuller
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
