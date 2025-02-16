# OutFav E-Commerce

OutFav E-Commerce is a comprehensive e-commerce application built with a Node.js, Express, MongoDB, and Mongoose backend. The frontend is still in development. This project is designed to provide a fully functional online store with a secure and efficient server-side infrastructure.

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
```

## Backend Technologies Used
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


## Future Improvements
- Complete frontend development with Angular.
- Implement order management system.
- Add admin dashboard.

---

✨ This is a work in progress! Stay tuned for updates and improvements.
