# NOTEPAD

A modern streaming platform with user authentication, role-based access control, and note-taking functionality. Built with Express.js backend and React frontend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)

## ✨ Features

### Authentication & Security
- ✅ User registration with full name, email, username, password
- ✅ JWT-based authentication (access & refresh tokens)
- ✅ Password hashing with bcrypt
- ✅ Secure token refresh mechanism
- ✅ CORS enabled for frontend integration

### User Management
- ✅ User registration and login
- ✅ Logout functionality
- ✅ Get current user info
- ✅ Update account details
- ✅ Change password

### Role-Based Access Control
- ✅ User and Admin roles
- ✅ Protected routes based on roles
- ✅ Admin panel with system stats
- ✅ Admin-only endpoints

### Note Taking (CRUD Operations)
- ✅ Create notes with title, content, and tags
- ✅ Read/View all user notes
- ✅ Update existing notes
- ✅ Delete notes
- ✅ Tag support for organization

### Frontend UI
- ✅ Modern dark theme with glassmorphism
- ✅ Register page
- ✅ Login page
- ✅ Protected dashboard
- ✅ Admin panel (admin users only)
- ✅ Notes management page with CRUD interface
- ✅ Responsive design

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

## 📁 Project Structure

```
Notepad/
├── src/                          # Backend source
│   ├── controllers/
│   │   ├── user.controller.js   # User auth & management
│   │   └── note.controller.js   # Note CRUD operations
│   ├── models/
│   │   ├── user.model.js        # User schema
│   │   └── note.model.js        # Note schema
│   ├── routes/
│   │   ├── user.routes.js       # User endpoints
│   │   └── note.routes.js       # Note endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT verification
│   │   └── role.middleware.js   # Role-based access
│   ├── utils/
│   │   ├── asyncHandler.js      # Async error handling
│   │   ├── ApiError.js          # Custom error class
│   │   └── ApiResponse.js       # Standard response format
│   ├── db/
│   │   └── index.js             # MongoDB connection
│   ├── app.js                   # Express app setup
│   └── index.js                 # Entry point
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx      # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Auth state management
│   │   ├── pages/
│   │   │   ├── Register.jsx            # Register page
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── Dashboard.jsx           # User dashboard
│   │   │   ├── Admin.jsx               # Admin panel
│   │   │   ├── Notes.jsx               # Notes management
│   │   │   ├── Auth.css                # Auth styles
│   │   │   ├── Dashboard.css           # Dashboard styles
│   │   │   ├── Admin.css               # Admin styles
│   │   │   └── Notes.css               # Notes styles
│   │   ├── services/
│   │   │   └── api.js                  # API integration
│   │   ├── App.jsx                     # Main component
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── vite.config.js           # Vite configuration
│   └── package.json
├── .env                          # Environment variables
├── package.json                  # Backend dependencies
└── README.md                     # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Atlas or local)
- npm or yarn

### Backend Setup

1. **Clone and navigate to project:**
```bash
cd Notepad
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```env
PORT=8000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your-secret-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRY=10d
```

4. **Start backend server:**
```bash
npm run dev
```
Server runs on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000` (or as shown in terminal)

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### Register User
```
POST /users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securePassword123"
}

Response: 201 Created
{
  "statusCode": 201,
  "data": { user object },
  "message": "User registered Successfully"
}
```

#### Login User
```
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "statusCode": 200,
  "data": {
    "user": { user object },
    "accessToken": "token...",
    "refreshToken": "token..."
  },
  "message": "User logged In Successfully"
}
```

#### Logout User
```
POST /users/logout
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "statusCode": 200,
  "data": {},
  "message": "User logged Out"
}
```

#### Get Current User
```
GET /users/current-user
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "statusCode": 200,
  "data": { user object },
  "message": "User fetched successfully"
}
```

#### Refresh Token
```
POST /users/refresh-token
Content-Type: application/json

{
  "refreshToken": "token..."
}

Response: 200 OK
{
  "statusCode": 200,
  "data": {
    "accessToken": "new_token...",
    "refreshToken": "new_token..."
  },
  "message": "Access token refreshed"
}
```

#### Admin Panel
```
GET /users/admin-panel
Authorization: Bearer {accessToken}
(Only for admin users)

Response: 200 OK
{
  "statusCode": 200,
  "data": { admin data },
  "message": "Admin panel access granted"
}
```

### Note Endpoints (All require JWT authentication)

#### Create Note
```
POST /notes
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content",
  "tags": ["work", "important"]
}

Response: 201 Created
{
  "statusCode": 201,
  "data": { note object },
  "message": "Note created successfully"
}
```

#### Get All Notes
```
GET /notes
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "statusCode": 200,
  "data": [ note objects ],
  "message": "Notes retrieved successfully"
}
```

#### Get Note by ID
```
GET /notes/{noteId}
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "statusCode": 200,
  "data": { note object },
  "message": "Note retrieved successfully"
}
```

#### Update Note
```
PATCH /notes/{noteId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["updated", "tags"]
}

Response: 200 OK
{
  "statusCode": 200,
  "data": { updated note object },
  "message": "Note updated successfully"
}
```

#### Delete Note
```
DELETE /notes/{noteId}
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "statusCode": 200,
  "data": { deleted note object },
  "message": "Note deleted successfully"
}
```

## 📖 Usage Guide

### 1. Register a New Account
- Navigate to `/register`
- Fill in Full Name, Email, Username, and Password
- Click "Register"
- You'll be redirected to login

### 2. Login
- Navigate to `/login`
- Enter Email/Username and Password
- Click "Login"
- You'll be redirected to dashboard

### 3. User Dashboard
- View your profile information
- See quick stats
- Access from `/dashboard` (protected)

### 4. Notes Management
- Navigate to `/notes`
- **Create**: Fill form on left, click "Create Note"
- **Read**: View all notes on right side
- **Update**: Click "Edit", modify, click "Update Note"
- **Delete**: Click "Delete" (requires confirmation)
- **Tags**: Organize notes with comma-separated tags

### 5. Admin Panel
- Only accessible if your role is "admin"
- Navigate to `/admin`
- View system stats and management options
- Access user and stream management

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Secure token refresh mechanism
- Role-based access control (RBAC)
- CORS enabled
- HTTP-only cookies support
- Request validation on both frontend and backend
- Authorization checks on protected routes

## 📝 Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  username: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (default: 'user'),
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  tags: [String],
  owner: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Features

- Modern dark theme with gradient backgrounds
- Glassmorphism design elements
- Smooth animations and transitions
- Responsive layout for mobile & desktop
- Real-time form validation
- Success and error notifications
- Loading states
- Empty states with helpful messages

## 🚦 Environment Variables

Required environment variables in `.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
```

## 📦 Dependencies

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- cookie-parser
- dotenv

### Frontend
- react
- react-router-dom
- axios
- vite

## 🐛 Troubleshooting

**MongoDB Connection Failed**
- Verify connection string in .env
- Check MongoDB Atlas IP whitelist
- Ensure network connectivity

**CORS Errors**
- Check CORS_ORIGIN in .env (set to * for all origins)
- Ensure frontend URL matches origin

**Token Expired**
- Token refresh happens automatically
- Clear localStorage if issues persist

**Notes Not Showing**
- Ensure you're logged in
- Check browser console for API errors
- Verify MongoDB connection

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using Node.js, React, and MongoDB

---

**Happy Streaming! 🎬**
