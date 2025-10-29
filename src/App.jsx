import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import AddEntry from './components/AddEntry';
import EntryCard from './components/EntryCard';
import EntryModal from './components/EntryModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import WelcomeModal from './components/WelcomeModal';
import SearchBar from './components/SearchBar';
import { useRotatingQuote } from './hooks/useRotatingQuote';
import { getOrCreateUser, fetchEntries, createEntry, deleteEntryFromDB, exportEntries } from './lib/supabase';

/**
 * Main App Component with Supabase Backend
 * 
 * Manages all state and orchestrates the PRM application.
 * Now connected to Supabase for cloud data storage and sync!
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
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Get rotating quote (changes every 10 minutes or on refresh)
  const quote = useRotatingQuote();

  /**
   * Check if user has visited before
   * If not, show welcome modal to get their name
   * Also get or create user in Supabase
   */
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedUserId = localStorage.getItem('userId');
    
    if (savedName && savedUserId) {
      setUserName(savedName);
      setUserId(savedUserId);
      loadUserEntries(savedUserId);
    } else {
      setShowWelcome(true);
      setLoading(false);
    }
  }, []);

  /**
   * Load entries from Supabase for the current user
   */
  const loadUserEntries = async (uid) => {
    setLoading(true);
    const { data, error } = await fetchEntries(uid);
    
    if (error) {
      console.error('Error loading entries:', error);
      setLoading(false);
      return;
    }

    // Transform Supabase data to match our frontend format
    const transformedEntries = data.map(entry => ({
      id: entry.id,
      firstName: entry.first_name,
      lastName: entry.last_name,
      date: entry.date,
      topics: entry.topics || [],
      notes: entry.notes,
      email: entry.email,
      phone: entry.phone,
      audioUrl: entry.audio_url,
      transcript: entry.transcript,
      createdAt: entry.created_at,
    }));

    setEntries(transformedEntries);
    setFilteredEntries(transformedEntries);
    setLoading(false);
  };

  /**
   * Handle saving a new entry to Supabase
   */
  const handleSaveEntry = async (entryData) => {
    const { data, error } = await createEntry(userId, entryData);
    
    if (error) {
      console.error('Error creating entry:', error);
      alert('Failed to save entry. Please try again.');
      return;
    }

    // Transform and add to state
    const transformedEntry = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      date: data.date,
      topics: data.topics || [],
      notes: data.notes,
      email: data.email,
      phone: data.phone,
      audioUrl: data.audio_url,
      transcript: data.transcript,
      createdAt: data.created_at,
    };

    const updatedEntries = [transformedEntry, ...entries];
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
   * Confirm deletion - delete from Supabase
   */
  const handleConfirmDelete = async (id) => {
    const { error } = await deleteEntryFromDB(id);
    
    if (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
      return;
    }

    const updatedEntries = entries.filter(entry => entry.id !== id);
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
   * Handle export to JSON from Supabase
   */
  const handleExport = () => {
    exportEntries(userId);
  };

  /**
   * Handle welcome modal submission
   * Create or get user in Supabase and save to localStorage
   */
  const handleWelcomeSubmit = async (name) => {
    const { data, error } = await getOrCreateUser(name);
    
    if (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
      return;
    }

    // Save to localStorage for persistence
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', data.id);
    
    setUserName(name);
    setUserId(data.id);
    setShowWelcome(false);
    setLoading(false);
    
    // Load entries for this user
    loadUserEntries(data.id);
  };

  // Show loading spinner while fetching data
  if (loading && !showWelcome) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading your conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl text-gray-900">
                  <span className="font-bold">BackPocket</span>
                  <span className="italic font-normal"> - Making Conversations Stick</span>
                </h1>
                {userName && (
                  <div className="text-right">
                    <p className="text-base text-gray-600">
                      Hi, {userName}
                    </p>
                    <p className="text-base text-gray-600">
                      {new Date().toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      }).replace(/(\d+)/, (day) => {
                        const suffix = day.endsWith('1') && day !== '11' ? 'st' 
                          : day.endsWith('2') && day !== '12' ? 'nd'
                          : day.endsWith('3') && day !== '13' ? 'rd' 
                          : 'th';
                        return day + suffix;
                      })}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-gray-500 mt-2 italic text-sm">
                "{quote.text}"
                <span className="text-gray-400 not-italic ml-2">
                  — {quote.author}
                </span>
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} onAddEntry={() => setIsAddModalOpen(true)} />
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
                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-semibold shadow-lg"
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

      {/* Floating Export Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExport}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-gray-800 transition flex items-center justify-center z-30"
        title="Export Data"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </motion.button>

      {/* Modals */}
      {showWelcome && <WelcomeModal onSubmit={handleWelcomeSubmit} />}

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

