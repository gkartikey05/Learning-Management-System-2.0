# Learning Management System 2.0 - Backend

This is the backend server for the Learning Management System 2.0 project. It is built with Node.js and Express, providing RESTful APIs for user management, course management, payments, and miscellaneous utilities. The backend is structured for scalability, maintainability, and security.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Middlewares](#middlewares)
- [Utilities](#utilities)
- [File Uploads](#file-uploads)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

---

## Features

- User authentication and authorization (JWT-based, with roles: USER, ADMIN)
- User registration, login, logout, password reset, and profile management
- Avatar upload and update for user profiles
- Course creation, update, deletion, and detailed management (admin only)
- Add, update, and delete lectures (with video upload) to courses
- Course enrollment for users
- Payment and subscription management (Razorpay integration)
- Subscription verification, cancellation, and refund logic
- Admin dashboard for user and payment statistics
- Contact form and email notifications (Nodemailer)
- File uploads (images, videos) with Cloudinary and Multer
- Robust error handling and custom error responses
- API documentation with Swagger (OpenAPI)

---

## Project Structure

```
SERVER/
│   app.js                # Main Express app setup
│   server.js             # Server entry point
│   package.json          # Project metadata and dependencies
│   README.md             # Project documentation
│
├── Config/
│   └── dbConnection.js   # Database connection setup
│
├── Controllers/
│   ├── course.controller.js
│   ├── miscellaneous.controller.js
│   ├── payment.controller.js
│   └── user.controller.js
│
├── Middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── multer.middleware.js
│
├── Models/
│   ├── course.model.js
│   ├── payment.model.js
│   └── user.model.js
│
├── Routes/
│   ├── course.routes.js
│   ├── miscellaneous.routes.js
│   ├── payment.routes.js
│   └── user.routes.js
│
├── Uploads/              # Uploaded files (e.g., course materials)
│
├── Utils/
│   ├── error.util.js
│   └── sendEmail.js
```

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gkartikey05/Learning-Management-System-2.0.git
   cd SERVER
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).
4. **Start the server:**
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables. **Never commit your real secrets to public repositories!**
Replace all `your_*` values with your actual credentials and configuration:

```
NODE_ENV=development
PORT=your_port

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRY=your_jwt_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=your_cloudinary_url

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=your_smtp_from_email

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=your_razorpay_plan_id

CONTACT_US_EMAIL=your_contact_us_email

FRONTEND_URL=your_local_domain
FRONTEND_URL_PROD=your_live_domain
```

---

## API Endpoints

The backend exposes RESTful APIs grouped by resource:

### User APIs (`/api/users`)

- Register, login, profile, update, delete

### Course APIs (`/api/courses`)

- Create, update, delete, list, enroll, get details

### Payment APIs (`/api/payments`)

- Initiate payment, verify, list transactions

### Miscellaneous APIs (`/api/misc`)

- Other utility endpoints

> **Note:** See the respective route/controller files for detailed endpoint documentation.

---

## Middlewares

- **Authentication:** `auth.middleware.js` (JWT-based route protection)
- **Error Handling:** `error.middleware.js` (centralized error responses)
- **File Uploads:** `multer.middleware.js` (handles multipart/form-data)

---

## Utilities

- **Email Sending:** `Utils/sendEmail.js` (for notifications, password resets, etc.)
- **Error Utilities:** `Utils/error.util.js` (custom error classes and helpers)

---

## File Uploads

Uploaded files (such as course materials) are stored in the `Uploads/` directory. File handling is managed by Multer middleware.

---

## Error Handling

All errors are handled centrally using custom error classes and middleware, ensuring consistent API responses.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---
