import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppLayout } from "./layouts/AppLayout";
import { AppRoutes } from "./components/AppRoute/AppRoute";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { FilterContextProvider } from "./contexts/FilterContext";

function App() {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
  {/* Jeg vælger at have browser router her da jeg ikke har brug for client routing over. og det optimere min ErrorBoundary da react lifecycle errors fanger errorBoundary først */}
            <BrowserRouter>
              <FilterContextProvider>
                <AppLayout>
                  <AppRoutes />
                </AppLayout>
              </FilterContextProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
