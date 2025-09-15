import React from 'react';
import { Heart } from 'lucide-react';
import { useLikedProducts } from '../../contexts/LikedContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export const ProductLikeButton = ({ product }) => {
  const { toggleLike, isProductLiked } = useLikedProducts();
  const { isAuthenticated } = useAuth();

  const handleToggleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (!isAuthenticated) {
      toast.error('Du skal være logget ind for at like produkter');
      return;
    }

    toggleLike(product);
  };

  return (
    <button
      onClick={handleToggleLike}
      className={`p-2 transition-colors duration-200 text-white ${
        isProductLiked(product)
          ? "text-like"
          : "text-muted-foreground dark:text-muted-foreground-dark hover:text-like"
      }`}
      title={
        isProductLiked(product)
          ? "Fjern fra favoritter"
          : "Tilføj til favoritter"
      }
    >
      <Heart
        className={`w-5 h-5 ${
          isProductLiked(product) ? "fill-like text-like" : ""
        }`}
      />
    </button>
  );
};
