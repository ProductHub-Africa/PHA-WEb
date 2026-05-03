# ProductHub Africa (PHA) Website

Welcome to the official repository for the ProductHub Africa (PHA) Website. This project is a modern, responsive web application built to showcase the PHA platform, its initiatives, and resources for product professionals in Africa.

## 🚀 Tech Stack

This project is built with a modern frontend stack to ensure high performance, maintainability, and a great developer experience:

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) - Lightning fast hot module replacement (HMR)
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer tooling
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development
- **Routing**: [React Router v6](https://reactrouter.com/) - Declarative routing for React
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful and consistent icon set
- **Charts/Data Visualization**: [Recharts](https://recharts.org/) - Composable charting library built on React components

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProductHub-Africa/PHA-WEb.git
   cd PHA-WEb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 📁 Project Structure

The project follows a feature-based architecture to keep code modular and scalable:

```text
PHA-WEb/
├── public/             # Static assets (images, favicons, logos, etc.)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, Buttons, etc.)
│   ├── features/       # Feature-specific modules (e.g., home page components)
│   ├── assets/         # CSS and other static files imported in JS
│   ├── App.tsx         # Main application component & routing setup
│   └── main.tsx        # React entry point
├── package.json        # Project metadata and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 📜 Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles TypeScript and builds the app for production into the `dist` folder.
- `npm run lint`: Runs ESLint to analyze the code and catch potential errors or stylistic issues.
- `npm run preview`: Bootstraps a local static web server that serves the files from the `dist` folder for previewing the production build.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ProductHub-Africa/PHA-WEb/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
