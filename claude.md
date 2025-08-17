# Ex-Facta Project - Claude Development History

## Project Overview

Ex-Facta is a structural engineering application for purlin design and load case analysis. The project has been evolved using Cursor IDE and now contains a comprehensive suite of React components for structural engineering calculations.

## Current Project Structure

```
ex-facta/
├── src/
│   ├── components/           # React components
│   │   ├── layout/          # Layout components
│   │   │   ├── AppHeader.tsx
│   │   │   ├── AppFooter.tsx
│   │   │   └── index.ts     # Barrel exports
│   │   ├── BridgingConfigTable.tsx
│   │   ├── CombinedLoadCasesComponent.tsx
│   │   ├── Header.tsx
│   │   ├── LoadCaseTypeSelector.tsx
│   │   ├── LoadLocationComponent.tsx
│   │   ├── PlanCanvas.tsx
│   │   ├── PrimaryLoadCasesComponent.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── PurlinSizeModeSelector.tsx
│   │   ├── PurlinTypeSelector.tsx
│   │   ├── SheetingRestraintSelector.tsx
│   │   ├── SpanConfigTable.tsx
│   │   ├── SpanNumberInput.tsx
│   │   ├── SpanTypeSelector.tsx
│   │   └── SupportConfigTable.tsx
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx       # Landing page with "Enter Projects" link
│   │   ├── project.tsx     # Main project configuration page
│   │   ├── loadCases.tsx   # Load cases configuration page
│   │   └── menu.tsx        # Main menu page with full-screen background
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts        # Main types (Material, Project, SpanInfo, etc.)
│   │   └── loadCases.ts    # Load case related types
│   └── services/           # API services
└── public/images/          # Project assets (purlin icons, span type images, background, logo)
```

## Key Components Implemented

### Layout Components

- **AppHeader**: Reusable header component with EX-facta branding, peach background (#FFD9B7), and three configurable text lines (title, version, tagline)
- **AppFooter**: Responsive footer with copyright text (left) and Stramit logo (right), includes white background with transparency

### Core Purlin Design Components

- **PurlinTypeSelector**: Toggle between Exacta-C and Exacta-Z purlin types
- **SpanTypeSelector**: 9-option vertical list selector for span configurations
- **SpanNumberInput**: Input for number of spans (1-10)
- **SpanConfigTable**: Dynamic table for span lengths and purlin sizes
- **SupportConfigTable**: Support configuration with lap percentages
- **BridgingConfigTable**: Bridging spacing configuration per span

### Load Case Management Components

- **LoadCaseTypeSelector**: Toggle between Primary (PLCs) and Combined (CLCs) load cases
- **PrimaryLoadCasesComponent**: Manage up to 20 primary load cases with strength/serviceability types
- **CombinedLoadCasesComponent**: Manage combined load cases with deflection limits
- **LoadLocationComponent**: Configure load positions along spans

### Utility Components

- **ProjectForm**: Project name and description inputs
- **SheetingRestraintSelector**: Yes/No toggle for sheeting restraint
- **PlanCanvas**: D3-based visualization placeholder with zoom controls

## Type System

### Core Types (`src/types/index.ts`)

```typescript
export type Project = { name: string; description: string };
export type SpanInfo = { span: number; length: number; purlinSize: string };
export type SupportInfo = {
  support: number;
  lap: boolean;
  leftPercentage: number;
  rightPercentage: number;
};
export type BridgingSpacingInfo = {
  span: number;
  bridgings: number;
  field1: number;
  field2: number;
  field3: number;
};
```

### Load Case Types (`src/types/loadCases.ts`)

```typescript
export type LoadCase = { Name: string };
export type PrimaryLoadCase = {
  Name: string;
  Cases: LoadCase[];
  Type: 'Strength' | 'Serviceability';
  DeflectionLimit: number;
};
export type CombinedLoadCase = {
  Name: string;
  Cases: LoadCase[];
  Type: 'Strength' | 'Serviceability';
  DeflectionLimit: number;
};
export type LoadLocation = {
  Title: string;
  PointOfReference: 'leftEnd' | 'rightEnd';
  LengthType: 'mm' | 'length';
  Length: number;
};
```

## Pages Structure

### Landing Page (`pages/index.tsx`)

Simple landing page with a single "Enter Projects" button linking to `/project`

### Project Configuration Page (`pages/project.tsx`)

Main configuration interface with:

- Left panel: Purlin type, span type, span count selectors
- Right panel: Project form, plan canvas, configuration tables
- Conditional rendering based on span count and purlin type

### Load Cases Page (`pages/loadCases.tsx`)

Load case management interface with primary and combined load case components

### Menu Page (`pages/menu.tsx`)

Main menu page featuring:
- Full-viewport background image from `/images/background.jpg`
- AppHeader with EX-facta branding in peach color
- AppFooter with Stramit branding
- Semantic HTML structure with proper landmarks
- Responsive layout ready for future menu button additions

## Development Notes

### Component Design Patterns

- All components use TypeScript with full type safety
- Tailwind CSS for consistent styling
- Controlled components with value/onChange props
- Accessible markup with ARIA attributes
- Conditional rendering based on user selections

### State Management

- Local React state (useState) for component data
- Parent components manage child component states
- No global state management (Redux/Context) currently implemented

### Styling Approach

- Tailwind CSS utility classes
- Custom brand colors: `brand.peach` (#FFD9B7) for header backgrounds
- Consistent spacing with space-y-4, gap-4 patterns
- Highlight selected items with bg-yellow-200, ring-2 styles
- Responsive design with md: breakpoints

### Asset Integration

- Images stored in `/public/images/`
- Purlin type icons: `icon-exacta-c.jpg`, `icon-exacta-z.jpg`
- Span type images: `span-type-1.jpg` through `span-type-9.jpg`
- Branding assets: `stramit-logo.jpg` (footer logo), `background.jpg` (full-page background)

## Testing & Build Commands

The project uses standard Next.js commands:

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint checking

## Future Development Areas

1. **D3 Visualization**: Complete the PlanCanvas component with actual purlin/span drawings
2. **Form Validation**: Add comprehensive input validation across all components
3. **Data Persistence**: Implement save/load functionality for project configurations
4. **Export Features**: Add PDF/report generation capabilities
5. **Testing**: Implement unit and integration tests for components
6. **Performance**: Optimize re-rendering in complex table components
7. **Accessibility**: Enhanced keyboard navigation and screen reader support

## Dependencies

Key dependencies include:

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- D3.js (for visualizations)

## Development Evolution

The project was significantly evolved using Cursor IDE with detailed component specifications. Each component was built with specific requirements for accessibility, TypeScript typing, and Tailwind styling. The evolution document contains comprehensive specifications for each component's behavior, props, and UI requirements.
