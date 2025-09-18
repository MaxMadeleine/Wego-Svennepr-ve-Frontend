import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppLayout } from "./layouts/AppLayout";
import { AppRoutes } from "./components/AppRoute/AppRoute";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { FilterContextProvider } from "./contexts/FilterContext";
import { ToastProvider } from "./components/ui/ToastProvider";

function App() {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
  {/* Jeg vælger at have browser router her, da jeg ikke har brug for client routing over. Dette optimerer min ErrorBoundary, da React's lifecycle-fejl fanger ErrorBoundary først. */}
            <BrowserRouter>
              <FilterContextProvider>
              <ToastProvider>
                <AppLayout>
                  <AppRoutes />
                </AppLayout>
              </ToastProvider>
              </FilterContextProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
