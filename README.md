<div align="center">
  <h1>Learning Management System 2.0</h1>
  
  <a href="https://learning-management-system-2-0.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=flat-square&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/gkartikey05/Learning-Management-System-2.0">
    <img src="https://img.shields.io/github/stars/gkartikey05/Learning-Management-System-2.0?style=flat-square" alt="GitHub stars" />
  </a>
</div>

---

## 🖼️ Screenshots

> **Home Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552919/Projects%20screenshots/LMS/Screenshot_2025-07-03_194028_igcbal.png" alt="Home Page" width="600"/>
</p>

> **Admin Dashboard Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552919/Projects%20screenshots/LMS/Screenshot_2025-07-03_194728_lsdcab.png" alt="Admin Dashboard Page" width="600"/>
</p>

> **About Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552920/Projects%20screenshots/LMS/Screenshot_2025-07-03_194323_dv8di9.png" alt="About Page" width="600"/>
</p>

> **Course Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552919/Projects%20screenshots/LMS/Screenshot_2025-07-03_194426_ebirjb.png" alt="Course Page" width="600"/>
</p>

> **Lecture Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751553480/Projects%20screenshots/LMS/Screenshot_2025-07-03_200728_lyyqww.png" alt="Lecture Page" width="600"/>
</p>

> **Contact Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552918/Projects%20screenshots/LMS/Screenshot_2025-07-03_194507_jnntlj.png" alt="Contact Page" width="600"/>
</p>

> **Registration Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552918/Projects%20screenshots/LMS/Screenshot_2025-07-03_194639_tfw3zs.png" alt="Registration Page" width="600"/>
</p>

> **Login Page**

<p align="center">
  <img src="https://res.cloudinary.com/dx0h4xmyc/image/upload/v1751552918/Projects%20screenshots/LMS/Screenshot_2025-07-03_194620_e3dnxz.png" alt="Login Page" width="600"/>
</p>

---

## 🚀 Project Highlights

- **Modern Online Course Platform**: Browse, enroll, and learn from a large library of courses taught by industry experts.
- **Affordable & Quality Education**: Built to empower students and teachers worldwide.
- **Role-based Access**: Separate dashboards and features for Admins and Users.
- **Secure Payments**: Integrated with Razorpay for seamless course subscriptions.
- **Rich Media Support**: Upload and stream video lectures, manage course content, and more.
- **Responsive UI**: Beautiful, mobile-friendly design using TailwindCSS and DaisyUI.
- **Admin Analytics**: Visualize user, course, and payment stats with charts.
- **Contact & Support**: Built-in contact form and email notifications.

---

## ✨ Features

- User authentication (signup, login, password reset, JWT-based)
- Profile management with avatar upload
- Course creation, editing, and deletion (admin)
- Add, update, and delete lectures (admin)
- Course enrollment and payment (user)
- Subscription management (user & admin)
- Admin dashboard with analytics
- File uploads (images, videos) via Cloudinary
- Email notifications (Nodemailer)
- RESTful API with Swagger docs

---

## 🖥️ Tech Stack

- **Frontend:** React 19, Redux Toolkit, Vite, TailwindCSS, DaisyUI, Chart.js, React Router DOM, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Razorpay, Cloudinary, Nodemailer, Multer
- **Deployment:** [Vercel](https://vercel.com/) (Frontend) & [Render](https://render.com/) (Backend)

---

## 📸 About & Vision

> "Education is the most powerful tool you can use to change the world." — Nelson Mandela
>
> "Dream is not that which you see while sleeping; it is something that does not let you sleep." — APJ Abdul Kalam
>
> "Innovation distinguishes between a leader and a follower." — Steve Jobs
>
> "Success is a lousy teacher. It seduces smart people into thinking they can't lose." — Bill Gates
>
> "Education is what remains after one has forgotten what one has learned in school." — Albert Einstein

Our goal is to provide affordable and quality education to the world. We empower aspiring teachers and students to share skills, creativity, and knowledge for the growth and wellness of mankind.

---

## 🗂️ Project Structure

```
Learning Management System 2.0/
│
├── CLIENT/   # Frontend (React)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── SERVER/   # Backend (Node.js/Express)
│   ├── Config/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── Utils/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gkartikey05/Learning-Management-System-2.0.git
cd Learning-Management-System-2.0
```

### 2. Setup the Backend (SERVER)

```bash
cd SERVER
npm install
```

- Create a `.env` file in `SERVER/` with the following variables:

```
NODE_ENV=development
PORT=<your_port>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRY=<your_jwt_expiry>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_URL=<your_cloudinary_url>
SMTP_HOST=<your_smtp_host>
SMTP_PORT=<your_smtp_port>
SMTP_USERNAME=<your_smtp_username>
SMTP_PASSWORD=<your_smtp_password>
SMTP_FROM_EMAIL=<your_smtp_from_email>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_SECRET=<your_razorpay_secret>
RAZORPAY_PLAN_ID=<your_razorpay_plan_id>
CONTACT_US_EMAIL=<your_contact_us_email>
FRONTEND_URL=<your_local_client_url>
FRONTEND_URL_PROD=<your_live_client_url>
```

- Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend (CLIENT)

```bash
cd ../CLIENT
npm install
```

- Create a `.env` file in `CLIENT/` with:

```
VITE_BASE_URL=<your_local_server_url>
```

- Start the frontend dev server:

```bash
npm run dev
```

---

## 🌐 Deployment

- Both frontend and backend are ready for deployment on [Vercel](https://vercel.com/) and [Render](https://render.com/).
- See `vercel.json` in each folder for deployment config.
- Set environment variables in Vercel and Render dashboard for production.

---

## 📑 API Documentation

- Swagger docs auto-generated at `/swagger-output.json` in the backend.
- You can extend or view API docs by running the backend and visiting the Swagger UI route (if configured).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

- [Contact Us Page](https://learning-management-system-2-0.vercel.app/contact)
- [Creator: Kartikey Gupta](https://www.linkedin.com/in/gkartikey05)

---

© 2025 Kartikey Gupta | All rights reserved

---
