  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { BackgroundGallery } from '../../components/BackgroundGallery/BackgroundGallery';
  import { apiService } from '../../services/apiService';




  export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // venter til alle er hentet
          const [ categoriesData] = await Promise.all([
            apiService.getCategories()
          ]);
          
          setCategories(categoriesData.slice(0, 6)); 
        } catch (error) {
          console.error('Fejl ved hentning af data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      );
    }
      
          return (
            <section className="min-h-screen bg-muted mb-4 mt-24">
             <h1>hej</h1>
      
              {/* Banner */}
              <section className=" w-full container h-[350px] mx-auto my-6 relative overflow-hidden duration-500 transform hover:scale-[1.02]">
                <BackgroundGallery isContained={true} />
              </section>
      
              {/* Populære */}
              <section className="container mx-auto pt-4">
              <div className="border-t-4 border-secondary mb-8"></div>
                <h2 className="text-3xl font-light text-black mb-8">Populære Kategorier</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 -mb-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/produkter/${category.slug}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <div className="p-3 bg-primary ">
                          <h3 className="font-light text-md underline text-white text-center">
                            {category.name}
                          </h3>
                        </div>
                        <div className=" h-40 bg-gray-200 flex items-center justify-center">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            </section>
          );
        };
      
