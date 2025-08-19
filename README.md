# Ex-Facta

**Structural Engineering Purlin Design Application**

Ex-Facta is a comprehensive structural engineering application built with Next.js for purlin design and load case analysis. The platform provides engineers with tools for configuring purlin systems, managing load cases, and analyzing structural designs with an intuitive web-based interface.

## 🚀 Features

- **Purlin Design System**: Complete configuration for Exacta-C and Exacta-Z purlin types
- **Span Configuration**: Dynamic span setup with flexible length and sizing options
- **Load Case Management**: Primary and combined load case configuration with strength/serviceability analysis
- **Interactive Visualizations**: D3.js-powered plan canvas with zoom controls
- **Professional UI**: Responsive design with accessibility features and brand styling
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular React components following engineering design patterns

## 📁 Project Structure

```
ex-facta/
├── src/
│   ├── components/           # React components
│   │   ├── layout/          # Layout components
│   │   │   ├── AppHeader.tsx # Two-row header with logo and banner
│   │   │   └── index.ts     # Barrel exports
│   │   ├── BridgingConfigTable.tsx      # Bridging spacing configuration
│   │   ├── CombinedLoadCasesComponent.tsx # Combined load cases management
│   │   ├── Header.tsx                   # Original header component
│   │   ├── LoadCaseTypeSelector.tsx     # Primary/Combined toggle
│   │   ├── LoadLocationComponent.tsx    # Load position configuration
│   │   ├── PlanCanvas.tsx              # D3-based visualization
│   │   ├── PrimaryLoadCasesComponent.tsx # Primary load cases management
│   │   ├── ProjectForm.tsx             # Project name and description
│   │   ├── PurlinSizeModeSelector.tsx  # Size mode selection
│   │   ├── PurlinTypeSelector.tsx      # Exacta-C/Z toggle
│   │   ├── SheetingRestraintSelector.tsx # Yes/No restraint toggle
│   │   ├── SpanConfigTable.tsx         # Span lengths and sizes
│   │   ├── SpanNumberInput.tsx         # Number of spans input
│   │   ├── SpanTypeSelector.tsx        # 9-option span configurations
│   │   └── SupportConfigTable.tsx      # Support lap configuration
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx       # Landing page with disclaimer
│   │   ├── project.tsx     # Main project configuration
│   │   ├── loadCases.tsx   # Load cases configuration
│   │   └── menu.tsx        # Main menu with full-screen background
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts        # Core types (Material, Project, SpanInfo)
│   │   └── loadCases.ts    # Load case related types
│   └── services/           # API services
└── public/images/          # Project assets (icons, banners, backgrounds)
```

## 🛠 Tech Stack

- **Frontend**: Next.js, React 18, TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **Visualizations**: D3.js
- **Package Manager**: npm
- **Linting**: ESLint
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm

## 🚀 Getting Started

1. **Clone the repository** (if from git):

   ```bash
   git clone <repository-url>
   cd ex-facta
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

### Layout Components

**AppHeader**: Professional two-row header component featuring:
- Row 1: White background with EX-facta logo and branded text
- Row 2: Full-width banner image with responsive clipping
- Brand red styling and responsive typography

### Purlin Design Components

**PurlinTypeSelector**: Toggle between Exacta-C and Exacta-Z purlin types with visual icons

**SpanTypeSelector**: Vertical list of 9 span configuration options with corresponding imagery

**SpanConfigTable**: Dynamic table for managing span lengths and purlin sizes based on span count

**SupportConfigTable**: Configuration interface for support lap percentages

**BridgingConfigTable**: Bridging spacing configuration per span with field inputs

### Load Case Management

**PrimaryLoadCasesComponent**: Manage up to 20 primary load cases with strength/serviceability classification

**CombinedLoadCasesComponent**: Combined load case management with deflection limits

**LoadLocationComponent**: Configure load positions along spans with reference points

### Visualization

**PlanCanvas**: D3.js-based structural visualization with zoom controls and interactive features

## 🏗️ Application Pages

### Landing Page (`pages/index.tsx`)
Professional disclaimer page with full-viewport background, hero banner, disclaimer panel, and Accept/Exit buttons with accessibility features.

### Menu Page (`pages/menu.tsx`)
Main navigation interface featuring:
- 2×3 button grid for information modals (Exacta® Info, Stramit Info, Material Info, Sample Specification, About Us, Project Gallery)
- Full-width "Enter Projects" button
- Comprehensive modal system with dual-section editable content

### Project Page (`pages/project.tsx`)
Main configuration interface with left/right panel layout for purlin type selection, span configuration, and project settings.

### Load Cases Page (`pages/loadCases.tsx`)
Dedicated interface for managing primary and combined load cases with detailed configuration options.

## 🔧 Development Features

- **TypeScript Integration**: Full type safety with custom interfaces for Project, SpanInfo, LoadCase, and BridgingSpacingInfo
- **Accessibility**: Focus trap implementation, keyboard navigation, ARIA attributes, and screen reader support
- **Responsive Design**: Mobile-first approach with CSS Grid layouts and responsive breakpoints
- **Component Architecture**: Modular design with barrel exports and reusable utility components

## 🔮 Future Enhancements

- Complete D3 visualization implementation in PlanCanvas component
- Form validation across all input components
- Data persistence and save/load functionality
- PDF/report generation capabilities
- Enhanced testing suite with unit and integration tests
- Performance optimization for complex table re-rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

Built for structural engineers with precision and performance in mind.
