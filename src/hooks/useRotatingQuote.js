import { useState, useEffect } from 'react';
import { getTimeBasedQuote } from '../data/quotes';

/**
 * useRotatingQuote Hook
 * 
 * Provides a rotating quote that changes:
 * - Every hour (on the hour)
 * - When the page is refreshed
 * 
 * Uses time-based selection to ensure the same quote shows for the full hour,
 * but changes to a different quote on the next hour.
 * 
 * @returns {Object} Current quote with text, author, and company
 */
export const useRotatingQuote = () => {
  const [quote, setQuote] = useState(getTimeBasedQuote());

  useEffect(() => {
    // Calculate milliseconds until next hour
    const now = new Date();
    const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;

    // Set initial timer to sync with the hour
    const initialTimer = setTimeout(() => {
      setQuote(getTimeBasedQuote());
      
      // Then set up hourly interval
      const hourlyInterval = setInterval(() => {
        setQuote(getTimeBasedQuote());
      }, 60 * 60 * 1000); // 1 hour in milliseconds

      return () => clearInterval(hourlyInterval);
    }, msUntilNextHour);

    return () => clearTimeout(initialTimer);
  }, []);

  return quote;
};

