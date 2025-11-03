# Book Catalog API (Tutorial-ready)

This is a tutorial-ready Node.js + Express + MongoDB project that implements a Book Catalog API with JWT-based authentication.

## Features
- User registration and login (JWT)
- CRUD for books
- Protected routes for creating/updating/deleting books
- Input validation, error handling, and rate-limiting
- Tutorial comments throughout the code for learning

## Setup (local)
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development:
   ```bash
   npm run dev
   ```
4. API will be at `http://localhost:5000`

## Postman
Follow the Postman scenarios:
1. POST `/api/users/register` -> register
2. POST `/api/users/login` -> get token
3. GET `/api/books` -> public
4. GET `/api/books/:id` -> public
5. POST `/api/books` -> protected (Authorization: Bearer <token>)
6. PUT `/api/books/:id` -> protected
7. DELETE `/api/books/:id` -> protected

## License
MIT
