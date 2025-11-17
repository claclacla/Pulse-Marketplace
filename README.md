# Marketplace Frontend Application

A React-based marketplace application that integrates with a backend API for authentication, product browsing, and shopping cart management. Built as a frontend assessment demonstrating core React concepts, state management, routing, and API integration.

## 🚀 Features

### Authentication
- **Login Page** - User authentication with email and password
- **JWT Token Storage** - Secure token storage in localStorage
- **Protected Routes** - Route guards that redirect unauthenticated users
- **Logout Functionality** - Secure logout with token cleanup

### Products
- **Product Listing** - Browse all available products with name, price, and images
- **Product Details** - View detailed information for individual products
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Comprehensive error messages for API failures

### Shopping Cart
- **Add to Cart** - Add products to shopping cart from product detail page
- **Cart Management** - View all cart items with quantities and prices
- **Update Quantities** - Increase or decrease item quantities
- **Remove Items** - Remove items from cart
- **Cart Count Badge** - Display total items count in navigation bar
- **Total Calculation** - Automatic price calculation for cart total

### Navigation
- **Responsive Navbar** - Navigation bar with login/logout states
- **Cart Link** - Quick access to shopping cart with item count indicator
- **Product Navigation** - Easy navigation between products and cart

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher)
2. **Backend API** running on `http://localhost:3000/api`
   - The application expects the following endpoints:
     - `POST /api/auth/login` - User authentication
     - `GET /api/products` - Get all products
     - `GET /api/products/:id` - Get product by ID

### Test Credentials

```
Email: john.doe@example.com
Password: password123
```

## 🛠️ Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

1. **Start the backend API** (if not already running):
   ```bash
   # Make sure your backend API is running on localhost:3000
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   - Navigate to [http://localhost:5173](http://localhost:5173)
   - The application will automatically redirect to `/products` (protected route)
   - You'll be redirected to `/login` if not authenticated

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Cart.tsx              # Shopping cart component
│   ├── Navbar.tsx            # Navigation bar with login/logout
│   ├── ProductCard.tsx       # Product card component for listings
│   ├── ProtectedRoute.tsx    # Route guard component
│   └── ui/
│       └── button.tsx        # Reusable button component (Shadcn/ui)
│
├── context/
│   ├── AuthContext.tsx       # Authentication state management
│   └── CartContext.tsx       # Shopping cart state management
│
├── pages/
│   ├── Login.tsx             # Login page
│   ├── Products.tsx          # Product listing page
│   ├── ProductDetail.tsx     # Product detail page
│   └── CartPage.tsx          # Shopping cart page
│
├── services/
│   └── api.ts                # API service layer with axios
│
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
│
├── App.tsx                   # Main app component with routing
├── main.tsx                  # Application entry point
└── index.css                 # Global styles with Tailwind CSS
```

## 🔌 API Integration

The application integrates with a RESTful API. All API calls are centralized in `src/services/api.ts`:

### Authentication
- **POST** `/api/auth/login`
  - Body: `{ email: string, password: string }`
  - Response: `{ success: true, data: { token: string, user: {...} } }`

### Products
- **GET** `/api/products`
  - Headers: `Authorization: Bearer <token>` (optional)
  - Response: `{ success: true, data: { products: [...] } }`

- **GET** `/api/products/:id`
  - Response: `{ success: true, data: { product: {...} } }`

### Automatic Token Injection
- Axios interceptor automatically adds JWT token to all authenticated requests
- Token is read from localStorage on every request

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - UI component library (Button component)
- **Context API** - State management for Auth and Cart

## 🔐 State Management

### Authentication Context (`AuthContext`)
- Manages user authentication state
- Stores JWT token in localStorage
- Provides `login()`, `logout()`, and `isAuthenticated` to components

### Cart Context (`CartContext`)
- Manages shopping cart state
- Provides cart operations: `addItem()`, `removeItem()`, `updateQuantity()`
- Calculates total price and item count

## 🛡️ Protected Routes

Routes are protected using the `ProtectedRoute` component:
- `/products` - Product listing (protected)
- `/products/:id` - Product detail (protected)
- `/cart` - Shopping cart (protected)
- `/login` - Login page (public)

Unauthenticated users are automatically redirected to `/login`.

## 🎯 Key Implementation Details

1. **Token Persistence** - JWT tokens are stored in localStorage and persist across page refreshes
2. **Auto Token Injection** - Axios interceptors automatically add tokens to API requests
3. **Error Handling** - Comprehensive error handling with user-friendly messages
4. **Loading States** - Loading indicators for better UX during API calls
5. **Image Handling** - Supports multiple image field names and handles missing images gracefully
6. **Responsive Design** - Mobile-first responsive layout with Tailwind CSS

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🧪 Testing

```bash
npm test -- --watch
```

## 📄 License

This project was created as a frontend assessment.

---

**Note**: Make sure the backend API is running on `localhost:3000` before starting the frontend application.
