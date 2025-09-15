// src/pages/CookiePage.jsx
import React from "react";
import {
  PageWrapper,
  ContentContainer,
  Title,
  Section,
  FooterNote,
} from "./CookiePage.js";

export const CookiePage = () => {
  return (
    <PageWrapper>
      <ContentContainer>
        <Title>Cookiepolitik</Title>

        <Section>
          <h2>1. Hvad er cookies?</h2>
          <p>
            Cookies er små tekstfiler, som gemmes på din enhed, når du besøger en
            hjemmeside. De hjælper os med at levere en bedre brugeroplevelse, fx ved at
            huske dine indstillinger.
          </p>
        </Section>

        <Section>
          <h2>2. Typer af cookies vi bruger</h2>
          <ul>
            <li><strong>Nødvendige:</strong> kræves for at websitet fungerer korrekt.</li>
            <li><strong>Statistik:</strong> hjælper os med at forstå hvordan siden bruges.</li>
            <li><strong>Præferencer:</strong> gemmer dine valg og indstillinger.</li>
            <li><strong>Marketing:</strong> bruges til at vise relevante annoncer.</li>
          </ul>
        </Section>

        <Section>
          <h2>3. Sådan administrerer du cookies</h2>
          <p>
            Du kan altid ændre eller fjerne cookies gennem dine browserindstillinger. Vær
            opmærksom på at nogle funktioner kan blive begrænset, hvis du blokerer
            nødvendige cookies.
          </p>
        </Section>

        <Section>
          <h2>4. Kontakt</h2>
          <p>
            Hvis du har spørgsmål til vores cookiepolitik, er du velkommen til at kontakte
            os på <a href="mailto:info@example.com">info@example.com</a>.
          </p>
        </Section>

        <FooterNote>
          Sidst opdateret: September 2025
        </FooterNote>
      </ContentContainer>   
    </PageWrapper>
  );
}
