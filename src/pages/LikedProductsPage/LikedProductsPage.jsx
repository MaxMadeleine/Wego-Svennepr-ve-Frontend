import React from 'react';
import { useLikedProducts } from '../../contexts/LikedContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const LikedProductsPage = () => {
  const { likedProducts, clearLikedProducts } = useLikedProducts();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-5">
        <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-card-foreground dark:text-card-foreground-dark mb-4">Liked produkter</h1>
          <p className="text-muted-foreground dark:text-muted-foreground-dark mb-6">Du skal være logget ind for at se dine liked produkter</p>
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

  if (likedProducts.length === 0) {
    return (
      <div className="p-5">
        <div className="bg-card dark:bg-card-dark rounded-xl shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-card-foreground dark:text-card-foreground-dark mb-4">Liked produkter</h1>
          <p className="text-muted-foreground dark:text-muted-foreground-dark mb-6">Du har ikke liked nogen produkter endnu</p>
          <Link 
            to="/produkter" 
            className="bg-secondary text-white dark:text-secondary-foreground-dark px-6 py-3 hover:bg-secondary-dark transition-colors duration-200"
          >
            Gå til produkter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 mt-20">
      {/* Header sektion */}
      <div className=" mb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-card-foreground ">Liked produkter</h1>
          <button
            onClick={clearLikedProducts}
            className="bg-like text-white px-4 py-2  hover:bg-like-hover transition-colors duration-200"
          >
            Ryd liked liste
          </button>
        </div>
        <p className=" ">
          {likedProducts.length} liked produkter
        </p>
      </div>

      {/* Liked produkter grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {likedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`}>
            <figure className="transition-all transform hover:scale-[1.05] cursor-pointer relative">
                <ProductCard
                  product={product}
                  displayType="price"
                  showLikeButton={true}
                />
              <figcaption className="mt-2">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">{product.name}</h3>
                <p className="text-lg md:text-xl font-light text-gray-700">{product.description}</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {/* Gå til produkter knap */}
      <div className="mt-16 text-center">
        <Link 
          to="/produkter" 
          className="bg-secondary text-white px-7 py-3 text-lg hover:bg-secondary-dark transition-colors duration-200"
        >
          Gå tilbage til produkter
        </Link>
      </div>
    </div>
  );
}; 