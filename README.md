# NASA Earth Watch

A React app that visualizes real-time natural disaster events and Earth satellite imagery using NASA's public APIs — no API key required.

**Live demo:** https://global-epic.vercel.app *(deploy to update)*

---

## Features

- **3D Interactive Globe** — EONET disaster events plotted as colored markers on a real-time Earth globe (react-globe.gl)
- **Natural Disaster Events** — Browse and filter active events by category (wildfires, floods, storms, earthquakes, volcanoes, and more)
- **Event Detail** — Click any event to see its full history, coordinates, magnitude, and sources
- **Earth Photo Gallery** — Browse daily full-disk Earth photos from NASA's EPIC satellite camera, with date picker

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Routing | React Router DOM v7 (nested routes) |
| Styling | SCSS Modules |
| 3D Globe | react-globe.gl (Three.js) |
| Icons | lucide-react |

---

## APIs Used

Both APIs are **free and require no API key**.

| API | Endpoint | Description |
|---|---|---|
| [NASA EONET v3](https://eonet.gsfc.nasa.gov/docs/v3) | `/api/v3/events` | Real-time natural disaster events with GeoJSON coordinates |
| [NASA EPIC](https://epic.gsfc.nasa.gov/about/api) | `/api/natural` | Full-disk Earth photos from the DSCOVR spacecraft |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── types/
│   ├── eonet.ts          # EONET API types
│   └── epic.ts           # EPIC API types
├── hooks/
│   ├── useEonetEvents.ts      # Fetch all active events
│   ├── useEonetEventDetail.ts # Fetch single event by ID
│   └── useEpicImages.ts       # Fetch EPIC photos + available dates
├── utils/
│   └── eventUtils.ts     # Category colors, URL builder, date formatter
├── components/
│   ├── globe/
│   │   └── GlobeViewer/  # react-globe.gl wrapper with EONET markers
│   ├── home/
│   │   └── HeroSection/  # Globe + sidebar layout (children-based)
│   ├── events/
│   │   ├── EventCard/        # Event card (props-based)
│   │   ├── CategoryBadge/    # Category badge, nested inside EventCard
│   │   ├── EventList/        # List wrapper (children-based)
│   │   └── EventFilterBar/   # Category filter bar (props-based)
│   └── epic/
│       ├── EpicPhotoCard/    # Photo card (props-based)
│       └── EpicDatePicker/   # Date navigation (props-based)
└── pages/
    ├── Home.tsx          # Globe + live sidebar
    ├── Events.tsx        # Event list with category filter
    ├── EventDetail.tsx   # Single event detail (nested route: /events/:id)
    └── EarthGallery.tsx  # EPIC photo grid with date picker
```

---

## Routes

```
/             → Home (Globe + sidebar)
/events       → Natural disaster event list
/events/:id   → Event detail (nested route)
/earth        → Earth photo gallery
```

---

## Event Categories

| Category | Color |
|---|---|
| Wildfires | 🟠 |
| Floods | 🔵 |
| Severe Storms | 🟣 |
| Earthquakes | 🟤 |
| Volcanoes | 🔴 |
| Drought | 🟡 |
| Landslides | 🤎 |
| Snow | 🩵 |
| Sea & Lake Ice | 🩵 |
| Dust & Haze | 🟤 |
| Water Color | 🩵 |
| Temperature Extremes | 🟠 |
| Manmade | ⚫ |
