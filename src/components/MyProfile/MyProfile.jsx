import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { Trash2, Save, Check, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export const MyProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Profil formular tilstand
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    address: "",
    zipcode: "",
    phone: "",
    email: "",
    hasNewsletter: false,
    hasNotification: true,
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
      // "initialisering af state" 
      // jeg bruger setProfileForm til at opdatere state-variablen profileForm med værdier fra userData.
      setProfileForm({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        address: userData.address || "",
        zipcode: userData.zipcode || "",
        phone: userData.phone || "",
        email: userData.email || "",
        hasNewsletter: userData.hasNewsletter || false,
        hasNotification: userData.hasNotification !== false,
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
      const dataToSend = { 
        ...profileForm, 
        zipcode: profileForm.zipcode ? Number(profileForm.zipcode) : null,
      }; 
      await apiService.updateUser(user.id, dataToSend);
      toast.success("Profil opdateret");
    } catch (error) {
      console.error("Fejl ved opdatering af profil:", error);
      toast.error("Kunne ikke opdatere profil");
    }
  };

  // Slet profil med bekræftelse
  const handleDeleteProfile = async () => {
    if (!window.confirm("Er du sikker på at du vil slette din profil?")) {
      return;
    }
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
    <section className="mt-20 mx-auto">
      {/* Profile Form */}
      <div className="bg-white border border-gray-200 p-6 pb-10">
        <h2 className="text-xl font-normal text-black p-1 mb-6">
          Bruger Information
        </h2>

        <article className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* venstre */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Fornavn
              </label>
              <input
                type="text"
                value={profileForm.firstname}
                onChange={(e) =>
                  handleProfileChange("firstname", e.target.value)
                }
                placeholder="Dit navn..."
                className="w-full px-3 py-4 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>

            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Efternavn
              </label>
              <input
                type="text"
                value={profileForm.lastname}
                onChange={(e) =>
                  handleProfileChange("lastname", e.target.value)
                }
                placeholder="Dit efternavn..."
                className="w-full px-3 py-2 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>

            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Adresse
              </label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => handleProfileChange("address", e.target.value)}
                placeholder="Din adresse..."
                className="w-full px-3 py-2 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>

            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Postnummer
              </label>
              <input
                type="text"
                value={profileForm.zipcode}
                onChange={(e) => handleProfileChange("zipcode", e.target.value)}
                placeholder="Dit postnummer..."
                className="w-full px-3 py-2 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>

            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                placeholder="Dit telefon nummer..."
                className="w-full px-3 py-2 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>

            <div>
              <label className="block text-lg font-normal text-black mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                placeholder="Din email adresse..."
                className="w-full px-3 py-2 border-2 border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary bg-muted"
              />
            </div>
          </div>

          {/* højre */}
          <div className="flex-1 space-y-6 mt-6 lg:mt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <label
                  htmlFor="newsletter"
                  className="text-base lg:text-lg text-normal00 cursor-pointer"
                >
                  Jeg ønsker at modtage nyhedsbrev om klima-indsatsen, gode
                  tilbud, ekslusive deals og lignende promoverings-mails fra den
                  grønne avis og samarbejds-parnere?
                </label>
                <div className="relative mt-1.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={profileForm.hasNewsletter}
                    onChange={(e) =>
                      handleProfileChange("hasNewsletter", e.target.checked)
                    }
                    className="sr-only "
                  />
                  <label
                    htmlFor="newsletter"
                    className={`block w-6 h-6 border-2 rounded cursor-pointer transition-colors  ${
                      profileForm.hasNewsletter
                        ? "bg-secondary border-secondary"
                        : "border-gray-300 hover:border-secondary"
                    }`}
                  >
                     {profileForm.hasNewsletter && (
                       <Check className="w-4 h-4 text-white m-0.5" />
                     )}
                  </label>
                </div>
              </div>
              <br />
              <div className="flex items-start space-x-3">
                <label
                  htmlFor="notifications"
                  className="text-base lg:text-lg text-normal00 cursor-pointer"
                >
                  Jeg ønsker at modtage notifikationer i form af emails når der
                  sker en opdatering på en af mine annoncer eller jeg modtager
                  en ny henvendelse?
                </label>
                <div className="relative mt-1.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={profileForm.hasNotification}
                    onChange={(e) =>
                      handleProfileChange("hasNotification", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <label
                    htmlFor="notifications"
                    className={`block w-6 h-6 border-2 rounded cursor-pointer transition-colors ${
                      profileForm.hasNotification
                        ? "bg-secondary border-secondary"
                        : "border-gray-300 hover:border-secondary"
                    }`}
                  >
                     {profileForm.hasNotification && (
                       <Check className="w-4 h-4 text-white m-0.5" />
                     )}
                  </label>
                </div>
              </div>
            </div>

            {/* slet gem log ud */}
            <div className="pt-16 lg:pt-28 mx-auto max-w-lg space-y-5">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full px-6 py-3 bg-red-700 text-white hover:bg-red-800 transition-colors flex items-center justify-center rounded-lg shadow-md space-x-2"
              >
                <LogOut/>
                <span> Log ud </span>
              </button>

              <button
                onClick={handleSaveProfile}
                className="w-full px-6 py-3 bg-secondary text-white hover:bg-green-800 transition-colors flex items-center justify-center rounded-lg shadow-md space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Gem ændringer</span>
              </button>

              <button
                onClick={() => handleDeleteProfile(true)}
                className="w-full px-6 py-3 bg-black text-white transition-colors flex items-center justify-center rounded-lg shadow-2xl space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Slet profil</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};