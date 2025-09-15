import styled from "styled-components";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem 1.5rem;
  background: #fafafa;
  color: #222;
  font-family: system-ui, sans-serif;
`;

export const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${fullConfig.theme.colors.secondary}; /* bruger Tailwind's  color */
`;

export const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin: 0.75rem 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

export const FooterNote = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
  margin-top: 2rem;
  text-align: center;
  color: ${fullConfig.theme.colors.secondary}; /* bruger Tailwind's  color */

`;
