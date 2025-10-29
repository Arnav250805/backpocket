# Project Structure

```
PRM Vibe Coded/
├── index.html                      # Main HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .gitignore                      # Git ignore rules
│
├── README.md                       # Main documentation
├── QUICKSTART.md                   # Quick start guide
├── FEATURES.md                     # Feature overview
├── PROJECT_STRUCTURE.md            # This file
│
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Main app component
    ├── index.css                   # Global styles (Tailwind imports)
    │
    ├── components/
    │   ├── AddEntry.jsx           # Modal for adding new entries
    │   ├── EntryCard.jsx          # Individual entry card component
    │   ├── EntryModal.jsx         # Modal for viewing entry details
    │   └── SearchBar.jsx          # Search and export controls
    │
    ├── hooks/
    │   ├── useSpeechRecognition.js # Voice-to-text hook
    │   └── useAudioRecorder.js    # Audio recording hook
    │
    └── utils/
        └── storage.js             # LocalStorage utilities
```

## File Descriptions

### Configuration Files

**`package.json`**
- Project metadata and dependencies
- Scripts: `dev`, `build`, `preview`
- Dependencies: React, Framer Motion, Fuse.js, Tailwind CSS

**`vite.config.js`**
- Vite bundler configuration
- React plugin setup

**`tailwind.config.js`**
- Tailwind CSS customization
- Content paths for purging unused styles
- Theme extensions (fonts, colors)

**`postcss.config.js`**
- PostCSS plugins configuration
- Tailwind and Autoprefixer setup

### Core Application Files

**`src/main.jsx`**
- React application entry point
- Renders root App component
- Imports global CSS

**`src/App.jsx`**
- Main application component
- State management for entries
- Search functionality with Fuse.js
- Modal orchestration
- Layout structure

**`src/index.css`**
- Tailwind CSS imports
- Global style resets
- Base typography

### Components

**`src/components/AddEntry.jsx`** (320 lines)
- Form for creating new entries
- Voice-to-text integration
- Audio recording integration
- Form validation
- Framer Motion animations
- Converts topics string to array
- Handles audio base64 encoding

**`src/components/EntryCard.jsx`** (70 lines)
- Displays entry summary in card format
- Shows: name, date, topics, note snippet
- Hover animations
- Audio indicator icon
- Click handler for opening detail modal

**`src/components/EntryModal.jsx`** (110 lines)
- Full entry details view
- Audio playback
- Formatted date display
- Contact information with clickable links
- Close button and backdrop click to dismiss

**`src/components/SearchBar.jsx`** (55 lines)
- Search input with icon
- Clear button
- Export button
- Responsive layout

### Custom Hooks

**`src/hooks/useSpeechRecognition.js`** (80 lines)
- Browser Speech Recognition API wrapper
- Supports continuous listening
- Real-time transcript updates
- Browser compatibility check
- States: listening, transcript, supported
- Methods: start, stop, reset

**`src/hooks/useAudioRecorder.js`** (70 lines)
- MediaRecorder API wrapper
- Audio recording to WebM format
- Blob to base64 conversion
- URL creation and cleanup
- Permission handling
- States: recording, audioURL
- Methods: start, stop, clear, getBase64

### Utilities

**`src/utils/storage.js`** (55 lines)
- LocalStorage abstraction layer
- Functions:
  - `loadEntries()` - Get all entries
  - `saveEntries()` - Save entries array
  - `addEntry()` - Add single entry with ID
  - `deleteEntry()` - Remove entry by ID
  - `exportData()` - Download JSON backup
- Error handling
- Auto-generates IDs and timestamps

## Data Flow

```
User Action → Component → Hook/Utility → State Update → Re-render

Example: Adding Entry
1. User fills form in AddEntry component
2. User clicks "Save Entry"
3. Component calls getAudioBase64() from useAudioRecorder
4. Component calls onSave() prop
5. App.jsx receives data
6. App.jsx calls addEntry() from storage.js
7. LocalStorage updated
8. State updated with new entry
9. UI re-renders with new card
```

## State Management

### App.jsx State
- `entries` - All entries array
- `filteredEntries` - Search results array
- `isAddModalOpen` - Add modal visibility
- `selectedEntry` - Currently viewed entry
- `isDetailModalOpen` - Detail modal visibility

### AddEntry.jsx State
- `formData` - All form fields
- Speech recognition state (from hook)
- Audio recorder state (from hook)

### Custom Hooks State
- **useSpeechRecognition**: `isListening`, `transcript`, `isSupported`
- **useAudioRecorder**: `isRecording`, `audioURL`, `audioBlob`

## Storage Schema

### Entry Object
```json
{
  "id": "1698509876543",
  "createdAt": "2025-10-28T12:34:56.789Z",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "date": "2025-10-28",
  "topics": ["Work", "Project Planning", "Q4 Goals"],
  "notes": "Discussed project timeline and deliverables...",
  "email": "sarah@example.com",
  "phone": "+1 (555) 123-4567",
  "audioData": "data:audio/webm;base64,GkXf..."
}
```

### LocalStorage Key
- **Key**: `prm_entries`
- **Value**: JSON stringified array of entry objects

## Dependencies

### Production
- **react** (^18.3.1) - UI library
- **react-dom** (^18.3.1) - React DOM renderer
- **framer-motion** (^11.0.0) - Animations
- **fuse.js** (^7.0.0) - Fuzzy search

### Development
- **vite** (^5.2.10) - Build tool
- **@vitejs/plugin-react** (^4.2.1) - React support for Vite
- **tailwindcss** (^3.4.3) - Utility-first CSS
- **autoprefixer** (^10.4.19) - CSS vendor prefixes
- **postcss** (^8.4.38) - CSS transformations

## Build Output

```
dist/
├── index.html          # Processed HTML
├── assets/
│   ├── index-[hash].js   # Bundled JavaScript
│   └── index-[hash].css  # Bundled CSS
```

## Key Features by File

| Feature | Primary Files |
|---------|---------------|
| Voice-to-Text | `useSpeechRecognition.js`, `AddEntry.jsx` |
| Audio Recording | `useAudioRecorder.js`, `AddEntry.jsx` |
| Search | `App.jsx` (Fuse.js), `SearchBar.jsx` |
| Storage | `storage.js` |
| Animations | All components (Framer Motion) |
| Styling | `tailwind.config.js`, all `.jsx` files |
| Export | `storage.js`, `SearchBar.jsx` |

## Browser APIs Used

- **Web Speech API** - Voice recognition
- **MediaRecorder API** - Audio recording
- **LocalStorage API** - Data persistence
- **Blob API** - Audio file handling
- **FileReader API** - Base64 encoding
- **URL.createObjectURL** - Audio playback

## Performance Considerations

- **Lazy Loading**: Components only render when needed
- **Memoization**: Could be added with React.memo
- **Chunked Loading**: Vite code-splitting
- **Optimized Search**: Fuse.js with threshold tuning
- **Efficient Re-renders**: Proper key usage in lists

## Future Enhancement Areas

1. **Entry Editing**: Add edit functionality
2. **Entry Deletion**: Add delete with confirmation
3. **Categories**: Pre-defined topic categories
4. **Import**: JSON import functionality
5. **Dark Mode**: Theme toggle
6. **Sorting**: Sort by date/name/topic
7. **Filtering**: Filter by topic/date range
8. **Tags Autocomplete**: Suggest existing topics
9. **Multi-select Actions**: Bulk operations
10. **Entry Templates**: Quick entry types

