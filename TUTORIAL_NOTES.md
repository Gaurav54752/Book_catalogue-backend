# Tutorial Notes (quick guide)

This file explains the important parts to study as you explore the code.

- `src/app.js` - application entry, middleware, routes registration.
- `src/config/db.js` - mongoose connection.
- `src/models` - Mongoose models for User and Book. Notice pre-save hook for hashing passwords.
- `src/controllers` - business logic for endpoints. They use async/await and pass errors to the central error handler.
- `src/middlewares/auth.js` - reads JWT from Authorization header, verifies, and attaches user to req.
- `src/validators` - express-validator rules per-route.
- `src/middlewares/validateRequest.js` - collects validation errors and returns 400 with details.

Tips:
- Start by running the server, then call register -> login to get token.
- Use the token in `Authorization: Bearer <token>` header to create books.
