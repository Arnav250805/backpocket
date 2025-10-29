import { motion, AnimatePresence } from 'framer-motion';

/**
 * DeleteConfirmModal Component
 * 
 * Displays a confirmation dialog before deleting an entry.
 * Prevents accidental deletions with a clear confirmation flow.
 * 
 * @param {Object} entry - The entry to be deleted
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close modal without deleting
 * @param {Function} onConfirm - Callback to confirm deletion
 * 
 * FUTURE: When integrating backend (Supabase/Firebase):
 * - Update onConfirm to make API call before updating local state
 * - Add loading state during deletion
 * - Handle network errors with retry option
 */
const DeleteConfirmModal = ({ entry, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !entry) return null;

  const handleConfirm = () => {
    // FUTURE BACKEND INTEGRATION:
    // Before calling onConfirm, make API call to delete from database:
    // await supabase.from('entries').delete().eq('id', entry.id);
    // or
    // await firebase.firestore().collection('entries').doc(entry.id).delete();
    
    onConfirm(entry.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Entry
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-gray-700">
              Are you sure you want to delete the conversation with{' '}
              <span className="font-semibold">
                {entry.firstName} {entry.lastName}
              </span>
              ?
            </p>
            {entry.audioData && (
              <p className="text-sm text-gray-500 mt-3">
                ⚠️ This entry contains an audio recording that will also be deleted.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-lg shadow-red-500/30"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;

