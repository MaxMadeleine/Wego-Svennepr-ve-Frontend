import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { cartData, addToCart, removeFromCart, removeProductFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleProductFromCart = (productId) => {
    removeProductFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (!isAuthenticated) {
    return (
      <div className="p-5">
        <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-card-foreground dark:text-card-foreground-dark mb-4">Indkøbskurv</h1>
          <p className="text-muted-foreground dark:text-muted-foreground-dark mb-6">Du skal være logget ind for at se din indkøbskurv</p>
          <Link 
            to="/login" 
            className="bg-primary text-primary-foreground dark:text-primary-foreground-dark px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Log ind
          </Link>
        </div>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="p-5">
        <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-card-foreground dark:text-card-foreground-dark mb-4">Indkøbskurv</h1>
          <p className="text-muted-foreground dark:text-muted-foreground-dark mb-6">Din indkøbskurv er tom</p>
          <Link 
            to="/produkter" 
            className="bg-secondary text-secondary-foreground dark:text-secondary-foreground-dark px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors duration-200"
          >
            Gå til produkter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Header sektion */}
      <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Indkøbskurv</h1>
          <button
            onClick={handleClearCart}
            className="bg-delete text-delete-foreground px-4 py-2 rounded-lg hover:bg-delete-hover transition-colors duration-200"
          >
            Ryd kurv
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          {cartData.reduce((total, item) => total + (item.quantity || 1), 0)} varer i kurven
        </p>
      </div>

      {/* Produkt liste */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Produkter</h2>
        <div className="space-y-4">
          {cartData.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              {/* Produkt billede og information */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted dark:bg-muted-dark rounded-lg flex items-center justify-center">
                  <img 
                    src={item?.image || '/images/products/default-product.jpg'}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name || item.title}</h3>
                  <p className="text-black">{item.price || 0} DKK</p>
                  <p className="text-sm text-black">Antal: {item.quantity || 1}</p>
                </div>
              </div>

              {/* Antal og pris kontrol */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveFromCart(item.id || item.name)}
                    className="w-8 h-8 bg-muted dark:bg-muted-dark text-muted-foreground dark:text-muted-foreground-dark rounded-lg hover:bg-muted-foreground dark:hover:bg-muted-foreground-dark transition-colors duration-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-black">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-8 h-8 bg-muted dark:bg-muted-dark text-muted-foreground dark:text-muted-foreground-dark rounded-lg hover:bg-muted-foreground dark:hover:bg-muted-foreground-dark transition-colors duration-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-black">
                    {(item.price || 0) * (item.quantity || 1)} DKK
                  </p>
                  <p className="text-sm text-black">
                    {item.price || 0} DKK pr. stk
                  </p>
                </div>

                {/* Fjern product knap */}
                <button
                  onClick={() => handleProductFromCart(item.name || item.id)}
                  className="text-delete hover:text-delete-hover transition-colors duration-200"
                  title="Fjern product"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total og checkout sektion */}
      <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-card-foreground " >Total</h2>
          <div className="text-right">
            <p className="text-2xl font-bold text-card-foreground ">
              {calculateTotalPrice()} DKK
            </p>
            <p className="text-sm text-gray-500">
              Inklusive alle varer
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            to="/product" 
            className="flex-1 bg-muted dark:bg-muted-dark text-muted-foreground dark:text-muted-foreground-dark px-6 py-3 rounded-lg hover:bg-muted-foreground dark:hover:bg-muted-foreground-dark transition-colors duration-200 text-center"
          >
            Fortsæt med at handle
          </Link>
          <button className="flex-1 bg-primary text-primary-foreground dark:text-primary-foreground-dark px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200">
            Gå til checkout
          </button>
        </div>
      </div>
    </div>
  );
};