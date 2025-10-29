/**
 * LocalStorage utilities for managing entries
 * 
 * FUTURE BACKEND INTEGRATION (Supabase/Firebase):
 * 
 * Replace localStorage calls with API calls:
 * 
 * Supabase example:
 * - loadEntries: await supabase.from('entries').select('*').order('createdAt', { ascending: false })
 * - addEntry: await supabase.from('entries').insert([newEntry]).select()
 * - updateEntry: await supabase.from('entries').update(updates).eq('id', id).select()
 * - deleteEntry: await supabase.from('entries').delete().eq('id', id)
 * 
 * Firebase example:
 * - loadEntries: await firebase.firestore().collection('entries').orderBy('createdAt', 'desc').get()
 * - addEntry: await firebase.firestore().collection('entries').add(newEntry)
 * - updateEntry: await firebase.firestore().collection('entries').doc(id).update(updates)
 * - deleteEntry: await firebase.firestore().collection('entries').doc(id).delete()
 * 
 * For audio data with backend:
 * - Store audio files in Supabase Storage or Firebase Storage
 * - Save file URL reference in database instead of base64
 * - Implement file upload/download methods
 */

const STORAGE_KEY = 'prm_entries';

/**
 * Load all entries from localStorage
 * @returns {Array} Array of entry objects
 * 
 * BACKEND: Replace with API call to fetch entries for current user
 */
export const loadEntries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
};

/**
 * Save entries array to localStorage
 * @param {Array} entries - Array of entry objects
 * @returns {boolean} Success status
 * 
 * BACKEND: Not needed - individual operations will handle sync
 */
export const saveEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving entries:', error);
    return false;
  }
};

/**
 * Add a new entry
 * @param {Object} entry - Entry data to add
 * @returns {Object} The created entry with ID
 * 
 * BACKEND: Make API call to insert entry, return entry with server-generated ID
 */
export const addEntry = (entry) => {
  const entries = loadEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(), // BACKEND: Server will generate UUID
    createdAt: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  saveEntries(entries);
  return newEntry;
};

/**
 * Update an existing entry
 * @param {string} id - Entry ID to update
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated entry or null if not found
 * 
 * BACKEND: Make API call to update entry by ID
 */
export const updateEntry = (id, updates) => {
  const entries = loadEntries();
  const index = entries.findIndex(entry => entry.id === id);
  
  if (index === -1) return null;
  
  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveEntries(entries);
  return entries[index];
};

/**
 * Delete an entry by ID
 * @param {string} id - Entry ID to delete
 * @returns {Array} Updated entries array
 * 
 * BACKEND: Make API call to delete entry, also delete associated audio file from storage
 */
export const deleteEntry = (id) => {
  const entries = loadEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  saveEntries(filtered);
  return filtered;
};

/**
 * Export all entries as JSON file
 * 
 * BACKEND: Could add option to export from server for backup
 */
export const exportData = () => {
  const entries = loadEntries();
  const dataStr = JSON.stringify(entries, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `prm-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

