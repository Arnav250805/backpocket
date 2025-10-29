# Visual Guide

## 🎨 App Visual Overview

### Main Screen (Empty State)
```
╔════════════════════════════════════════════════════════════════╗
║  Personal Relationship Manager                                 ║
║  Keep track of meaningful conversations                        ║
║                                                                 ║
║  🔍 [Search by name, topic, or date...        ] [📥 Export]   ║
╚════════════════════════════════════════════════════════════════╝

                    ┌─────────────────┐
                    │                 │
                    │       ╱╲        │
                    │      ╱  ╲       │
                    │     ╱ +  ╲      │
                    │    ╱      ╲     │
                    │   ╱________╲    │
                    │                 │
                    └─────────────────┘
                    
                  No entries yet
          Start by adding your first conversation entry
          
                  [Add First Entry]
                  
                                                        ┌────┐
                                                        │ +  │ ← Floating
                                                        └────┘   Button
```

### Main Screen (With Entries)
```
╔════════════════════════════════════════════════════════════════╗
║  Personal Relationship Manager                                 ║
║  Keep track of meaningful conversations                        ║
║                                                                 ║
║  🔍 [Search by name, topic, or date...        ] [📥 Export]   ║
╚════════════════════════════════════════════════════════════════╝

┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ Sarah Johnson     🎤 │ │ Mike Thompson        │ │ Alex Kim             │
│ Oct 28, 2025         │ │ Oct 27, 2025         │ │ Oct 26, 2025         │
│                      │ │                      │ │                      │
│ [Work] [Q4 Goals]    │ │ [Family] [Travel]    │ │ [Business] [Ideas]   │
│ [Project Planning]   │ │                      │ │                      │
│                      │ │                      │ │                      │
│ Discussed the new    │ │ Planning our summer  │ │ Brainstormed new     │
│ project timeline and │ │ vacation. Kids want  │ │ product features for │
│ Q4 goals. Team needs │ │ to go to Disney...   │ │ the mobile app...    │
│ more resources...    │ │                      │ │                      │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘

┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ Jennifer Lee      🎤 │ │ Robert Chen          │ │ Maria Garcia         │
│ Oct 25, 2025         │ │ Oct 24, 2025         │ │ Oct 23, 2025         │
│                      │ │                      │ │                      │
│ [Mentor] [Career]    │ │ [Coffee] [Catch-up]  │ │ [Workshop] [Design]  │
│                      │ │                      │ │                      │
│ Career advice for    │ │ Casual conversation  │ │ Attended design      │
│ transitioning into   │ │ about recent work    │ │ thinking workshop    │
│ product management...│ │ projects...          │ │ together...          │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘

                                                        ┌────┐
                                                        │ +  │
                                                        └────┘
```

### Add Entry Modal
```
                ╔═══════════════════════════════════════╗
                ║ New Entry                          ✕  ║
                ║ Capture conversation details          ║
                ╠═══════════════════════════════════════╣
                ║                                       ║
                ║  First Name *                         ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ Sarah                           │  ║
                ║  └─────────────────────────────────┘  ║
                ║                                       ║
                ║  Last Name *                          ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ Johnson                         │  ║
                ║  └─────────────────────────────────┘  ║
                ║                                       ║
                ║  Date *                               ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ 2025-10-28                      │  ║
                ║  └─────────────────────────────────┘  ║
                ║                                       ║
                ║  Topics Discussed                     ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ Work, Project Planning, Q4      │  ║
                ║  └─────────────────────────────────┘  ║
                ║  Separate topics with commas          ║
                ║                                       ║
                ║  Notes                                ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ Discussed the new project       │  ║
                ║  │ timeline and Q4 goals. Team     │  ║
                ║  │ needs more resources for the    │  ║
                ║  │ upcoming sprint.                │  ║
                ║  │                                 │  ║
                ║  └─────────────────────────────────┘  ║
                ║  [🎤 Start Voice Input]               ║
                ║                                       ║
                ║  Voice Recording (Optional)           ║
                ║  [🎙 Record Audio]                    ║
                ║                                       ║
                ║  Email                                ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ sarah@example.com               │  ║
                ║  └─────────────────────────────────┘  ║
                ║                                       ║
                ║  Phone                                ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ +1 (555) 123-4567               │  ║
                ║  └─────────────────────────────────┘  ║
                ║                                       ║
                ║  ┌─────────────────┐  ┌───────────┐  ║
                ║  │  Save Entry     │  │  Cancel   │  ║
                ║  └─────────────────┘  └───────────┘  ║
                ╚═══════════════════════════════════════╝
```

