import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../../services/apiService";
import { ProductComments } from "../ProductComments/ProductComments";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductDetails = () => {
  const { slug } = useParams();
  
  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funktion til at hente produkt med retry mechanism
  const fetchProductWithRetry = async (productSlug, retryCount = 0) => {
    try {
      const productData = await apiService.getProduct(productSlug);
      return productData;
    } catch (error) {
      console.error(`Kunne ikke hente produktdata (forsøg ${retryCount + 1}):`, error);
      
      if (retryCount < 2) {
        // når prosimse har vented et sekund fetcher den igen
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchProductWithRetry(productSlug, retryCount + 1);
      } else {
        throw error; // fejl efter 3 forsøg
      }
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null); // hvis der har været en fejl i fetch over
        
        const productData = await fetchProductWithRetry(slug);
        setProduct(productData);
      } catch (error) {
        console.error("Kunne ikke hente produktdata efter alle forsøg:", error);
        setError("Kunne ikke hente produktdata. Prøv igen senere.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) { // fether kun hvis slug er en af produkterne
      fetchProductData();
    }
  }, [slug]);



  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Henter produktdata...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Prøv igen
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-4 ">
          <div className="max-w-4xl mx-auto">
            {/* card */}
            <article className="mb-8 w-3/4 mx-auto">
              <ProductCard product={product} imageOnly={true} showLikeButton={true} />
            </article>
           {/* Kommentarer */}
              <div className="border-t-4 border-secondary mt-48"/>
                <h2 className="text-5xl font-light text-center text-secondary my-16">Kontakt sælger</h2> 
                <ProductComments 
                  productId={product?.id} 
                  productName={product?.name || 'Produkt'}
                  product={product}
                />
            </div>
    </section>
  );
};