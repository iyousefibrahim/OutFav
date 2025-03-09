# OutFav E-Commerce

OutFav E-Commerce is a comprehensive e-commerce application built with a Node.js, Express, MongoDB, and Mongoose backend. The frontend is developed using Angular v19 with a focus on reusable components, state management using signals, and an optimized UI/UX powered by PrimeNG and Tailwind CSS.

## Features Implemented

### Backend

- **Node.js & Express:**
  - Server-side setup and API endpoints for CRUD operations.
- **MongoDB & Mongoose:**
  - Database integration and schema design.

#### User Authentication:
- JWT-based authentication.
- Password hashing using bcryptjs.
- Token verification middleware.

#### User Model & Routes:
- Register new users.
- Login users with token generation.
- Password validation and hashing.

#### Product Model & Routes:
- CRUD operations for products.
- Image upload functionality.
- Category association.

#### Cart Model & Routes:
- Add products to cart.
- Update product quantity.
- Remove products from cart.
- Clear cart.

#### Categories Model & Routes:
- CRUD operations for categories.
- Products associated with categories.

#### Customer Model & Routes:
- Manage customer information.
- Admin-level access for customer management.

#### Review Model & Routes:
- Add reviews to products.
- Update and delete reviews.
- Rating calculation.

#### Address Model & Routes:
- Manage shipping addresses.

#### Payment Integration:
- Stripe integration for checkout sessions.
- Create and manage payment intents.

### Frontend

- **Angular v19** for building a dynamic and scalable UI.
- **State Management using Signals** for efficient reactivity.
- **Reusable Components** to ensure modularity and maintainability.
- **PrimeNG & Tailwind CSS** for an elegant and responsive design.
- **ngx-spinner** for improved user experience during data fetching.
- **Routing & Lazy Loading** for performance optimization.
- **Authentication & Authorization** using JWT tokens.
- **Figma Design by Ali Norouzi** for a structured and modern UI.

### Security & Performance Enhancements

- **CORS:**
  - Cross-Origin Resource Sharing enabled.
- **Helmet:**
  - Securing HTTP headers.
- **Compression:**
  - Response body compression for performance optimization.
- **XSS Clean:**
  - Preventing XSS attacks.

#### Rate Limiting:
- Implemented rate limiting using `express-rate-limit` to prevent abuse.
- Limits the number of requests from a single IP address within a given time window (e.g., 5 requests per minute).
- Returns a custom JSON response when the rate limit is exceeded.

#### Error Handling:
- Centralized error handling using a custom AppError class.
- Middleware for handling async errors.

## Project Structure
```
OutFav E-Commerce
│
├── Authentication
├── Product
├── Cart
├── Categories
├── Customers
├── Reviews
├── Address
├── Order
├── Frontend (Angular 19)
```

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- validator.js
- express-rate-limit
- cors
- helmet
- compression
- xss-clean

### Frontend
- Angular v19
- Signals for state management
- PrimeNG & Tailwind CSS
- ngx-spinner
- Angular Router & Lazy Loading

---

✨ This is a work in progress! Stay tuned for updates and improvements.

🔗 **Backend API:** [OutFav API](https://outfav-production.up.railway.app/)
🔗 **Figma Design:** [Ali Norouzi's Figma](https://www.figma.com/community/file/1357820302669976191)