### Voice Input Active
```
                ║  Notes                                ║
                ║  ┌─────────────────────────────────┐  ║
                ║  │ Discussed the new project       │  ║
                ║  │ timeline and Q4 goals...        │  ║
                ║  │ ┃ (speaking...)                 │  ║
                ║  │                                 │  ║
                ║  └─────────────────────────────────┘  ║
                ║  [🔴 Stop Listening] ← Pulsing red   ║
```

### Audio Recording
```
                ║  Voice Recording (Optional)           ║
                ║  [🔴 Stop Recording] ← Pulsing red    ║
                ║                                       ║
                ║  --- After Recording ---              ║
                ║  [▶ ━━━━━━━━━━━━━━ 0:15] [Clear]     ║
```

### Detail Modal
```
                ╔═══════════════════════════════════════╗
                ║ Sarah Johnson                      ✕  ║
                ║ Monday, October 28, 2025              ║
                ╠═══════════════════════════════════════╣
                ║                                       ║
                ║  TOPICS DISCUSSED                     ║
                ║  [Work] [Project Planning] [Q4 Goals] ║
                ║                                       ║
                ║  VOICE RECORDING                      ║
                ║  [▶ ━━━━━━━━━━━━━━ 0:15]             ║
                ║                                       ║
                ║  NOTES                                ║
                ║  Discussed the new project timeline   ║
                ║  and Q4 goals. Team needs more        ║
                ║  resources for the upcoming sprint.   ║
                ║  Sarah mentioned we should prioritize ║
                ║  the mobile app features first.       ║
                ║                                       ║
                ║  We also talked about hiring 2 more   ║
                ║  engineers to help with the backend   ║
                ║  infrastructure improvements.         ║
                ║                                       ║
                ║  CONTACT INFORMATION                  ║
                ║  ✉️  sarah@example.com                ║
                ║  📞  +1 (555) 123-4567                ║
                ║                                       ║
                ╚═══════════════════════════════════════╝
```

### Search Results
```
╔════════════════════════════════════════════════════════════════╗
║  Personal Relationship Manager                                 ║
║  Keep track of meaningful conversations                        ║
║                                                                 ║
║  🔍 [work                                 ✕] [📥 Export]      ║
╚════════════════════════════════════════════════════════════════╝

Found 2 entries matching "work"

┌──────────────────────┐ ┌──────────────────────┐
│ Sarah Johnson     🎤 │ │ Jennifer Lee      🎤 │
│ Oct 28, 2025         │ │ Oct 25, 2025         │
│                      │ │                      │
│ [Work] [Q4 Goals]    │ │ [Mentor] [Career]    │
│ [Project Planning]   │ │                      │
│                      │ │                      │
│ Discussed the new    │ │ Career advice for    │
│ project timeline and │ │ transitioning into   │
│ Q4 goals...          │ │ product management...│
└──────────────────────┘ └──────────────────────┘
```

## 🎨 Color Palette

### Primary Colors
```
Blue (Primary Action)
■ #2563EB (bg-blue-600)
■ #1D4ED8 (bg-blue-700, hover)
■ #DBEAFE (bg-blue-50, light)
■ #1E40AF (text-blue-700)
```

### Accent Colors
```
Purple (Audio Features)
■ #9333EA (bg-purple-600)
■ #F3E8FF (bg-purple-50, light)
■ #7E22CE (text-purple-700)

Red (Stop/Danger)
■ #DC2626 (bg-red-600)
■ #FEE2E2 (bg-red-50, light)
■ #B91C1C (text-red-700)
```

### Neutral Colors
```
Grays (Backgrounds, Text, Borders)
■ #FFFFFF (white, bg)
■ #F9FAFB (bg-gray-50)
■ #F3F4F6 (bg-gray-100)
■ #E5E7EB (border-gray-200)
■ #D1D5DB (border-gray-300)
■ #9CA3AF (text-gray-400)
■ #6B7280 (text-gray-500)
■ #4B5563 (text-gray-600)
■ #374151 (text-gray-700)
■ #1F2937 (text-gray-800)
■ #111827 (bg-gray-900)
```

## 📐 Component Specifications

### Entry Card
- **Width**: Auto (responsive grid)
- **Padding**: 24px (p-6)
- **Border**: 1px solid #E5E7EB
- **Border Radius**: 12px (rounded-xl)
- **Shadow**: Default subtle, enhanced on hover
- **Hover**: Lift 4px (-4px Y transform)

### Floating Add Button
- **Size**: 64×64px (w-16 h-16)
- **Position**: Fixed bottom-right (32px from edges)
- **Border Radius**: 50% (rounded-full)
- **Color**: Blue #2563EB
- **Shadow**: Large 2xl shadow
- **Icon**: Plus sign, 32×32px

### Modal Overlay
- **Background**: rgba(0,0,0,0.3) with blur
- **Backdrop Blur**: 4px (backdrop-blur-sm)
- **Z-Index**: 50

