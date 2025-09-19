# WeGo - Bæredygtig Samkørsel (Svendeprøve September 2025)

En React-website for WeGo, en online service der tilbyder bæredygtig samkørsel til registrerede brugere. Brugere kan søge og booke ture med forskellige præferencer til en given destination.

## Om Projektet

WeGo er en digital platform, der gør det nemt for brugere at finde og booke samkørselsture. Projektet er udviklet som en svendeprøve i september 2025.

**Frontend Repo**: https://github.com/MaxMadeleine/Wego-Svennepr-ve-Frontend
**Backend Repo**: https://github.com/MaxMadeleine/wego-svendeproeve-september-2025
**Hostede Side**: https://wego-eight.vercel.app/

### Mine Login Oplysninger
- **Brugernavn**: info@webudvikler.dk
- **Adgangskode**: password

## Sidens Funktioner

- **Forside**: Et slideshow med billeder og tekst fra API'et.
- **Find et lift**: Søgefelt, filtrering af ture (antal pladser, bagage, komfort, præferencer), og visning af tilgængelige ture.
- **Lift detaljer**: Detaljeret information om turen, chaufføren, præferencer, kommentarer, anmeldelser og bookingmuligheder.
- **Book et lift**: Formular til booking af ture med betalingsoplysninger (fiktiv brug).
- **Sådan virker det**: Brugervejledning i et modalt vindue, hentet fra API'et.
- **Login/Register**: Brugerregistrering og autentificering.
- **Min side**: Administration af egne bookings, reviews og profil.
- **Responsiv**: Designet til desktop og mobil.

## Teknologier

- **Frontend**: React 19 + Vite
- **CSS**: TailwindCSS 3 (med custom config)
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **HTTP-requests**: Axios (til authService.js) og Fetch (til apiService.js)
- **Pagination**: react pragnite (til lift liste)
- **Analytics**: Google Analytics

## Installation

### Brug
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/MaxMadeleine/Wego-Svennepr-ve-Frontend.git
cd Wego-Svennepr-ve-Frontend
```

### Projekt variabler
Lav en `.env` fil i projektet og indsæt de rette værdier fra .env.example (husk at installere dotenv hvis nødvendigt).

```bash
# Installer dependencies
npm install || npm i

# Start
npm run dev

# Til produktion
npm run build || npm run preview
```

## Struktur

src/
├── components/           
│   ├── AppRoute/
│   ├── Aside/
│   ├── BackgroundGallery/
│   ├── Cookie/
│   ├── ErrorBoundary/
│   ├── Footer/
│   ├── InfoModal/
│   ├── Login/
│   ├── Main/
│   ├── MyBookings/
│   ├── MyProfile/
│   ├── MyReviews/
│   ├── Navigation/
│   ├── ProfileCard/
│   ├── ProfileReviews/
│   ├── ProtectedRoute/
│   ├── Register/
│   ├── SeatsSection/
│   ├── StarRating/
│   ├── TripBooking/
│   ├── TripCard/
│   ├── TripDetails/
│   ├── TripFilter/
│   ├── TripInfoBox/
│   ├── TripList/
│   └── ui/               
│
├── pages/                
│   ├── CookiePage/
│   ├── LoginPage/
│   ├── NotFoundPage/
│   ├── ProfilePage/
│   ├── RegisterPage/
│   ├── SplashPage/
│   ├── TermsOfServicePage/
│   └── TripPage/
│
├── contexts/            Context providers (AuthContext, FilterContext)
├── hooks/               useCookieConsent
├── services/            API service (apiService.js, authService.js)
└── layouts/             AppLayout
```

## Design

Websitet design:
- Mørkeblå og blå farver for brand og CTA
- Responsivt grid-system
- Transitions og hover effekter
- Semantisk korrekt HTML struktur (med enkelte `div` elementer til Tailwind styling)
- Fokus på desktop og mobil (tablet som sekundær prioritet).


**Navn**: Max Lund Madeleine
**Hold**: H1WE080124