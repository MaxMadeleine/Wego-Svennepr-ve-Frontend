import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const LikedProductsContext = createContext(null);

// Custom hook til at bruge liked products context
export const useLikedProducts = () => {
  const context = useContext(LikedProductsContext);
  if (!context) {
    throw new Error('useLikedProducts skal bruges inden for en LikedProductsContextProvider');
  }
  return context;
};

export const LikedProductsContextProvider = ({ children }) => {
  // State til at holde styr på liked produkter
  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const storedLikes = localStorage.getItem('likedProducts');
      return storedLikes ? JSON.parse(storedLikes) : [];
    } catch (error) {
      console.error("Fejl ved indlæsning af liked produkter fra localStorage:", error);
      return [];
    }
  });

  // Gem liked produkter i localStorage når de ændres
  useEffect(() => {
    try {
      localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    } catch (error) {
      console.error("Fejl ved lagring af liked produkter i localStorage:", error);
    }
    //køre vær gang vi ændre i liked procuts
  }, [likedProducts]);

  // Funktion til at tilføje/fjerne produkt fra liked liste
  const toggleLike = (product, showToast = true) => {
    // Tjek om produktet har enten et gyldigt ID eller navn
    if (!product || (!product.id && !product.name)) {
      console.error('Produkt mangler både ID og navn:', product);
      toast.error("Kunne ikke like produkt - mangler ID eller navn");
      return;
    }
//  .some gennemgår array af liked produkter og en chekker, om mindst et produkt i arrayen matcher det givne produkt, på enten id eller name
    const isLiked = likedProducts.some((item) => 
      (item.id && item.id === product.id) || 
      (item.name && item.name === product.name)
    );
    
    if (isLiked) {
      // Fjern produkt fra liked liste
      const updatedLiked = likedProducts.filter((item) => 
        //Ved at bruge item.id && item.id === product.id, sikrer jeg, at sammenligningen kun udføres, hvis item.id eksisterer.
        !((item.id && item.id === product.id) || (item.name && item.name === product.name))
      );
      setLikedProducts(updatedLiked);
      if (showToast) {
        toast.success(`${product.title || product.name} fjernet fra favoritter`);
      }
    } else {
      // Tilføj produkt til liked liste
      setLikedProducts([...likedProducts, product]);
      if (showToast) {
        toast.success(`${product.title || product.name} tilføjet til favoritter`);
      }
    }
  };

  const isProductLiked = (product) => {
    if (!product) return false;
    
    // Hvis product er et objekt, tjek både ID og navn
    if (typeof product === 'object') {
      return likedProducts.some((item) => 
        (item.id && item.id === product.id) || 
        (item.name && item.name === product.name)
      );
    }
    
    // Hvis product er en string (ID eller navn), tjek mod alle items
    return likedProducts.some((item) => 
      item.id === product || item.name === product
    );
  };

  // Funktion til at fjerne alle liked produkter
  const clearLikedProducts = (showToast = true) => {
    setLikedProducts([]);
    if (showToast) {
      toast.success("Alle favoritter fjernet");
    }
  };

  return (
    <LikedProductsContext.Provider
      value={{
        likedProducts,
        toggleLike,
        isProductLiked,
        clearLikedProducts,
      }}
    >
      {children}
    </LikedProductsContext.Provider>
  );
}; 