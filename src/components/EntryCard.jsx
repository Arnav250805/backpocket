import { motion } from 'framer-motion';

/**
 * EntryCard Component
 * 
 * Displays a summary card for each conversation entry.
 * Includes hover animations, delete button, and click to view details.
 * 
 * @param {Object} entry - The entry data to display
 * @param {Function} onClick - Callback when card is clicked (to view details)
 * @param {Function} onDelete - Callback when delete button is clicked
 * 
 * FUTURE BACKEND: Card data will come from API instead of localStorage
 */
const EntryCard = ({ entry, onClick, onDelete }) => {
  const { firstName, lastName, date, topics, notes } = entry;
  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Create snippet from notes (max 120 characters)
  const snippet = notes.length > 120 ? notes.substring(0, 120) + '...' : notes;

  /**
   * Handle delete button click
   * Stops propagation to prevent opening the detail modal
   */
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card onClick from firing
    onDelete(entry);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all hover:shadow-xl hover:border-gray-300 relative group"
    >
      {/* Delete Button - Shows on hover */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 w-8 h-8 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-100 z-10"
        title="Delete entry"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>
        {entry.audioData && (
          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z" />
              <path d="M10 14a6 6 0 01-6-6v-1a1 1 0 112 0v1a4 4 0 108 0v-1a1 1 0 112 0v1a6 6 0 01-6 6z" />
            </svg>
          </div>
        )}
      </div>

      {/* Topics */}
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-900 text-xs font-medium rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Notes Snippet */}
      {snippet && (
        <p className="text-gray-600 text-sm leading-relaxed">{snippet}</p>
      )}
    </motion.div>
  );
};

export default EntryCard;

