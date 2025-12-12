 **A comprehensive RESTful API for connecting people through shared activities and events**

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Database Schema](#-database-schema) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The **Events & Activities Platform API** is a robust backend service that enables users to discover, create, and participate in local events and activities. Whether it's a concert, hiking trip, tech meetup, or game night, users can connect with like-minded people and never miss out on activities due to lack of companions.

### 🎯 Key Objectives

- Connect individuals with shared interests
- Enable seamless event creation and management
- Facilitate secure payments for paid events
- Provide role-based access control (User, Host, Admin)
- Ensure data security and privacy

---

## ✨ Features

### 👤 User Management
- ✅ Secure authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Profile management with image upload
- ✅ Role-based access control (User/Host/Admin)
- ✅ User upgrade to host functionality

### 🎉 Event Management
- ✅ Create, read, update, delete events
- ✅ Advanced search and filtering
- ✅ Join/leave events
- ✅ Participant management
- ✅ Event status tracking (Open/Full/Cancelled/Completed)
- ✅ Image upload for events

### 💳 Payment Integration
- ✅ SSLCommerz payment gateway
- ✅ Secure transaction processing
- ✅ Payment history tracking
- ✅ Revenue management for hosts
- ✅ IPN (Instant Payment Notification) support

### ⭐ Review System
- ✅ Rate hosts (1-5 stars)
- ✅ Write detailed reviews
- ✅ Automatic rating calculation
- ✅ Review management

### 🛡️ Admin Features
- ✅ Dashboard with statistics
- ✅ User and host management
- ✅ Event moderation
- ✅ Payment reports
- ✅ System-wide controls

### 📸 Media Management
- ✅ Cloudinary integration
- ✅ Image upload and optimization
- ✅ Profile and event images

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | v18+ |
| **TypeScript** | Type-safe development | v5.3 |
| **Express.js** | Web framework | v4.18 |
| **MongoDB** | Database | v8.0 |
| **Mongoose** | ODM | v8.0 |
| **JWT** | Authentication | v9.0 |
| **Bcrypt** | Password hashing | v5.1 |
| **Cloudinary** | Image storage | v1.41 |
| **SSLCommerz** | Payment gateway | v1.1 |
| **Zod** | Validation | v3.22 |
| **Multer** | File upload | v1.4 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**
- **Cloudinary Account** (for image uploads)
- **SSLCommerz Account** (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/events-backend.git
cd events-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Variables](#-environment-variables))

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string
```

6. **Run development server**
```bash
npm run dev
```

7. **Build for production**
```bash
npm run build
npm start
```

Server will be running at: `http://localhost:5000`

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/                    # Authentication module
│   │   ├── auth.interface.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.validation.ts
│   │
│   ├── user/                    # User management
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   └── user.route.ts
│   │
│   ├── admin/                   # Admin operations
│   │   ├── admin.service.ts
│   │   ├── admin.controller.ts
│   │   └── admin.route.ts
│   │
│   ├── host/                    # Host operations
│   │   ├── host.service.ts
│   │   ├── host.controller.ts
│   │   └── host.route.ts
│   │
│   ├── event/                   # Event management
│   │   ├── event.interface.ts
│   │   ├── event.model.ts
│   │   ├── event.service.ts
│   │   ├── event.controller.ts
│   │   └── event.route.ts
│   │
│   ├── review/                  # Review system
│   │   ├── review.interface.ts
│   │   ├── review.model.ts
│   │   ├── review.service.ts
│   │   ├── review.controller.ts
│   │   └── review.route.ts
│   │
│   └── payment/                 # Payment processing
│       ├── payment.interface.ts
│       ├── payment.model.ts
│       ├── payment.service.ts
│       ├── payment.controller.ts
│       └── payment.route.ts
│
├── middlewares/                 # Custom middlewares
│   ├── auth.middleware.ts       # JWT authentication
│   ├── multer.middleware.ts     # File upload
│   ├── errorHandler.middleware.ts
│   └── validateRequest.middleware.ts
│
├── config/                      # Configuration files
│   ├── index.ts                 # Central config
│   ├── db.ts                    # Database connection
│   └── cloudinary.ts            # Cloudinary setup
│
├── utils/                       # Utility functions
│   ├── AppError.ts
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│   ├── uploadToCloudinary.ts
│   └── generateTransactionId.ts
│
├── types/                       # TypeScript declarations
│   └── sslcommerz-lts.d.ts
│
├── app.ts                       # Express app setup
└── server.ts                    # Server entry point
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb://localhost:27017/events-activities
# Or use MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/events-activities

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# SSLCommerz Configuration (Sandbox)
SSL_STORE_ID=your-sandbox-store-id
SSL_STORE_PASSWORD=your-sandbox-password
SSL_IS_LIVE=false

# For Production:
# SSL_STORE_ID=your-live-store-id
# SSL_STORE_PASSWORD=your-live-password
# SSL_IS_LIVE=true

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 🔑 How to Get Credentials

**MongoDB Atlas:**
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string

**Cloudinary:**
1. Visit: https://cloudinary.com/
2. Sign up for free account
3. Get credentials from dashboard

**SSLCommerz:**
1. Visit: https://developer.sslcommerz.com/registration/
2. Register for sandbox account
3. Get test credentials

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔓 Public Endpoints (No Authentication Required)

#### Health Check
```http
GET /
```

#### Get All Events
```http
GET /events/all?page=1&limit=10&type=concert&city=Dhaka&date=2024-12-15
```

#### Get Event Details
```http
GET /events/:id
```

#### Get User Profile
```http
GET /users/:id
```

---

### 🔒 Protected Endpoints (Authentication Required)

### 1️⃣ Authentication Module (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Love outdoor activities",
  "interests": ["hiking", "concerts", "sports"],
  "location": {
    "city": "Dhaka",
    "area": "Gulshan"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "password123",
  "newPassword": "newPassword456"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### 2️⃣ User Module (`/api/users`)

#### Get My Profile
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PATCH /api/users/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Updated",
  "bio": "New bio",
  "interests": ["hiking", "tech"],
  "location": {
    "city": "Dhaka",
    "area": "Banani"
  }
}
```

#### Upload Profile Image
```http
PATCH /api/users/upload-image
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData: {
  image: <file>
}
```

#### Upgrade to Host
```http
PATCH /api/users/upgrade-to-host
Authorization: Bearer <token>
```

---

### 3️⃣ Host Module (`/api/host`) - Host Only

#### Get Host Dashboard
```http
GET /api/host/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalEvents": 15,
      "upcomingEvents": 5,
      "completedEvents": 10,
      "totalParticipants": 120,
      "totalRevenue": 50000,
      "rating": 4.5,
      "totalRatings": 45
    },
    "recentReviews": [...]
  }
}
```

#### Create Event
```http
POST /api/host/events
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData: {
  name: "Weekend Hiking Trip",
  type: "hike",
  description: "Exciting adventure!",
  date: "2024-12-15",
  time: "08:00 AM",
  location[address]: "Lawachara Park",
  location[city]: "Sylhet",
  minParticipants: 5,
  maxParticipants: 20,
  joiningFee: 500,
  image: <file>
}
```

#### Get Hosted Events
```http
GET /api/host/events?page=1&limit=10&upcoming=true
Authorization: Bearer <token>
```

#### Update Event
```http
PATCH /api/host/events/:eventId
Authorization: Bearer <token>
Content-Type: multipart/form-data
```