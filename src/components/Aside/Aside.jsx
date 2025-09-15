import { useState, useEffect } from "react"
import { useFilter } from "../../contexts/FilterContext"
import { apiService } from "../../services/apiService"

export const FilterSideBar = () => {
    const { 
            price, 
            setPrice,
            isMember,
            setIsMember,
            selectedCategories = [],
            toggleCategory,
         } = useFilter()

    const [categories, setCategories] = useState([])
    const isCategoryActive = (slug) => selectedCategories.includes(slug);

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const categoriesResponse = await apiService.getCategories()
                setCategories(categoriesResponse || [])

                const productsResponse = await apiService.getProducts()
                setPrice(1500) // startpris til 50
            } catch (error) {
                console.error("Fejl ved hentning af data:", error)
            }
        }

        fetchCategoriesAndProducts()
    }, [setPrice]) // setPrice til dependency array

    return (
        <div>
            <div className="mb-5">
                <label>Pris: {price}</label>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    step="1"
                    name="price" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>
            <div className="flex gap-2 mb-5">
                <input
                    type="checkbox" 
                    name="isMember" 
                    checked={isMember}
                    value="1" 
                    onChange={(e) => setIsMember(e.currentTarget.checked)}
                />
                <label className={isMember ? 'text-green-400' : 'text-red-500'}>Kun for medlemmer</label>
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Kategorier:</label>
                <div className="mt-2 space-y-2">
                  {/* hvis cat lenght er over 0 show else  */}
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isCategoryActive(category.slug)}
                                    onChange={() => toggleCategory(category.slug)}
                                    className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out rounded focus:ring-primary-500"
                                />
                                <span className={`text-sm font-medium ${isCategoryActive(category.slug) ? 'text-primary-700' : 'text-gray-700'}`}>
                                    {category.name}
                                </span>
                            </label>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Ingen kategorier fundet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}