import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ProductLikeButton } from "../LikeButton/LikeButton";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";

export const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();

  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative overflow-hidden">
      <Link to={`/produkter/detaljer/${product.slug}`} className="group block w-full md:w-48 flex-shrink-0">
        <div className="w-full h-48 md:h-full aspect-square relative">
          <img
            className="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg"
            src={product.image || "/images/placeholder-product.jpg"}
            alt={product.name}
            onError={(e) => {
              e.target.src = "/images/placeholder-product.jpg";
            }}
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link to={`/produkter/detaljer/${product.slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description || "Ingen beskrivelse tilgængelig."}
        </p>
      </div>
      <div className="absolute z-10 top-2 left-2 flex space-x-2">
        <ProductLikeButton product={product} />
        <AddToCartButton product={product} />
      </div>
    </article>
  );
};
