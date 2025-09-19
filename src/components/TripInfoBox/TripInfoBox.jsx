import { formatDate } from "@/lib/utils";

export const TripInfoBox = ({ trip, selectedSeats }) => {
  
    if (!trip) {
        return <section className="bg-white rounded-3xl shadow-sm p-6 text-center text-gray-500">Der er ingen turinformation...</section>;
    }

    const totalPrice = (selectedSeats * trip.pricePerSeat).toFixed(2);

    return (
         <section className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{trip.cityDeparture} → {trip.cityDestination}</h3>
              
              <div className="flex flex-col space-y-2">
              <p className="text-gray-700">Dato: {formatDate(trip.departureDate, 'da-DK', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-gray-700">Antal sæder: {selectedSeats}</p>
              </div>
        
              <div className="flex justify-between items-center my-6 pt-4 border-t border-gray-200">
                <p className="text-lg font-medium text-gray-900">Samlet pris</p>
                <p className="text-xl font-bold text-gray-900">DKK {totalPrice}</p>
              </div>
       
            </section>
    )
}