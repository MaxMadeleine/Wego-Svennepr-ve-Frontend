import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService";
import { Star, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from '../../lib/utils';

// Opretter et array med 5 elementer, som kan mappes over.
// `map` looper indeks 0-4, og `onChange` tager stjernens indeks i arrayet + 1.
        
const StarRating = ({ rating, onChange, editable = false }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        onClick={editable ? () => onChange?.(index+ 1) : undefined}
        className={`w-5 h-5 ${
          index< rating ? "text-yellow-400" : "text-gray-300"
        } ${editable ? "cursor-pointer hover:scale-110 transition" : ""}`}
        fill="currentColor"
      />
    ))}
    <span className="text-gray-600 text-sm ml-2">({rating}/5)</span>
  </div>
);

export const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ rating: 0, comment: "" }); // verdi er sat til tom fra start


// Tjekket `if (user?.id)` sikrer, at funktionen kun kaldes, hvis brugeren er logget ind og har et gyldigt id.
// `dependency array` kører igen, hvis bruger-ID'et ændrer sig. Komponenten herunder fungerer lidt ligesom en breaker.
useEffect(() => {
  if (user?.id) fetchReviews();
}, [user?.id]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      setReviews(await apiService.getMyWrittenReviews());
    } catch {
      toast.error("Kunne ikke hente dine anmeldelser");
    } finally {
      setLoading(false);
    }
  };

const saveEdit = async (id) => {
  try {
    // Opdaterer anmeldelsen med nye værdier fra formularen.
    await apiService.updateReview(id, {
      numStars: form.rating, // Ny stjernerating.
      comment: form.comment, // Ny kommentar.
      reviewedUserId: reviews.find((r) => r.id === id)?.reviewedUserId, // Bevarer `reviewedUserId` fra den eksisterende anmeldelse.
    });
    toast.success("Anmeldelse opdateret");
    setEditingId(null);
    setForm({ rating: 0, comment: "" });
    fetchReviews(); // Opdaterer anmeldelser.
  } catch {
    toast.error("Kunne ikke opdatere anmeldelse");
  }
};

const deleteReview = async (id) => {
  if (!confirm("Er du sikker på at du vil slette denne anmeldelse?")) return;
  try {
    await apiService.deleteReview(id);
    toast.success("Anmeldelse slettet");
    // Opdaterer anmeldelserne ved at fjerne den anmeldelse, der har det samme ID. `filter` returnerer en ny liste, der indeholder de anmeldelser, hvor ID'et ikke matcher det slettede ID.
    setReviews((prev) => prev.filter((r) => r.id !== id)); 
  } catch {
    toast.error("Kunne ikke slette anmeldelse");
  }
};

  return (
    <section className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Mine Anmeldelser
        </h2>
        <p className="text-center mt-2 text-gray-600">
          {reviews.length} anmeldelser
        </p>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : reviews.length === 0 ? (
          // Empty state
          <p className="text-center py-16 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            Ingen anmeldelser endnu
          </p>
        ) : (
          // Review list
          <section className="space-y-6 mt-8">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
              >
                {editingId === r.id ? (
                  <div className="space-y-4">
                    <StarRating
                      rating={form.rating}
                      onChange={(val) => setForm((f) => ({ ...f, rating: val }))}
                      editable
                    />
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, comment: e.target.value }))
                      }
                      rows="5"
                      className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50"
                      placeholder="Opdater din anmeldelse..."
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        Annuller
                      </button>
                      <button
                        onClick={() => saveEdit(r.id)}
                        className="px-5 py-2 bg-secondary text-white rounded-xl hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition"
                      >
                        Gem ændringer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Reviewer info */}
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start md:w-1/3 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            r.reviewer?.imageUrl ||
                            "https://via.placeholder.com/150"
                          }
                          alt=""
                          className="w-12 h-12 rounded-full border object-cover"
                        />
                        <div>
                          <p className="font-semibold">
                            {r.reviewer
                              ? `${r.reviewer.firstname} ${r.reviewer.lastname}`
                              : "Ukendt"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(r.createdAt)}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={r.numStars} />
                    </div>

                    {/* Comment + actions */}
                    <div className="flex-1 space-y-4">
                      <p className="bg-gray-100 p-4 rounded-xl text-gray-800">
                        {r.comment}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingId(r.id);
                            setForm({ rating: r.numStars, comment: r.comment });
                          }}
                          className="px-4 py-2 bg-secondary text-white rounded-xl flex items-center gap-2 hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition"
                          >
                          <Edit className="w-4 h-4" /> Rediger
                        </button>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 transition"
                        >
                          <Trash2 className="w-4 h-4" /> Slet
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};
