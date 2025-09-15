# Den Grønne Avis - Marketplace Website

En React-website for Den Grønne Avis. Et moderne marketplace hvor brugere kan oprette og gennemse annoncer for produkter.

## Om Projektet

Den Grønne Avis er en digital platform der gør det nemt for brugere at sælge og købe produkter online. 
brugere kan oprette annoncer, gennemse kategorier og kommentere produkter og like dem

## Sidets funktioner

- **Forside**:  galleri med udvalgte produkter og populære kategorier
- **Produkter**: Visning af alle annoncer med kategorifilter og søgning
- **Produktdetaljer**: Detaljeret produktvisning med beskrivelse og kommentarer
- **Opret Annonce**: Mulighed for at oprette nye produktannoncer
- **Profil**: Administration af annoncer og kommentarer
- **Liked Produkter**: Gemte produkter som brugeren har liket
- **Login/Register**: Brugerregistrering og autentificering
- **Responsiv**: Desktop, tablet og mobil (tablet har været en mindre prioritet men virker super)

## Teknologier

- **Frontend**: React 19 + Vite
- **CSS**: TailwindCSS 3
- **State Management**: React Context
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React (Til Ui/shadcn)

## Instaler projekted

### Brug
- Node.js 18+ 
- npm

### Installation

git clone: https://github.com/MaxMadeleine/den-groenne-avis-frontend.git
cd den-groenne-avis-frontend

### Projekt variabler
Lav en `.env` fil i projektet og indsæt de regtige værdiger fra example.env (husk at instaler dotenv)

# Installer dependencies
npm install || npm i

# Start
npm run dev

# til produktion
npm run build || npm run preview


## Struktur

```
src/
├── components/           Komponenter
│   ├── Navigation/      Navigation med burger menu
│   ├── Aside/           Sidebar kategori
|   |__ Main             Main inholder main tag med children / siderne de bliver ændret
│   ├── Footer/          Footer med info og newsletter tilmelding
│   ├── ProductCard/     Produktkort komponent
│   ├── ProductDetails/  Produktdetaljer komponent
│   ├── CreatePoster/    Opret annonce komponent
│   ├── Profile/         Profil komponenter
│   └── ui/              UI komponenter (shadcn/ui)
|
├── pages/               Sider 
│   ├── SplashPage/      Startside med splash screen
│   ├── HomePage/        Forside med udvalgte produkter
│   ├── ProductPage/     Produkter og detailer
│   ├── CreatePosterPage/ Opret annonce side
│   ├── ProfilePage/min-profil   Profil administration
│   |── LikedProductsPage/ Likede produkter
|
├── contexts/            Context providers (Auth, LikedProducts)
├── hooks/               Cookie consent
├── services/            API service til prisma backend: axios og fetch
└── layouts/             AppLayout komponenter 
```

##  Design

Websitet design:
- Grøn og grå for brand og CTA farver (miljøvenlig tema)
- Responsivt grid-system
- Transitions og hover effects
- Semantisk korrekt HTML struktur (Nogle gange lidt svært med tailwind styling da jeg laver mange div'er for placering)

### Backend Integration
Websitet er lavet til at arbejde med en Prisma backend, i dette tilfælde:
- https://github.com/MaxMadeleine/den-groenne-avis-svendeproeve-2025

## Extra
- Backend er fuldt implementeret og bruger kun data fra API
- SEO 100%!!!! korrekte meta tags og semantisk HTML og en robots.txt til sagemaskiner

## Lavet af

Max Madeline - Techcollege Aalborg

Tak for at i vil kigge med =D