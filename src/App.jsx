import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppLayout } from "./layouts/AppLayout";
import { AppRoutes } from "./components/AppRoute/AppRoute";
import { ToastProvider } from "./components/ui/ToastProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { CartContextProvider } from "./contexts/CartContext";
import { FilterContextProvider } from "./contexts/FilterContext";

function App() {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
        <FilterContextProvider>
          <ToastProvider>
  {/* Jeg vælger at have browser router her da jeg ikke har brug for client routing over. og det optimere min ErrorBoundary da react lifecycle errors fanger errorBoundary først */}
            <BrowserRouter>
              <AppLayout>
                <AppRoutes />
              </AppLayout>
            </BrowserRouter>
          </ToastProvider>
        </FilterContextProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
