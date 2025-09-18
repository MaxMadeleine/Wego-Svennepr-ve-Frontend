import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { Trash2, Save } from "lucide-react";
import toast from "react-hot-toast";

export const MyProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

    // Profil formular state
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    imageUrl: "",
    description: "",
  });

    // Indlæs brugerdata når komponenten monteres
  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user?.id]);

  const loadUserData = async () => {
    try {
      const userData = await apiService.getUser(user.id);
           // initialisering af state
      // jeg bruger setProfileForm til at opdatere state-variablen profileForm med værdier fra userData.
      setProfileForm({
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
        imageUrl: userData?.imageUrl || "",
        description: userData?.description || "",
      });
    } catch (error) {
      console.error("Fejl ved hentning af brugerdata:", error);
      toast.error("Kunne ikke hente brugerdata");
    }
  };

    // field er navnet på det felt i porofile form der skal opdateres. jeg bruger det som et key name i objektet
  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await apiService.updateUser(user.id, profileForm);
      toast.success("Profil opdateret");
    } catch (error) {
      console.error("Fejl ved opdatering af profil:", error);
      toast.error("Kunne ikke opdatere profil");
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("Er du sikker på at du vil slette din profil?")) return;
    try {
      await apiService.deleteUser(user.id);
      toast.success("Profil slettet");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Fejl ved sletning af profil:", error);
      toast.error("Kunne ikke slette profil");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={profileForm.imageUrl || "https://via.placeholder.com/150"}
            alt="Profilbillede"
            className="w-28 h-28 rounded-full object-cover border border-gray-200 shadow-sm mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            {profileForm.firstname} {profileForm.lastname}
          </h1>
          <p className="text-gray-500 text-sm">{profileForm.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fornavn
              </label>
              <input
                type="text"
                value={profileForm.firstname}
                onChange={(e) => handleProfileChange("firstname", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Efternavn
              </label>
              <input
                type="text"
                value={profileForm.lastname}
                onChange={(e) => handleProfileChange("lastname", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profilbillede URL
            </label>
            <input
              type="text"
              value={profileForm.imageUrl}
              onChange={(e) => handleProfileChange("imageUrl", e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Beskrivelse
            </label>
            <textarea
              rows="4"
              value={profileForm.description}
              onChange={(e) =>
                handleProfileChange("description", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
             type="button"
             onClick={handleSaveProfile}
             className="w-full h-14 bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
           >
             <Save className="w-5 h-5" />
             Gem ændringer
           </button>
           <button
             type="button"
             onClick={handleDeleteProfile}
             className="w-full h-14 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
           >
             <Trash2 className="w-5 h-5" />
             Slet profil
           </button>
          </div>
        </form>
      </div>
    </section>
  );
};