### Modal Container
- **Max Width**: 768px (max-w-2xl for add, max-w-3xl for detail)
- **Max Height**: 90vh (scrollable)
- **Border Radius**: 16px (rounded-2xl)
- **Shadow**: 2xl shadow
- **Background**: White

### Form Inputs
- **Height**: 48px (py-3)
- **Padding**: 16px horizontal (px-4)
- **Border**: 1px solid #D1D5DB
- **Border Radius**: 8px (rounded-lg)
- **Focus**: 2px blue ring (#2563EB)

### Topic Tags
- **Padding**: 12px horizontal, 4px vertical (px-3 py-1)
- **Background**: Blue #DBEAFE (bg-blue-50)
- **Text**: Blue #1E40AF (text-blue-700)
- **Border Radius**: 9999px (rounded-full)
- **Font Size**: 12px (text-xs)
- **Font Weight**: 500 (font-medium)

### Buttons
**Primary (Save)**
- Background: Blue #2563EB
- Hover: Blue #1D4ED8
- Text: White
- Shadow: Large with blue tint
- Padding: 24px horizontal, 12px vertical

**Secondary (Cancel)**
- Background: Gray #F3F4F6
- Hover: Gray #E5E7EB
- Text: Gray #374151
- Padding: 24px horizontal, 12px vertical

**Icon Buttons (Voice, Record)**
- Background: Light (blue-50, purple-50, red-50)
- Text: Accent color
- Icon + Text layout
- Padding: 16px horizontal, 8px vertical

## 🎭 Animations

### Card Hover
```
Initial: y=0, shadow-md
Hover: y=-4px, shadow-xl
Duration: 200ms
Easing: ease-in-out
```

### Modal Open/Close
```
Initial: opacity=0, scale=0.95, y=20
Animate: opacity=1, scale=1, y=0
Exit: opacity=0, scale=0.95, y=20
Duration: 300ms
Easing: ease-in-out
```

### Floating Button
```
Initial: scale=0
Animate: scale=1
Hover: scale=1.1
Tap: scale=0.95
Duration: 200ms
```

### Recording Pulse
```
Class: animate-pulse
Opacity: 0.5 → 1.0 → 0.5
Duration: 2s infinite
```

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- 1 column grid
- Full-width cards
- Stacked search/export buttons
- Smaller floating button (56×56px)
- Reduced padding (16px instead of 24px)

### Tablet (640px - 1024px)
- 2 column grid
- Cards with fixed width
- Side-by-side search/export
- Standard floating button

### Desktop (> 1024px)
- 3 column grid
- Optimal card width
- All features visible
- Maximum readability

## 🎯 Interactive States

### Buttons
```
Default:  [Save Entry]
Hover:    [Save Entry] ← Darker background
Active:   [Save Entry] ← Even darker
Focus:    [Save Entry] ← Blue ring
```

### Inputs
```
Default:  [_________________]
Focus:    [|________________] ← Blue ring
Error:    [_________________] ← Red ring (not implemented)
```

### Cards
```
Default:  Standard elevation
Hover:    Lifted with shadow
Active:   Clicked/selected (not implemented)
```

## 💡 Visual Hierarchy

### Typography Scale
```
h1 (Page Title):     36px bold
h2 (Modal Title):    30px bold
h3 (Section):        20px bold
Body:                16px regular
Small:               14px regular
Tiny:                12px regular
```

### Font Weights
```
Light:   300 (not used)
Regular: 400 (body text)
Medium:  500 (tags, buttons)
Semibold: 600 (labels)
Bold:    700 (headings)
```

### Line Heights
```
Tight:   1.25 (headings)
Normal:  1.5 (body)
Relaxed: 1.75 (notes, long text)
```

## 🎬 User Flow Diagram

```
        Start
          ↓
    [Main Screen]
          ↓
    ┌─────┴─────┐
    ↓           ↓
[Search]    [Add Entry]
    ↓           ↓
[Results]   [Fill Form]
    ↓           ↓
[Click Card] [Save]
    ↓           ↓
[Detail View]  ← ← ←
    ↓
[Close Modal]
    ↓
[Main Screen]
```

## 🏆 Design Principles Applied

1. **Minimalism**: Clean, uncluttered interface
2. **Consistency**: Repeated patterns and styles
3. **Feedback**: Visual response to all actions
4. **Hierarchy**: Clear importance levels
5. **Accessibility**: Large touch targets, clear text
6. **Performance**: Smooth animations, instant feedback
7. **Responsiveness**: Works on all screen sizes
8. **Familiarity**: Notion-inspired patterns

---

This guide should help you understand the visual design of the PRM app!

