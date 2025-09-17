import { useFilter } from "../../contexts/FilterContext"
import { LiaShoppingBagSolid, LiaLuggageCartSolid } from "react-icons/lia";
import { MdOutlineLuggage } from "react-icons/md";



export const FilterSideBar = () => {
    const {
            totalSeats,
            setTotalSeats,
            selectedPreferences, 
            togglePreference, 
            maxSeats,
            resetAllFilters
         } = useFilter()

    // det var nemmer at skrive dem end at fetche og det er aligevel et statisk input fra usern
    const bagSizeOptions = [
      { id: 1, name: 'Lille', icon: <LiaShoppingBagSolid />, value: 1 },
      { id: 2, name: 'Mellem', icon: <MdOutlineLuggage />, value: 2 },
      { id: 3, name: 'Stor', icon: <LiaLuggageCartSolid />, value: 3 },
    ];

    const comfortOptions = [
      { name: 'Højst to personer på bagsædet', value: 'hasComfort' },
    ];

    const preferenceOptions = [
      { name: 'Musik', value: 'allowMusic' },
      { name: 'Dyr', value: 'allowPets' },
      { name: 'Børn', value: 'allowChildren' },
      { name: 'Rygning', value: 'allowSmoking' },
    ];

    // value fra provider
    const isPreferenceActive = (value) => selectedPreferences.includes(value);

    const handleResetFilters = () => {
      resetAllFilters();
    };

    return (
        <aside className="w-full h-fit lg:w-64 p-4 bg-white rounded-lg shadow-md mb-8 mt-6 lg:mb-0">
            <div className="mb-5">
                <label htmlFor="total-seats-range" className="block text-lg font-medium text-gray-900 dark:text-white">Antal sæder: {totalSeats}</label>
                <input
                    id="total-seats-range"
                    type="range"
                    min="1"
                    max={maxSeats}
                    step="1"
                    name="totalSeats"
                    value={totalSeats}
                    // jeg bruger Number da det er en function som bruges til at sikre value er et nummer fra input (e.target.value)
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 text-secondary rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
                />
            </div>

            <div className="mb-5 border-y py-4 border-gray-200">
              <h3 className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Bagage</h3>
              <div className="grid grid-cols-3 gap-2">
                {bagSizeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => togglePreference(`bagSizeId_${option.value}`)}
                    className={`flex flex-col items-center justify-center p-2 rounded-md text-sm transition-colors duration-200 ${isPreferenceActive(`bagSizeId_${option.value}`) ? 'bg-secondary text-white' : ' text-gray-900 hover:bg-gray-200'}`}
                  >
                    <span className={`text-3xl ${isPreferenceActive(`bagSizeId_${option.value}`) ? 'text-white' : 'text-gray-400'}`}> {option.icon} </span>
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
                <h3 className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Komfort</h3>
                <div className="mt-2 space-y-2">
                  {comfortOptions.map((option) => (
                    // value er unikt ud fra vært ver muglighed
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                              type="checkbox"
                              checked={isPreferenceActive(option.value)}
                              onChange={() => togglePreference(option.value)}
                              className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out rounded focus:ring-primary-500"
                          />
                          <span className={`text-sm font-medium ${isPreferenceActive(option.value) ? 'text-primary-700' : 'text-gray-700'}`}>
                              {option.name}
                          </span>
                      </label>
                  ))}
                </div>
            </div>

            <div className="mb-5 border-y py-4 border-gray-200">
                <h3 className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Præferencer</h3>
                <div className="mt-2 space-y-2">
                  {preferenceOptions.map((option) => (
                     // value er unikt ud fra vært ver muglighed
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                              type="checkbox"
                              checked={isPreferenceActive(option.value)}
                              onChange={() => togglePreference(option.value)}
                              className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out rounded focus:ring-primary-500"
                          />
                          <span className={`text-sm font-medium ${isPreferenceActive(option.value) ? 'text-primary-700' : 'text-gray-700'}`}>
                              {option.name}
                          </span>
                      </label>
                  ))}
                </div>
            </div>

            <button
              onClick={handleResetFilters}
              className="w-full bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white text-xl py-4 px-4 font-semibold rounded-full hover:bg-primary transition duration-300"
            >
              Nulstil
            </button>
        </aside>


    )
}