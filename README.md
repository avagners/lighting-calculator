# 💡 Lighting Calculator

Modern single-page application (SPA) for calculating ideal room lighting with stunning atmospheric design.

![Lighting Calculator](./preview.png)

## ✨ Features

- **Tactile Design** — glassmorphism, smooth animations, glowing effects
- **SNiP Compliant** — calculations based on SNiP 23-05-95 "Natural and Artificial Lighting"
- **Visualization** — room layout with real-time fixture placement
- **Responsive** — works perfectly on mobile devices
- **Data Persistence** — parameters saved to localStorage
- **Shareable URL** — share your calculations via link
- **Test Coverage** — 118 tests for business logic, hooks, and components

## 🧪 Testing

The application is fully tested (118 tests):

```bash
# Run all tests
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

See [TESTING.md](./TESTING.md) for details.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 🎨 Design System

### Color Palette

| Color | Value | Description |
|-------|-------|-------------|
| `#0A0A0A` | Background | Deep black background |
| `#FFB347` | Primary Warm | Warm amber accent |
| `#4A90E2` | Primary Cool | Cool blue accent |

### Effects

- **Glassmorphism** — semi-transparent cards with backdrop-blur
- **Glow Shadows** — glowing shadows instead of regular ones
- **Animated Background** — floating light spots

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── calculator/      # Calculator forms
│   ├── visualization/   # Room visualization
│   └── layout/          # Layout components
├── context/             # Global state context
├── hooks/               # Custom hooks
├── lib/                 # Calculation utilities
├── tests/               # Test files
└── types/               # TypeScript types
```

## 🧮 Calculation Formula

Calculations are based on the formula:

```
Φ = (E × S × K × Z) / η
```

Where:
- **Φ** — luminous flux per lamp (lm)
- **E** — illuminance norm (lx) — depends on room type
- **S** — room area (m²)
- **K** — maintenance factor (1.2)
- **Z** — uniformity factor (1.1)
- **η** — utilization factor

### Illuminance Norms (SNiP)

| Room Type | Norm (lx) |
|-----------|-----------|
| Bedroom | 150 |
| Living Room | 200 |
| Kitchen | 300 |
| Office | 300 |
| Bathroom | 250 |
| Nursery | 200 |

## 🛠 Technologies

- **React 18** + TypeScript
- **Tailwind CSS v4** — custom theme styling
- **Framer Motion** — smooth animations
- **Lucide Icons** — minimalistic icons
- **Vite** — fast build and HMR
- **Vitest** + React Testing Library — testing

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Tests
npm run test:run
```

## 🏷️ Versioning

This project uses Semantic Versioning with automatic CHANGELOG generation.

```bash
# Patch release (1.0.0 → 1.0.1)
npm run release

# Minor release (1.0.0 → 1.1.0)
npm run release:minor

# Major release (1.0.0 → 2.0.0)
npm run release:major
```

See [VERSIONING.md](./VERSIONING.md) for details.

## 📄 License

MIT

## 👨‍💻 Author

Created with ❤️ for calculating ideal lighting
