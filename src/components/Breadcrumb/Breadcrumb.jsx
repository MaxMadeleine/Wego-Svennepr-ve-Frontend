import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumb = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    // Opdel URL'en i segmenter ved at splitte den på '/'.
    // Filtrer derefter segmenterne for at fjerne tomme strenge (dvs. undgå segmenter, der er '').

    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs = [];
    
    breadcrumbs.push({
      name: 'Forside',
      path: '/',
      isHome: true
    });
    
    // Byg breadcrumb items
    // Initialiser en tom streng til at holde den aktuelle sti.
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      // Tilføj det aktuelle segment til currentPath med en '/' foran.
      currentPath += `/${segment}`;
      
      // Split segmentet på '-' for at opdele det i ord.
      // Gør første bogstav i hvert ord stort og resten småt.
      // Samler ordene igen med mellemrum imellem.
      const readableName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Tilføj et nyt breadcrumb-objekt til breadcrumbs-arrayet:
      // stien før til dette segment.
      // siger om dette segment er det sidste i pathSegments.
      breadcrumbs.push({
        name: readableName,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <section className="  mt-2 py-2   ">
    <div className="flex items-center space-x-1 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        // React.Fragment gruppere elementer uden at tilføje ekstra dom elementer.
        <React.Fragment key={breadcrumb.path}>
          {/* ChevronRight-ikon mellem breadcrumbs undtagen første */}
          {index > 0 && (
            <ChevronRight className="w-3 h-3 text-gray-400" />
          )}
          
          {/* Hvis breadcrumb er det sidste i rækken */}
          {breadcrumb.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {/* Hvis breadcrumb er forside, vis et Home-ikon */}
              {breadcrumb.isHome && <Home className="w-3 h-3 inline mr-1" />}
              {breadcrumb.name}
            </span>
          ) : (
            // Hvis det ikke er det sidste breadcrumb, gør det klikbart med et Link
            <Link
              to={breadcrumb.path}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center"
            >
              {breadcrumb.isHome && <Home className="w-3 h-3 mr-1" />}
              {breadcrumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
  );
};