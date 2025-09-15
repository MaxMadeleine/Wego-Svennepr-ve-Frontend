import { useState, useEffect } from "react";
import { useFilter } from "../../contexts/FilterContext";
import { ProductCard } from "../ProductCard/ProductCard";
import { apiService } from "../../services/apiService";
import { Search } from "../Search/Search";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { selectedCategories = [], price, isMember } = useFilter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let fetchedProducts = [];
        // chekker opm det er array og er over 0
        if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
          // Mapper over de valgte kategorier (selectedCategories) og laver et API-kald for hver kategori (slug) 
          const categoryProductPromises = selectedCategories.map(slug =>
            apiService.getProductsByCategory(slug)
          );
          // sørger for at alle cat proesis er fetched f
          const results = await Promise.all(categoryProductPromises);
          // Kombinerer resultater og fjerner dubletter (hvis et produkt tilhører flere valgte kategorier)
          const combinedProducts = results.flat();
          const uniqueProducts = Array.from(
            new Map(combinedProducts.map(product => [product.id, product])).values()
          );
          fetchedProducts = uniqueProducts;
        } else {
          // Henter alle produkter, hvis ingen kategorier er valgt
          fetchedProducts = await apiService.getProducts();
        }

        // Filtrerer produkter baseret på søgeforespørgsel
        const searchedProducts = fetchedProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(searchedProducts || []);
      } catch (error) {
        console.error("Fejl ved hentning af produkter baseret på filtre:", error);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, searchQuery]); // Afhænger af selectedCategories og searchQuery

  // Filtrerer produkter yderligere baseret på pris og medlemskab
  const filteredProducts = products.filter((product) => {
    if (Number(product.price) > price) return false;

    // Tilføjer filter for medlemskab
    if (isMember && !product.isMemberProduct) return false;

    return true;
  });

  return (
    <div className="p-4 flex-1">
      {/* Søgekomponent */}
      <Search
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        className="mb-4"
      />
      <h2 className="text-xl font-bold mb-4">Produkter</h2>
      {/* Viser en besked, hvis ingen produkter matcher */}
      {filteredProducts.length === 0 ? (
        <p>Ingen produkter matcher dine filtre.</p>
      ) : (
        // Viser produkter i et grid
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};