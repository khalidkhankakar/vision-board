import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToShortDate(dateString:string) {
  // Parse the ISO date string
  const date = new Date(dateString);

  // Get the components
  const options = {
    weekday: 'short', // Three-letter day (e.g., "Fri")
    day: '2-digit',   // Two-digit day of the month (e.g., "23")
    month: '2-digit', // Two-digit month (e.g., "02")
    year: 'numeric',  // Full year (e.g., "2024")
  };

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Custom format: `Fri 23, 02, 2024`
  return formattedDate.replace(/, /g, ', ');
}
