<h1 align="center">
  <a href="#"> Clothing Store </a>
</h1>

## About

The goal is to build a simple **Product Listing Page (PLP)** where users can browse products, add them to a cart, and view cart details.

---

### Pre-requisites

- Node.js (v20.19.0 or later recommended)
- npm

#### Running the web application

```bash

# Clone this repository
$ git clone <repo_url>

# Access the project folder in your terminal
$ cd <repo_url>

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The application will open on the port: 5173 - go to http://localhost:5173

# Run tests
$ npm run test
$ npm run coverage

# Run cypress tests
npx cypress open

```

---

## Tech Stack

The following tools were used in the construction of the project:

- React + Vite
- Tailwind CSS
- React Router
- Vitest + React Testing Library
- Cypress
- clsx (For the classnames)
- lucide-react (For the icons)

---

## Features Implemented

- Product Listing Page

  - Fetches products from API:
  - Displays product image, title, price, and description.

- Cart

  - Add items multiple times, quantity is updated acordingly.
  - Cart shows product name, quantity, and total (price × quantity).
  - Cart UI implemented as a drawer for simplicity.
  - Persist cart state to localStorage (just to support the usecase of page refresh).

- Responsive Design

  - Works across desktop, tablet, and mobile screen sizes.

- Testing
  - Unit tests for components.
  - Integration tests for cart functionality.
  - Cypress tests for End to End testing.

---

## Design Decisions

- Kept the app simple and modular:

  - ProductList: fetch & display products
  - ProductCard: individual product details
  - Cart: manages items & total price
  - CartItem: UI for cart interactions

- State management:

  - Used React’s built-in state/hooks/Context API/local Storage.

- Error handling:
  - Error boundary page for all the routes.
  - Not found page for unknown route.

---
