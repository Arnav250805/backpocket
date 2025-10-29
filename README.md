# BackPocket – Voice Journal

A beautiful, Notion-inspired web app for capturing and managing conversation notes with voice-to-text and audio recording capabilities.

*Formerly known as Personal Relationship Manager (PRM)*

## Features

- **Quick Entry Creation**: Capture conversation details with an intuitive modal interface
- **Voice-to-Text**: Use your browser's Speech Recognition API to dictate notes
- **Audio Recording**: Record and playback voice notes directly in the app
- **Smart Search**: Fuzzy search across names, topics, and notes using Fuse.js
- **Local Storage**: All data stored locally in your browser
- **Data Export**: Export all entries as JSON for backup
- **Beautiful UI**: Notion-style design with smooth animations

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Fuse.js
- Browser APIs (SpeechRecognition, MediaRecorder)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Adding a New Entry

1. Click the **+** floating button in the bottom-right corner
2. Fill in the contact details (First Name, Last Name, Date)
3. Add topics as comma-separated values
4. Type notes or use voice-to-text input
5. Optionally record a voice note
6. Add email/phone if desired
7. Click **Save Entry**

### Searching Entries

- Use the search bar at the top to find entries by name, topic, or date
- Fuzzy matching helps find entries even with partial or misspelled queries

### Viewing Entry Details

- Click any entry card to open a full-detail modal
- Listen to voice recordings if attached
- View all conversation notes and contact information

### Exporting Data

- Click the **Export** button in the header
- A JSON file will download with all your entries
- Use this for backup or data portability

## Browser Compatibility

- **Voice-to-Text**: Chrome, Edge, Safari (with webkit prefix)
- **Audio Recording**: All modern browsers
- **LocalStorage**: All modern browsers

## Privacy

All data is stored locally in your browser. No data is sent to any server. Your conversations remain completely private.

## Future Enhancements

- Category-based topic organization
- Advanced filtering and sorting
- Import JSON functionality
- Entry editing and deletion
- Dark mode support

## License

MIT License - Feel free to use and modify as needed.

