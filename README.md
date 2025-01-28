# 🚀 Frontend React Project Standardization

## 📋 Table of Contents

1. [🎯 Introduction](#-introduction)
2. [⚡ Quick Start](#-quick-start)
   - [📝 Prerequisites](#-prerequisites)
   - [🐳 Using Docker (Recommended)](#-using-docker-recommended)
   - [💻 Without Docker](#-without-docker)
3. [📁 Project Structure](#-project-structure)
   - [🗂️ Folder Structure](#️-folder-structure)
   - [🔗 Absolute Imports](#-absolute-imports)
4. [⚙️ Development Setup](#️-development-setup)
   - [🛠️ Tooling](#tooling)
   - [📦 Dependencies](#dependencies)
5. [📝 Code Style & Conventions](#-code-style--conventions)
   - [⚛️ JSX and React Components](#jsx-and-react-components)
   - [💾 State Management](#state-management)
   - [🎨 Component Design](#component-design)
   - [✍️ Naming Conventions](#naming-conventions)
6. [📄 License](#license)

## 🎯 Introduction

This is a standardized React frontend template that follows best practices and modern development workflows. It comes with Docker support, comprehensive tooling, and established coding conventions to ensure high-quality, maintainable code.

## ⚡ Quick Start

### 📝 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose (for containerized development)

### 🐳 Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Build and Run using Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the Docker image
   - Start the container
   - Run the development server at http://localhost:5173

3. **Stop the Container**
   ```bash
   docker-compose down
   ```

#### 🔥 Development Features

- Hot reload enabled with volume mounting
- Node modules are persisted in a Docker volume
- Environment configured for development
- Automatic container restart unless manually stopped

### 💻 Without Docker

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   Access the application at http://localhost:5173

## 📁 Project Structure

### 🗂️ Folder Structure

#### 📁 Modular Approach

- Each feature or section lives in its own folder for better organization.
- Example folder structure:
  ```
  src/
  ├── modules/
  │   └── FeatureName/
  │       ├── partials/ (shared components)
  │       ├── router/ (module-based routing)
  │       ├── utils/ (utilities for the module)
  │       ├── views/ (module-specific pages)
  │       └── tests/ (optional)
  ├── services/ (feature-specific actions, reducers, slices)
  ```

### 🔗 Absolute Imports

- Configure `jsconfig.json` or `tsconfig.json` for absolute imports to avoid relative path hell.
- Example configuration:
  ```json
  {
    "compilerOptions": {
      "baseUrl": "src",
      "paths": {
        "@/*": ["*"]
      }
    }
  }
  ```

## ⚙️ Development Setup

### 🛠️ Running the Project

You can run the project using one of the following methods:

1. **Using npm**  
   Run the development server locally with the following command:

   ```bash
   npm run dev
   ```

   Ensure all dependencies are installed beforehand with:

   ```bash
   npm install
   ```

2. **Using Docker**  
   Build and run the project using Docker:
   ```bash
   docker build -t react-frontend .
   docker run -p 3000:3000 react-frontend
   ```
   Replace `react-frontend` with your desired image name.

### 🔧 Tooling

1. **Husky**

   - Configure pre-commit and pre-push hooks to enforce linting, testing, and formatting standards.
   - Example setup:
     ```bash
     npx husky-init && npm install
     ```
   - Use `lint-staged` to lint only staged files during commits.

2. **ESLint**

   - Enforce consistent code style and detect errors.
   - Extend from an existing ESLint configuration.
   - Integrate ESLint with Husky pre-commit hooks.

3. **Prettier**
   - Automatically format code for consistency.
   - Integrate Prettier with ESLint to avoid conflicts.

### 📦 Dependencies

- **React**: Use version 18.x or the latest stable release.
- **Redux Toolkit**: Preferred for state management. Avoid directly using Redux without the Toolkit.
- **React Router DOM**: For handling navigation.
- Install additional dependencies like Axios or React Query based on project requirements.

---

### 📁 Folder Structure

#### 🔗 Absolute Imports

- Configure `jsconfig.json` or `tsconfig.json` for absolute imports to avoid relative path hell.

#### 📁 Modular Approach

- Each feature or section lives in its own folder for better organization.
- Example folder structure:
  ```
  src/
  ├── modules/
  │   └── FeatureName/
  │       ├── partials/ (shared components)
  │       ├── router/ (module-based routing)
  │       ├── utils/ (utilities for the module)
  │       ├── views/ (module-specific pages)
  │       └── tests/ (optional)
  ├── services/ (feature-specific actions, reducers, slices)
  ```

---

## 📝 Code Style & Conventions

### ⚛️ JSX and React Components

- Use **functional components** and hooks; avoid class components.
- Destructure props and state for cleaner code.
- Use `useEffect` with proper dependency arrays for side effects.
- Use **PropTypes** or **TypeScript** for type-checking.
- Ensure all rendered lists have a unique `key` prop.

### 💾 State Management

- Use **Redux Toolkit** for application-level state management.
- Organize state using `createSlice` for modular and maintainable state logic.

### 🎨 Component Design

- Keep components **small, reusable, and single-purpose**.
- Separate presentation and logic:
  - **Presentational Components**: Handle UI rendering.
  - **Container Components**: Handle logic and state.

### ✍️ Naming Conventions

Here are our naming conventions with examples of good and bad practices:

#### 📂 File and Folder Names

✅ **Good Examples**:

```
src/
├── components/
│   ├── UserProfile.tsx
│   └── NavigationBar.tsx
├── utils/
│   ├── formatDate.ts
│   └── apiService.ts
└── tests/
    └── UserProfile.test.tsx
```

❌ **Bad Examples**:

```
src/
├── components/
│   ├── userprofile.tsx      // Wrong: Use PascalCase for components
│   └── navigation_bar.tsx   // Wrong: Use PascalCase for components
├── Utils/                   // Wrong: Use lowercase for folders
│   ├── FormatDate.ts       // Wrong: Use camelCase for utilities
│   └── API_service.ts      // Wrong: Inconsistent naming
└── tests/
    └── userprofile.spec.tsx // Wrong: Use PascalCase for test files
```

#### 🔄 Component Names and Props

✅ **Good Examples**:

```tsx
// Component naming
const UserProfile: React.FC<UserProfileProps> = ({ userName, onUpdate }) => { ... }
const NavigationBar: React.FC<NavProps> = ({ items, onSelect }) => { ... }

// Usage
<UserProfile userName="John" onUpdate={handleUpdate} />
<NavigationBar items={navItems} onSelect={handleSelect} />
```

❌ **Bad Examples**:

```tsx
// Wrong: Inconsistent naming, unclear purpose
const user_profile: React.FC = (props) => { ... }
const Nav: React.FC = ({ i, clk }) => { ... }  // Wrong: Unclear prop names

// Wrong: Inconsistent prop naming
<user_profile UserName="John" handle_update={updateFn} />
<Nav ITEMS={navItems} on_select={selectFn} />
```

#### 🔤 Variables and Functions

✅ **Good Examples**:

```tsx
// Variables
const isUserLoggedIn = true;
const maxRetryAttempts = 3;
const userProfileData = { ... };

// Functions
const handleSubmit = () => { ... };
const fetchUserData = async () => { ... };
const calculateTotalPrice = (items: Item[]) => { ... };
```

❌ **Bad Examples**:

```tsx
// Wrong: Inconsistent naming, unclear purpose
const logged = true;              // Wrong: Unclear boolean naming
const MAX = 3;                    // Wrong: Unclear purpose
const data = { ... };            // Wrong: Too generic

// Wrong: Inconsistent verb usage, unclear purpose
const submit = () => { ... };     // Wrong: Use handle prefix for event handlers
const userData = async () => { ... }; // Wrong: Function name should be a verb
const total = (i: Item[]) => { ... }; // Wrong: Unclear purpose
```

#### 🎯 CSS Class Names

✅ **Good Examples**:

```css
/* Traditional CSS */
.button-primary { ... }
.user-profile-container { ... }
.nav-item-active { ... }

/* CSS Modules */
.buttonPrimary { ... }
.userProfileContainer { ... }
.navItemActive { ... }
```

❌ **Bad Examples**:

```css
/* Wrong: Inconsistent naming, unclear purpose */
.btn { ... }                /* Wrong: Too short/unclear */
.UserProfile { ... }        /* Wrong: PascalCase in CSS */
.nav_item_active { ... }    /* Wrong: Using underscores */

/* Wrong: Unclear purpose, poor naming */
.x { ... }                  /* Wrong: Non-descriptive */
.red { ... }               /* Wrong: Named by appearance not purpose */
.style1 { ... }            /* Wrong: Generic naming */
```

#### 🪝 Custom Hooks

✅ **Good Examples**:

```tsx
const useWindowSize = () => { ... };
const useUserAuthentication = () => { ... };
const useFetchData = (url: string) => { ... };
```

❌ **Bad Examples**:

```tsx
// Wrong: Missing 'use' prefix, unclear purpose
const windowSize = () => { ... };     // Wrong: Missing 'use' prefix
const auth = () => { ... };           // Wrong: Too short, missing 'use' prefix
const useData = () => { ... };        // Wrong: Too generic
```

#### 🔠 Constants

✅ **Good Examples**:

```tsx
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_USER_SETTINGS = { ... };
const API_ENDPOINTS = {
  USER_PROFILE: '/api/user',
  AUTHENTICATION: '/api/auth'
};
```

❌ **Bad Examples**:

```tsx
// Wrong: Inconsistent naming, poor conventions
const MaxRetry = 3;                // Wrong: Should use UPPER_CASE
const defaultSettings = { ... };    // Wrong: Should use UPPER_CASE
const apiUrls = {                  // Wrong: Should use UPPER_CASE
  profile: '/api/user',            // Wrong: Inconsistent naming
  AUTH: '/api/auth'                // Wrong: Mixing conventions
};
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:ui` - Run tests in UI mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
