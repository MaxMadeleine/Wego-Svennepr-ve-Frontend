import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiService } from "../../services/apiService";
import toast from "react-hot-toast";
import { TripInfoBox } from "../TripInfoBox/TripInfoBox";
import { useAuth } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

export const BookTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await apiService.getTrip(id);
        setTrip(data);
      } catch (error) {
        console.error("Error fetching trip details:", error);
        toast.error("Kunne ikke hente turdetaljer.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const onSubmit = async (data) => {
    if (!user || !user.id) {
      toast.error("Du skal være logget ind for at booke en tur.");
      return; // returnerer her så booking ikke fortsætter
    }

    try {
      const bookingData = {
        tripId: trip.id,
        userId: user.id,
        numSeats: selectedSeats,
        comment: data.messageToDriver, // når man submitter ryger alt data fra react hook form i data variablen og jeg passer messagdetodriver til comment da backenden bruger bookings.com,ent
      };

      await apiService.createBooking(bookingData);
      toast.success("Tur booket!");
      navigate(`/find-lift/${trip.id}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Kunne ikke booke turen.");
    }
  };

  if (loading) {
    return  <ClipLoader size={50} color="secondary" />
  }

  // generere en liste af options ud fra ledige sæder
  const generateSeatOptions = () => {
    const availableSeats = trip.seatsTotal - trip.seatsBooked;
    const seatArray = Array.from({ length: availableSeats });  // laver et array hvor lænden er ledige sæder
    // map ignorere _ value og bruger index til sædenummeret så der bliver lavet en option ud fra index
    const seatOptions = seatArray.map((_, index) => {
      const seatNumber = index + 1; // Sædenummer starter fra 1
      return (
        <option key={seatNumber} value={seatNumber}>
          {seatNumber} {/* Viser sædenummeret som tekst */}
        </option>
      );
    });

    // Returnerer listen af <option>-elementer
    return seatOptions;
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 3 column layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* tilbage knap*/}
          <div className="col-span-12 lg:col-span-1">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              aria-label="Gå tilbage"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* midt column */}
          <article className="col-span-12 lg:col-span-7 bg-white rounded-3xl shadow-sm p-6">
            <header>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Book et lift
              </h1>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Pladser */}
              <section>
                <label
                  htmlFor="seats"
                  className="block text-lg font-normal text-gray-800 mb-3"
                >
                  Pladser
                </label>
                <div className="relative">
                  <select
                    id="seats"
                    // splitter register og siger seats har dette object som value
                    {...register("seats", {
                      required: "Vælg venligst antal pladser",
                      valueAsNumber: true,
                      min: 1,
                      max: trip.seatsTotal - trip.seatsBooked,
                    })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm appearance-none"
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(e.target.value)}
                  >
                    {generateSeatOptions()}
                  </select>
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ArrowDown className="w-5 h-4"/>
                  </span>
                  {errors.seats && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.seats.message}
                    </p>
                  )}
                </div>
              </section>

              {/* Besked til chauffør */}
              <section>
                <label
                  htmlFor="messageToDriver"
                  className="block text-lg font-normal text-gray-800 mb-3"
                >
                  Besked til {trip.user?.firstname || "chaufføren"}
                </label>
                <textarea
                  id="messageToDriver"
                  {...register("messageToDriver")}
                  rows="4"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="Skriv en besked til chaufføren..."
                ></textarea>
              </section>

              {/* Kortoplysninger placeholder */}
              <section>
             
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-normal text-gray-700 mb-1"
                    >
                      Kortnummer
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      {...register("cardNumber", {
                        required: "Kortnummer er påkrævet",
                        pattern: {
                          value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                          message: "Ugyldigt kortnummer",
                        },
                      })}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                      placeholder="1234 1234 1234 1234"
                    />
                    {errors.cardNumber && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-normal text-gray-700 mb-1"
                      >
                        Udløbsdato
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        {...register("expiryDate", {
                          required: "Udløbsdato er påkrævet",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: "Ugyldig udløbsdato (MM/ÅÅ)",
                          },
                        })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        placeholder="MM/ÅÅ"
                      />
                      {errors.expiryDate && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-normal text-gray-700 mb-1"
                      >
                        CVC-kode
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        {...register("cvc", {
                          required: "CVC er påkrævet",
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: "Ugyldig CVC-kode",
                          },
                        })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                        placeholder="CVC"
                      />
                      {errors.cvc && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.cvc.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full text-lg py-3 px-28 rounded-3xl mt-8 font-normal bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300"
              >
                Book & betal
              </button>
            </form>
          </article>

          <aside className="col-span-12 lg:col-span-4 lg:sticky top-36 self-start">
            <TripInfoBox trip={trip} selectedSeats={selectedSeats} />
          </aside>
        </div>
    </section>
  );
};
