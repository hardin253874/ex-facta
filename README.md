# Ex-Facta

**Engineering Materials Selection Platform**

Ex-Facta is a modern Next.js application designed to help engineers select building materials and models based on real-world use cases. The platform provides comprehensive material data, sustainability metrics, and interactive visualizations to support informed decision-making in engineering projects.

## 🚀 Features

- **Material Database**: Comprehensive collection of engineering materials with detailed properties
- **Interactive Charts**: D3.js-powered visualizations for material comparison and analysis
- **Sustainability Metrics**: Environmental impact assessments for responsible material selection
- **Responsive Design**: Modern, mobile-first UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Well-organized codebase following React best practices

## 📁 Project Structure

```
ex-facta/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── charts/          # D3.js chart components
│   │   ├── Header.tsx       # Main navigation header
│   │   └── MaterialCard.tsx # Material display cards
│   ├── pages/               # Next.js pages (file-based routing)
│   │   ├── _app.tsx        # App wrapper
│   │   ├── _document.tsx   # HTML document structure
│   │   └── index.tsx       # Home page
│   ├── services/            # API and data service abstractions
│   │   └── materialService.ts
│   ├── hooks/               # Custom React hooks
│   │   └── useMaterials.ts
│   ├── utils/               # Helper functions
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── styles/              # Global styles
│       └── globals.css
├── public/                  # Static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: D3.js
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

## 🚀 Getting Started

1. **Clone the repository** (if from git):

   ```bash
   git clone <repository-url>
   cd ex-facta
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## 🎨 Key Components

### ExampleChart

Interactive D3.js bar chart component located in `src/components/charts/ExampleChart.tsx`. Features:

- Responsive SVG rendering
- Interactive tooltips
- Customizable dimensions and margins
- Color-coded data visualization

### MaterialCard

Displays material information in a clean, card-based layout:

- Material properties and specifications
- Sustainability scoring with visual indicators
- Cost information and use cases
- Responsive design for all screen sizes

### Material Service

Handles data fetching and management:

- Mock data service with realistic material information
- Async/await pattern for future API integration
- TypeScript interfaces for type safety

## 🌱 Sustainability Features

Ex-Facta emphasizes sustainable material selection through:

- Sustainability scoring system (0-100%)
- Environmental impact factors
- Carbon footprint considerations
- Renewable and recycled content tracking

## 🔮 Future Enhancements

- Real-time material pricing integration
- Advanced filtering and search capabilities
- Material comparison tools
- User authentication and project saving
- API integration with material suppliers
- Mobile application development

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

Built with ❤️ for engineers, by engineers.
