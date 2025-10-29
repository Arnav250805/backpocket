import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import AddEntry from './components/AddEntry';
import EntryCard from './components/EntryCard';
import EntryModal from './components/EntryModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import SearchBar from './components/SearchBar';
import { loadEntries, addEntry, deleteEntry, exportData } from './utils/storage';
import { useRotatingQuote } from './hooks/useRotatingQuote';

/**
 * Main App Component
 * 
 * Manages all state and orchestrates the PRM application.
 * Handles entry CRUD operations, search, and modal states.
 * 
 * FUTURE BACKEND INTEGRATION:
 * - Add authentication context (user login/logout)
 * - Fetch entries from API on mount
 * - Subscribe to real-time updates (if using Firebase/Supabase)
 * - Add offline sync capability
 * - Implement loading and error states for API calls
 */
function App() {
  // State management
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Get rotating quote (changes hourly or on refresh)
  const quote = useRotatingQuote();

  /**
   * Load entries from localStorage on component mount
   * 
   * BACKEND: Replace with API call
   * const fetchEntries = async () => {
   *   const { data } = await supabase.from('entries').select('*');
   *   setEntries(data);
   *   setFilteredEntries(data);
   * };
   */
  useEffect(() => {
    const savedEntries = loadEntries();
    setEntries(savedEntries);
    setFilteredEntries(savedEntries);
  }, []);

  /**
   * Handle saving a new entry
   * Updates both entries and filteredEntries state
   * 
   * BACKEND: Make API call first, then update state
   */
  const handleSaveEntry = (entryData) => {
    const newEntry = addEntry(entryData);
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries);
  };

  /**
   * Handle search with Fuse.js fuzzy matching
   * Searches across: firstName, lastName, topics, notes, and date
   * 
   * Threshold 0.3 = moderately fuzzy (0 = exact, 1 = match anything)
   * ignoreLocation = search anywhere in the text
   */
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredEntries(entries);
      return;
    }

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(entries, {
      keys: [
        { name: 'firstName', weight: 2 },     // Higher weight for names
        { name: 'lastName', weight: 2 },
        { name: 'topics', weight: 1.5 },      // Topics important too
        { name: 'notes', weight: 1 },
        { name: 'date', weight: 1 },
      ],
      threshold: 0.3,           // 0-1, lower = stricter matching
      ignoreLocation: true,     // Search anywhere in text
      includeScore: true,       // For debugging/sorting by relevance
    });

    const results = fuse.search(query);
    setFilteredEntries(results.map(result => result.item));
  };

  /**
   * Handle card click to view details
   */
  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };

  /**
   * Handle delete button click
   * Opens confirmation modal before deleting
   */
  const handleDeleteClick = (entry) => {
    setDeleteCandidate(entry);
    setIsDeleteModalOpen(true);
  };

  /**
   * Confirm deletion
   * Removes entry from localStorage and updates state
   * 
   * BACKEND: Make API call to delete from database
   * Also delete associated audio file from storage if exists
   */
  const handleConfirmDelete = (id) => {
    const updatedEntries = deleteEntry(id);
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries);
    setIsDeleteModalOpen(false);
    setDeleteCandidate(null);
    
    // Close detail modal if we deleted the currently viewed entry
    if (selectedEntry && selectedEntry.id === id) {
      setIsDetailModalOpen(false);
      setSelectedEntry(null);
    }
  };

  /**
   * Cancel deletion
   */
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteCandidate(null);
  };

  /**
   * Handle export to JSON
   */
  const handleExport = () => {
    exportData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                BackPocket
              </h1>
              <p className="text-gray-500 mt-2 italic">
                "{quote.text}"
                <span className="text-gray-400 not-italic ml-2">
                  — {quote.author}
                </span>
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} onExport={handleExport} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {entries.length === 0 ? 'No entries yet' : 'No results found'}
            </h2>
            <p className="text-gray-500 mb-8">
              {entries.length === 0
                ? 'Start by adding your first conversation entry'
                : 'Try adjusting your search query'}
            </p>
            {entries.length === 0 && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-500/30"
              >
                Add First Entry
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onClick={() => handleCardClick(entry)}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition flex items-center justify-center z-30"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>

      {/* Modals */}
      <AddEntry
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEntry}
      />

      <EntryModal
        entry={selectedEntry}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEntry(null);
        }}
      />

      <DeleteConfirmModal
        entry={deleteCandidate}
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default App;

