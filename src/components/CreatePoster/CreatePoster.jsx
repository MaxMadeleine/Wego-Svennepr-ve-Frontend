import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/apiService";
import toast from "react-hot-toast";

export const CreatePoster = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm();
  
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

    // Fetch categories fra backend
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setCategoriesError(null);
      const data = await apiService.getCategories();
      setCategory(data);
    } catch (error) {
      console.error('Fejl ved indlæsning af kategori:', error);
      setCategoriesError('Fejl ved indlæsning af kategori');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    if (!user?.id) {
      alert('Du skal være logget ind for at oprette en annonce');
      return;
    }

    setIsSubmitting(true);
    
    try { // konvertere til de korrekte typer før oprettelse
      const productData = {
        name: data.name,
        categoryId: parseInt(data.category),
        description: data.description,
        image: data.imageUrl,
        price: parseFloat(data.price)
      };

      const newProduct = await apiService.createProduct(productData);
      
      toast.success('Din annonce er nu aktiv!');
      
      // sender dig til product details page
      navigate(`/produkter/detaljer/${newProduct.slug}`);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Der opstod en fejl ved oprettelse af annoncen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="min-h-screen py-4 sm:py-8 px-4">
      <section className=" mx-auto  p-4 sm:p-8">
        <h1 className="text-2xl sm:text-6xl font-normal text-foreground mb-8 text-center ">
          Opret ny annonce
        </h1>
        
        <header className="text-center text-foreground mb-6 sm:mb-8 space-y-1 text-xl sm:text-xl">
          <p>Her kan du oprette en ny annonce.</p>
          <p>Du har mulighed for at slette dine annoncer igen under "min konto" siden</p>
        </header>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-10">
          {/* Titel */}
          <div>
            <label htmlFor="name" className="block text-lg font-normal text-foreground mb-2">
              Titel *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Title på dit produkt........"
              className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-primary transition-all"
              {...register("name", { 
                required: true, 
                minLength: 3,
                maxLength: 100 
              })}
            />
            
            {errors.name?.type === 'required' && ( // /   ?. optional chaining      && logical AND
              <p className="text-red-500 text-lg mt-1">Du skal udfylde titlen</p>
            )}
            {errors.name?.type === 'minLength' && (
              <p className="text-red-500 text-lg mt-1">Titlen skal være mindst 3 tegn</p>
            )}
            {errors.name?.type === 'maxLength' && (
              <p className="text-red-500 text-lg mt-1">Titlen må maksimalt være 100 tegn</p>
            )}
          </div>

          {/* Kategori */}
          <section>
            <label htmlFor="category" className="block text-lg font-normal text-foreground mb-2">
              Kategori *
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-primary transition-all appearance-none"
              disabled={isLoading}
              {...register("category", { 
                required: true,
                validate: value => value !== ""
              })}
            >
              <option value="">
                {isLoading ? "Indlæser kategori..." : "Hvilken kategori tilhører dit produkt........"}
              </option>
              {category.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-lg mt-1">Du skal vælge en kategori</p>
            )}
            {categoriesError && (
              <div className="mt-2">
                <p className="text-red-500 text-lg mb-2">{categoriesError}</p>
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesError(null);
                    fetchCategories();
                  }}
                  className="text-lg text-primary hover:text-primary/80 underline"
                >
                  Prøv igen
                </button>
              </div>
            )}
          </section>

          {/* Annonce tekst */}
          <div>
            <label htmlFor="description" className="block text-lg font-normal text-foreground mb-2">
              Annonce tekst *
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Skriv en annonce tekst her der beskriver produktet"
              className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-primary transition-all resize-vertical"
              {...register("description", { 
                required: true,
                minLength: 10,
                maxLength: 1000
              })}
            />
            {errors.description?.type === 'required' && (
              <p className="text-red-500 text-lg mt-1">Du skal skrive en beskrivelse</p>
            )}
            {errors.description?.type === 'minLength' && (
              <p className="text-red-500 text-lg mt-1">Beskrivelsen skal være mindst 10 tegn</p>
            )}
            {errors.description?.type === 'maxLength' && (
              <p className="text-red-500 text-lg mt-1">Beskrivelsen må maksimalt være 1000 tegn</p>
            )}
          </div>

          {/* Billede URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-lg font-normal text-foreground mb-2">
              URL til billede *
            </label>
            <input
              id="imageUrl"
              type="url"
              placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
              className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-primary transition-all"
              {...register("imageUrl", {
                required: true,
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: "Indtast en gyldig billed-URL (jpg, png, gif, webp)"
                }
              })}
            />
            {errors.imageUrl?.type === 'required' && (
              <p className="text-red-500 text-lg mt-1">Du skal angive en billed-URL</p>
            )}
            {errors.imageUrl?.type === 'pattern' && (
              <p className="text-red-500 text-lg mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Pris */}
          <div>
            <label htmlFor="price" className="block text-lg font-normal text-foreground mb-2">
              Pris *
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Pris....."
              className="w-full px-4 py-3 bg-muted border-2 border-secondary/70 focus:outline-none focus:border-primary transition-all"
              {...register("price", { 
                required: true,
                min: 0,
                max: 90000000
              })}
            />
            {errors.price?.type === 'required' && (
              <p className="text-red-500 text-lg mt-1">Du skal angive en pris</p>
            )}
            {errors.price?.type === 'min' && (
              <p className="text-red-500 text-lg mt-1">Prisen skal være mindst 0 kr.</p>
            )}
            {errors.price?.type === 'max' && (
              <p className="text-red-500 text-lg mt-1">Prisen må ikke overstige 9.000.000 kr.</p>
            )}
          </div>

          {/* Submit knap */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="bg-secondary hover:bg-secondary/90 text-white text-lg font-light py-3 px-4 sm:px-16 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmitting ? 'Opretter...' : 'Opret'}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}