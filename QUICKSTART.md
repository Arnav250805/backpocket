# Quick Start Guide

## 🎯 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Your Browser
Navigate to `http://localhost:5173`

---

## 📝 First Entry in 60 Seconds

1. **Click the blue + button** (bottom-right corner)
2. **Fill in basic info**:
   - First Name: "Sarah"
   - Last Name: "Johnson"
   - Date: (pre-filled with today)
3. **Add topics**: "Work, Project Planning, Q4 Goals"
4. **Add notes** (try voice-to-text!):
   - Click "Start Voice Input"
   - Speak: "Discussed the new project timeline and Q4 goals"
   - Click "Stop Listening"
5. **Click "Save Entry"**

🎉 Done! Your first entry is saved.

---

## 🎤 Using Voice Features

### Voice-to-Text (Dictation)
1. Click in the Notes field
2. Click "Start Voice Input" button
3. Speak clearly into your microphone
4. Click "Stop Listening" when done
5. Text automatically appears in notes field

**Pro Tip**: You can use voice input multiple times - it appends to existing text!

### Audio Recording
1. Click "Record Audio" button
2. Speak your voice note
3. Click "Stop Recording"
4. Use audio player to preview
5. Click "Clear" to re-record if needed
6. Save entry to keep recording

**Note**: Voice recordings are stored locally in your browser.

---

## 🔍 Searching Entries

### Quick Search Tips
- **By Name**: Type "Sarah" → finds Sarah Johnson
- **By Topic**: Type "Work" → finds all work-related entries
- **By Date**: Type "Oct" → finds October entries
- **Partial Match**: Type "Jon" → finds Johnson
- **Fuzzy Match**: Type "Srah" → still finds Sarah!

### Clear Search
Click the **X** icon in the search bar or delete all text.

---

## 💾 Exporting Your Data

### Backup All Entries
1. Click the **Export** button (top-right)
2. JSON file downloads automatically
3. Filename: `prm-backup-YYYY-MM-DD.json`

### What's in the Export?
- All entries with full details
- Audio recordings (as base64)
- Topics, notes, contact info
- Timestamps

---

## 📱 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Close Modal | `Esc` |
| Submit Form | `Enter` (in input fields) |

---

## 🎨 UI Overview

### Main Screen
```
┌─────────────────────────────────────────────┐
│  Personal Relationship Manager              │
│  Keep track of meaningful conversations     │
│                                             │
│  [Search Bar............] [Export Button]  │
└─────────────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ Entry 1  │ │ Entry 2  │ │ Entry 3  │
│ Sarah J. │ │ Mike T.  │ │ Alex K.  │
│ Oct 28   │ │ Oct 27   │ │ Oct 26   │
│ 🏷 Work  │ │ 🏷 Family│ │ 🏷 Travel│
│ Notes... │ │ Notes... │ │ Notes... │
└──────────┘ └──────────┘ └──────────┘

                            [+] ← Floating Button
```

### Add Entry Modal
```
┌─────────────────────────────────┐
│ New Entry                       │ [X]
├─────────────────────────────────┤
│ First Name: [_____________]     │
│ Last Name:  [_____________]     │
│ Date:       [2025-10-28___]     │
│ Topics:     [_____________]     │
│ Notes:      [_____________]     │
│             [_____________]     │
│   [🎤 Start Voice Input]        │
│   [🎙 Record Audio]             │
│ Email:      [_____________]     │
│ Phone:      [_____________]     │
│                                 │
│ [Save Entry]  [Cancel]          │
└─────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Voice Input Not Working?
- **Check Browser**: Use Chrome, Edge, or Safari
- **Grant Permission**: Allow microphone access
- **Check Connection**: First use may require internet
- **Try Again**: Click "Start Voice Input" again

### Audio Recording Issues?
- **Microphone Permission**: Check browser settings
- **Device**: Ensure microphone is connected
- **Privacy Settings**: Allow browser microphone access

### Entries Not Saving?
- **LocalStorage**: Check if browser allows storage
- **Private Browsing**: May clear data on close
- **Storage Full**: Clear old data or export

### Search Not Finding?
- **Wait a Moment**: Type full word
- **Try Different Terms**: Search by name/topic/date
- **Check Spelling**: Fuzzy search helps but isn't perfect

---

## 💡 Pro Tips

1. **Use Voice-to-Text for Long Notes**: Faster than typing!
2. **Add Topics Consistently**: Makes searching easier later
3. **Export Regularly**: Backup your data weekly
4. **Use Audio for Context**: Voice tone adds meaning
5. **Date Entries Promptly**: Easy to forget details later
6. **Be Specific with Topics**: "Q4 Planning" better than "Work"

---

## 📚 Next Steps

- [ ] Add your first 5 entries
- [ ] Try voice-to-text feature
- [ ] Record a voice note
- [ ] Search your entries
- [ ] Export your data

---

## 🤝 Need Help?

Check out:
- `README.md` - Full documentation
- `FEATURES.md` - Detailed feature list
- Browser console - Error messages

---

## 🎊 You're Ready!

The app is running at **http://localhost:5173**

Click that **+** button and start capturing conversations! 🚀

