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
└── public/images/          # Project assets (purlin icons, span type images, background.png, logo, banner)
```

## Key Components Implemented

### Layout Components

- **AppHeader**: Two-row layout header component:
  - Row 1: White background with left-aligned EX-facta logo icon and "EX-facta™" text
  - Row 2: Full-width banner image (EX-facta-banner.png) that clips on right when viewport narrows, anchored left
  - Responsive design ensuring left elements always remain visible
  - Uses new assets: EX-facta-logo.png (1307×1136) and EX-facta-banner.png (10000×636)

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

### UI Components

- **Modal**: Accessible modal component with:
  - Focus trap implementation
  - Keyboard navigation (ESC to close, Tab cycling)
  - Backdrop click to close
  - ARIA attributes for screen readers
  - Dual text area sections with editable content
  - Automatic focus management and restoration

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

Professional disclaimer landing page featuring:
- Full-viewport background image (`/images/background.png`)
- AppHeader with two-row layout design (logo + banner)
- No footer component (removed for cleaner design)
- CSS Grid layout with 40/60 content split (responsive stacking on mobile):
  - **Left Column (40%)**: Hero banner → Disclaimer panel → Copyright line
  - **Right Column (60%)**: Action buttons positioned at bottom-left corner
- Hero banner constrained to left column with responsive height using CSS clamp
- Disclaimer panel with title bar and editable multiline textarea with custom scrollbar
- Brand red Accept and Exit buttons with hover states and accessibility features
- Comprehensive disclaimer text for engineering software usage
- Accessible design with proper labeling and focus management
- Graceful Exit button fallback when window.close() is blocked by browser

### Project Configuration Page (`pages/project.tsx`)

Main configuration interface with:

- Left panel: Purlin type, span type, span count selectors
- Right panel: Project form, plan canvas, configuration tables
- Conditional rendering based on span count and purlin type

### Load Cases Page (`pages/loadCases.tsx`)

Load case management interface with primary and combined load case components

### Menu Page (`pages/menu.tsx`)

Main menu page featuring:
- Full-viewport background image from `/images/background.png`
- AppHeader with two-row layout (logo + banner design)
- CSS Grid layout with 40/60 content split (responsive stacking on mobile):
  - **Left Column (40%)**: Hero banner → 2×3 button grid → Full-width Enter Projects button → Copyright line
  - **Right Column (60%)**: Reserved empty space
- Hero banner constrained to left column with responsive height using CSS clamp
- Six black buttons with white text in 2×3 grid layout with custom corner styling:
  - Row 1: **Exacta® Info**, **Stramit Info**
  - Row 2: **Material Info**, **Sample Specification**  
  - Row 3: **About Us**, **Project Gallery**
- Full-width red **Enter Projects** button with black text (routes to `/project`)
- Custom asymmetric button corner styling (square top-left/bottom-right, rounded top-right/bottom-left)
- Accessible modal system with comprehensive content:
  - **Exacta® Info**: Modal with product specifications and technical details
  - **Stramit Info**: Modal with company history and current operations
  - **Material Info**: Modal with steel properties and coating systems
  - **Sample Specification**: Modal with design standards and installation guidelines
  - **About Us**: Modal with mission statement and contact information
  - **Project Gallery**: Modal with project gallery and installation examples
- Modal accessibility features:
  - Focus trapping and restoration
  - ESC key and backdrop click to close
  - Dual-section content with editable text areas
  - Screen reader compatibility
- Responsive design:
  - Desktop: 40/60 grid split with left-column content organization
  - Mobile: Single column stacking with full-width layout
- Copyright line pinned to bottom of left column
- Semantic HTML structure with proper landmarks

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

### Recent Design Updates (AppHeader Redesign)

**Header Component Redesign**:
- Redesigned `AppHeader` with two-row layout matching new visual requirements
- Row 1: White background with left-aligned EX-facta logo icon and "EX-facta™" text
- Row 2: Full-width banner image that clips on right when viewport narrows (left-anchored)
- Removed all previous props (title, version, tagline) for simplified, visual-focused design
- Uses new assets: `EX-facta-logo.png` (1307×1136) and `EX-facta-banner.png` (10000×636)

**Footer Component Removal**:
- Deleted `AppFooter.tsx` component entirely for cleaner page design
- Updated layout barrel exports to remove footer
- Removed footer usage from both `pages/index.tsx` and `pages/menu.tsx`

**Background Image Update**:
- Updated both landing and menu pages to use `/images/background.png` instead of `.jpg`
- Maintained existing full-viewport, object-cover behavior

**Responsive Behavior**:
- Logo and text in header row 1 never clip (flex-shrink-0, whitespace-nowrap)
- Banner image in row 2 anchors left and clips right as viewport narrows (object-left)
- No horizontal scrollbars introduced by design changes
- Maintains accessibility with proper alt text and ARIA attributes

**Brand Styling Refinements**:
- Added brand red color (`#E4002B`) to Tailwind config under `brand.red`
- Applied brand red to "EX-facta™" text in header for proper branding
- Implemented responsive text sizing: `text-sm sm:text-base md:text-lg lg:text-xl`
- Enhanced banner height control using CSS `clamp(48px, 8vw, 96px)` to prevent oversizing on wide screens
- Banner remains left-anchored with right truncation, responsive but capped height
- Improved vertical rhythm with responsive padding: `py-2 md:py-3`
