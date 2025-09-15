import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext(null); 

// Custom hook til at bruge cart context
export const useCart = () => {
  const context = useContext(CartContext);
  // Tjekker, om CartContext er tilgængelig throw ellers error
  if (!context) {
    throw new Error('useCart skal bruges inden for en CartContextProvider');
  }
  return context;
};

export const CartContextProvider = ({ children }) => {
  // State til at holde styr på indkøbskurven
  const [cartData, setCartData] = useState([]);
  const addToCart = (product, showToast = true) => {
    // Tjekker, om produktet eksisterer og har enten et gyldigt ID eller navn.
    if (!product || (!product.id && !product.name)) {
      console.error('Produkt mangler både ID og navn:', product);
      toast.error("Kunne ikke tilføje produkt til kurven - mangler ID eller navn");
      return;
    }

    const existingProductIndex = cartData.findIndex((item) => 
      (item.id && item.id === product.id) || (item.name && item.name === product.name)
    );
    
    if (existingProductIndex !== -1) {
        // Hvis produktet allerede findes i kurven, opdateres antallet.
      const updatedCart = [...cartData];
      updatedCart[existingProductIndex].quantity = (updatedCart[existingProductIndex].quantity || 1) + 1;
      setCartData(updatedCart);
      if (showToast) {
        toast.success(`${product.title || product.name} antal øget i kurven`);
      }
    } else {
        // Hvis produktet ikke findes, tilføjes det som et nyt produkt.
      const productWithQuantity = { ...product, quantity: 1 };
      setCartData([...cartData, productWithQuantity]);
      if (showToast) {
        toast.success(`${product.title || product.name} tilføjet til kurven`);
      }
    }
  };
  

  const removeFromCart = (productIdentifier, showToast = true) => {
    const clone = [...cartData];
    // clone = bruger spread operater på cart data og putter ind i et nyt array
    const existingItem = cartData.find((item) => item.id === productIdentifier || item.name === productIdentifier);
    if (existingItem) {
      const index = cartData.findIndex((item) => item.id === productIdentifier || item.name === productIdentifier);
      // Reducerer antallet med 1, hvis produktet findes.
      if (clone[index].quantity && clone[index].quantity > 1) {
        // -= 1 så den opdatere variablen automatisk.
        clone[index].quantity -= 1;
        setCartData(clone);
        if (showToast) {
          toast.success(`${existingItem.title || existingItem.name} antal reduceret i kurven`);
        }
      } else {
        clone.splice(index, 1);
        setCartData(clone);
        if (showToast) {
          toast.success(`${existingItem.title || existingItem.name} fjernet fra kurven`);
        }
      }
    }
  };

  const removeProductFromCart = (productIdentifier, showToast = true) => {
    const clone = [...cartData];
    const productToRemove = clone.find((product) => {
      const matchesById = product.id && product.id === productIdentifier;
      const matchesByName = product.name && product.name === productIdentifier;
      return matchesById || matchesByName;
    });
    
    const filtered = clone.filter((product) => {
      const matchesById = product.id && product.id === productIdentifier;
      const matchesByName = product.name && product.name === productIdentifier;
      return !(matchesById || matchesByName);
    });
    
    setCartData(filtered);
    if (showToast && productToRemove) {
      toast.success(`${productToRemove.title || productToRemove.name} fjernet fra kurven`);
    }
  };

  const clearCart = (showToast = true) => {
    // Sætter cartData til en tom array, hvilket rydder kurven.
    setCartData([]);
    if (showToast) {
      toast.success("Indkøbskurv ryddet");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData, // Indeholder alle produkter i kurven.
        addToCart, 
        removeFromCart, 
        clearCart, 
        removeProductFromCart, // Updated function name
      }}
    >
      {children}
    </CartContext.Provider>
  );
};