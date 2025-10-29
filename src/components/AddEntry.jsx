import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import DatePicker from './DatePicker';

/**
 * AddEntry Modal Component
 * 
 * Form for creating new conversation entries with:
 * - Text input fields (name, date, topics, notes, contact info)
 * - Voice-to-text dictation for notes
 * - Audio recording capability
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback to close modal
 * @param {Function} onSave - Callback with entry data when saved
 * 
 * FUTURE BACKEND INTEGRATION:
 * - Upload audio to cloud storage (Supabase Storage/Firebase Storage)
 * - Save entry to database via API
 * - Add validation for duplicate entries
 * - Add auto-save draft feature
 * - Implement rich text editor for notes
 */
const AddEntry = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: new Date().toISOString().split('T')[0],
    topics: '',
    notes: '',
    email: '',
    phone: '',
  });

  const {
    isListening,
    transcript,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    clearRecording,
    getAudioBase64,
  } = useAudioRecorder();

  // Update notes with transcript
  useEffect(() => {
    if (transcript) {
      setFormData(prev => ({
        ...prev,
        notes: prev.notes + (prev.notes ? ' ' : '') + transcript,
      }));
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   * Converts audio to base64, parses topics, and saves entry
   * 
   * BACKEND: Upload audio file first, get URL, then save entry with audio URL
   * Example:
   * const audioUrl = await uploadAudio(audioBlob);
   * const entry = { ...formData, audioUrl };
   * await saveEntry(entry);
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get audio as base64 if exists
    // BACKEND: Replace with cloud storage upload
    const audioData = await getAudioBase64();
    
    // Parse topics into array (comma-separated)
    const topicsArray = formData.topics
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const entry = {
      ...formData,
      topics: topicsArray,
      audioData,
    };

    onSave(entry);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      date: new Date().toISOString().split('T')[0],
      topics: '',
      notes: '',
      email: '',
      phone: '',
    });
    clearRecording();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl z-10">
            <h2 className="text-3xl font-bold text-gray-900">New Entry</h2>
            <p className="text-gray-500 mt-1">Capture conversation details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Date - Custom Calendar Picker */}
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={(date) => setFormData(prev => ({ ...prev, date }))}
              required
            />

            {/* Topics */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topics Discussed
              </label>
              <input
                type="text"
                name="topics"
                value={formData.topics}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Work, Family, Travel (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate topics with commas</p>
            </div>

            {/* Notes with Voice-to-Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="What did you discuss?"
              />
              
              {/* Voice Control Buttons */}
              {speechSupported && (
                <div className="mt-3 flex gap-2">
                  {!isListening ? (
                    <button
                      type="button"
                      onClick={startListening}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z" />
                        <path d="M10 14a6 6 0 01-6-6v-1a1 1 0 112 0v1a4 4 0 108 0v-1a1 1 0 112 0v1a6 6 0 01-6 6z" />
                      </svg>
                      Start Voice Input
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopListening}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center gap-2 animate-pulse"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      Stop Listening
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Audio Recording */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Voice Recording (Optional)
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {!isRecording && !audioURL && (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z" />
                        <path d="M10 14a6 6 0 01-6-6v-1a1 1 0 112 0v1a4 4 0 108 0v-1a1 1 0 112 0v1a6 6 0 01-6 6z" />
                      </svg>
                      Record Audio
                    </button>
                  )}
                  
                  {isRecording && (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center gap-2 animate-pulse"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      Stop Recording
                    </button>
                  )}
                  
                  {audioURL && (
                    <>
                      <audio src={audioURL} controls className="flex-1" />
                      <button
                        type="button"
                        onClick={clearRecording}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        Clear
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-500/30"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddEntry;

