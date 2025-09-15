import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (!isAuthenticated) {
      toast.error('Du skal være logget ind for at like produkter');
      return;
    }

    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="p-2 transition-colors duration-200 text-white dark:text-gray-300 hover:text-secondary"
      title="Tilføj til kurv"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
};
