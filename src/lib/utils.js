import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
   // Konverterer den givne dato til et Date-objekt
  const date = new Date(dateString);
  const today = new Date();  // vis datoen er i dag vises Idag og tidspunktet
  const tomorrow = new Date(); // vis datoen er i morgen vises Imorgen og tidspunktet
  // hvis idag + 1 = dagen imorgen så retunere jeg return I morgen


  tomorrow.setDate(tomorrow.getDate() + 1);
  const time = date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
  if (date.toDateString() === today.toDateString()) {
    return `I dag ${time}`;
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return `I morgen ${time}`;
  }
  // Hvis datoen ikke er i dag eller i morgen, returneres den i formatet "dag måned år"
  return date.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
};
