import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { User, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export const MyPosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [userProducts, setUserProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  
  // Indlæs brugerdata når komponenten monteres
  useEffect(() => {
    if (user?.id) {
      loadUserProducts();
    }
  }, [user?.id]);

// tjek om det er en gyldig bruger med et id
  const loadUserProducts = async () => {
    if (!user?.id) return;
    
    setLoadingProducts(true);
    try {
      //passer user.id som et argument til funktionen
      const products = await apiService.getUserProducts(user.id);
      setUserProducts(products);
    } catch (error) {
      console.error('Fejl ved hentning af produkter:', error);
      toast.error('Kunne ikke hente dine annoncer');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Er du sikker på at du vil slette denne annonce?')) return;
    
    setDeletingProduct(productId);
    try {
      // Opdaterer state for brugerens produkter ved at filter produkt væk, som har det productId.
      // prev er til den tidligere liste og filter returnerer en ny liste uden det produktet
      setUserProducts(prev => prev.filter(p => p.id !== productId));
      
      await apiService.deleteProduct(productId);
      toast.success('Annonce slettet');
    } catch (error) {
      console.error('Fejl ved sletning af annonce:', error);
      toast.error('Kunne ikke slette annonce');
      // kør den originale liste over brugerens produkter => fetch
      loadUserProducts();
    } finally {
      setDeletingProduct(null);
    }
  };

  const handleViewProduct = (name) => {
    navigate(`/produkter/detaljer/${name}`);
  };

  return (
    <section className=" mt-20 mx-auto">
      {/* Annoncer  */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="text-xl font-normal text-gray-900 mb-6 p-1">
          Mine Annoncer ({userProducts.length})
        </h2>

        {loadingProducts ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
          // cinditional operators. og ? = ternary operator
        ) : userProducts.length === 0 ? (
          <article className="text-center py-8">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Du har ikke oprettet nogen annoncer endnu</p>
          </article>
        ) : (
          <section className="space-y-4">
            {userProducts.map((product) => (
              <article key={product.id} className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 p-3 lg:p-5 border-2 border-secondary">
                  {/* Venstre */}
                  <figure className="flex-1 overflow-hidden order-2 lg:order-1">
                    <header className="bg-secondary text-white px-3 lg:px-4 py-2 flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-2 lg:gap-0">
                      <h3 className="text-xl lg:text-2xl font-light">{product.name}</h3>
                      <span className="text-xl lg:text-2xl font-light">Pris: {product.price} kr</span>
                    </header>
                    
                    <figcaption className="py-3 lg:py-4 px-2">
                      <p className="text-gray-700 text-base lg:text-lg mb-4">
                        {product.description}
                      </p>
                    </figcaption>
                  </figure>
                  
                  {/* højre */}
                  <div className="w-full lg:w-96 h-48 lg:h-48 bg-gray-100 overflow-hidden flex-shrink-0 order-1 lg:order-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* actions*/}
                <div className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4">
                  <button
                    onClick={() => handleViewProduct(product.slug)}
                    className="hover:text-green-700 text-md font-normal flex items-center justify-center sm:justify-start space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Gå til annonce</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    disabled={deletingProduct === product.id} // disabked til imens jeg sletter produkt
                    className="text-red-600 hover:text-red-700 text-md font-normal flex items-center justify-center sm:justify-start space-x-1 disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Fjern annonce</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};
