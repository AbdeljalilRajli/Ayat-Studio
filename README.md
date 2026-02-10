# Ayat Studio

A calm, modern editor to create beautiful Quran verse wallpapers inspired by Islamic geometry.

## Features

- **Verse selection**
  Choose from a curated list of verses with Arabic + translation.
- **Backgrounds**
  Solid color or curated **gradient presets**, plus optional background image upload.
- **Islamic patterns**
  Pattern presets backed by SVGs in `public/patterns svgs/`.
- **Pattern controls**
  Intensity slider and **pattern color** (tint) picker.
- **Borders**
  Multiple ornamental border styles.
- **Typography**
  Arabic font selection, font sizing, translation toggle.
- **Export to PNG**
  Export Story (9:16), Square (1:1), and Desktop (16:9).

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- html2canvas (for PNG export)
- lucide-react (icons)

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage

1. Pick a verse.
2. Choose a background:
   - **Solid** color, or
   - **Gradient** preset, or
   - Upload a background image.
3. Add a pattern overlay and tune:
   - **Intensity**
   - **Pattern color**
4. Pick border + typography.
5. Export for your desired format.

## Patterns folder

Patterns are loaded from:

```
public/patterns svgs/
```

If you add or rename SVGs there, update `src/data/patterns.ts` to include them.

## Export notes

- Export uses `html2canvas`. To make patterns export reliably, SVG pattern tiles are rasterized to PNG during export.
- If an SVG pattern fails to export, make sure it loads correctly in the browser (valid SVG, no external references).

## Screenshots

- Add screenshots/gifs here (recommended):
  - `./docs/screenshot-1.png`
  - `./docs/screenshot-2.png`

## Contributing

Pull requests are welcome.

## License

Add a license that matches how you want to share this project (MIT is a common choice).
