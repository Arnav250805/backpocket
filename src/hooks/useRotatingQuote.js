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
    // Change quote every 10 minutes
    const interval = setInterval(() => {
      setQuote(getTimeBasedQuote());
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return quote;
};

