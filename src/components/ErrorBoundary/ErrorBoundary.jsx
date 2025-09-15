import React from "react";

// React.Component er en base class/standart class som giver adgang til at bruge react´s lifecycle metoder og state´s for error handling.
export class ErrorBoundary extends React.Component {
  // Constructor bruges til at initialisere lokal state og binde event handlers i en class component.
  constructor(props) {
    // Når jeg kalder super(props) i en class component, sender jeg de props, som parent-component har givet til den aktuelle component (aktuelle = den component den er igang med at loade), videre til React.Component. Derefter initialisere this.props, så du kan bruge dem i din Component.
    super(props);
    //this.state Initialiserer ErrorBoundary interne state
    this.state = {
      hasError: false,
      //error og errorInfo Indeholder selve fejlen, som jeg kan bruge til debugging eller visning af en fejlbesked.
      error: null,
      errorInfo: null,
    };
  }

  // getDerivedStateFromError er en static method der automatisk bliver kaldt af react runtime engine når en error opstår i child components
  static getDerivedStateFromError(error) {
    // Opdater state så næste render viser fallback UI i stedet for den crashede component
    return { hasError: true };
  }

  // componentDidCatch er lifecycle error handling method der bliver kaldt af react runtime engine efter at getDerivedStateFromError er blevet kaldt. Bruges til logging og error reporting
  // Den modtager error og errorInfo som parametre og kan opdatere state
  componentDidCatch(error, errorInfo) {
    console.error("Fejl fanget af boundary:", error, errorInfo);
    this.setState({
      error: error, // error object
      errorInfo: errorInfo, // Stack trace og component info
    });
  }
  
  // render method er den eneste requried method der skal være i et class component
  render() {
    if (this.state.hasError) {
      return (
        <section className="flex items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-gray-50">
          <article className="max-w-2xl w-full p-16 rounded-xl shadow-2xl border text-center space-y-8 bg-white dark:bg-neutral-800 text-black dark:text-gray-50 border-gray-300 dark:border-neutral-700">
            <header>
              <figure className="relative mx-auto mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl animate-bounce bg-red-600 dark:bg-red-400 text-white dark:text-gray-50">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-2.5L13.73 4a1.93 1.93 0 00-2.73 0L3.34 16.5C2.57 17.33 3.53 19 5.07 19z"
                    />
                  </svg>
                </div>
                <span className="absolute inset-0 w-24 h-24 rounded-full animate-ping opacity-20 bg-red-600 dark:bg-red-400" />
              </figure>

              <h1 className="text-4xl font-bold pb-6 text-red-600 dark:text-red-400">
                Oops! Noget gik galt
              </h1>
              <p className="text-lg pb-4 text-gray-500 dark:text-gray-400">
                En uvented fejl kom. Prøv igen eller kontakt support.
              </p>
            </header>

            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                // Jeg kan ikke bruge navigate eller Link da jeg er udenfor browserruuter
                onClick={() => {
                  window.history.back();
                  setTimeout(() => window.location.reload(), 100);
                }}
                className="px-12 py-4 rounded-lg transition transform hover:scale-105 text-base font-medium h-12 flex items-center justify-center bg-gray-100 dark:bg-neutral-600 text-black dark:text-gray-50"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Gå Tilbage
                </span>
              </button>

              <button
                onClick={() => (window.location.href = "/kontakt")}
                className="px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 text-base font-medium h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Kontakt Support
                </span>
              </button>
            </nav>

            <footer className="max-w-md mx-auto text-center p-4 rounded-lg text-base bg-gray-100 dark:bg-neutral-600 text-gray-500 dark:text-gray-400">
              <strong className="text-black dark:text-gray-50">Tip:</strong>{" "}
              Refresh siden eller ryd din cache.
            </footer>
          </article>
        </section>
      );
    }

    return this.props.children;
  }
}