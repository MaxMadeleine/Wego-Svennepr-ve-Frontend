import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const [price, setPrice] = useState(15);
    const [isMember, setIsMember] = useState(false);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Funktion til at tilføje eller fjerne en kategori fra de valgte kategorier
    const toggleCategory = (categorySlug) => {
        setSelectedCategories((prevCategories) => {
            // Hvis kategorien allerede er valgt, fjernes den
            if (prevCategories.includes(categorySlug)) {
                return prevCategories.filter((slug) => slug !== categorySlug);
            } else {
                // Hvis kategorien ikke er valgt, tilføjes den
                return [...prevCategories, categorySlug];
            }
        });
    };

    useEffect(() => {
        const fetchMaxPrice = async () => {
            try {
                const products = await apiService.getProducts();
                if (products && products.length > 0) {
                    // Finder den højeste pris blandt produkterne
                    const highestPrice = Math.max(...products.map(p => Number(p.price)), 0);
                    setMaxPrice(highestPrice); // Opdaterer maxPrice med den højeste pris
                    setPrice(highestPrice); // Sætter den initiale pris til maxPrice
                }
            } catch (error) {
                console.error("Fejl ved hentning af produkter for max pris:", error);
            }
        };
        fetchMaxPrice(); // Kører funktionen én gang, når komponenten mountes
    }, []); // Tom dependency array så den kører en gang

    return (
        <FilterContext.Provider value={{
            // Gør state og funktioner tilgængelige
            price,
            setPrice,
            isMember,
            setIsMember,
            maxPrice,
            setMaxPrice,
            selectedCategories,
            setSelectedCategories,
            toggleCategory,
        }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook til at bruge FilterContext
export const useFilter = () => {
    const ctx = useContext(FilterContext);
    // Smider en fejl, hvis hooket bruges uden for en FilterContextProvider
    if (!ctx) throw new Error("useFilter skal bruges inden for <FilterProvider>");
    return ctx;
};