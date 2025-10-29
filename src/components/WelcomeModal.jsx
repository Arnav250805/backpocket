import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WelcomeModal Component
 * 
 * Shows a welcome screen for first-time users to enter their name.
 * The name is stored in localStorage and displayed in the header.
 * 
 * Features:
 * - Clean, minimal design matching app theme
 * - Tagline: "LinkedIn connects people, Backpocket remembers them"
 * - Stores user name in localStorage
 * - Only shows once per browser
 */

export default function WelcomeModal({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8"
        >
          {/* Tagline */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              LinkedIn connects people,<br />
              <span className="font-semibold">Backpocket remembers them</span>
            </p>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                id="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-sm"
            >
              Get Started
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

