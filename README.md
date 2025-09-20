# Virtual Event Management Platform - Backend

A robust Node.js backend API for managing virtual events with user authentication and event registration capabilities.

## 🚀 Features

### User Management
- **User Registration** - Create new user accounts with email validation
- **User Authentication** - Secure login with JWT tokens
- **Password Security** - Bcrypt password hashing
- **Email Validation** - Username must be in valid email format

### Event Management
- **CRUD Operations** - Create, Read, Update, Delete events
- **Event Details** - Store date, time, description, and participant lists
- **Event Registration** - Users can register/unregister for events
- **Participant Management** - Track event attendees
- **Data Validation** - Comprehensive input validation

### Technical Features
- **MongoDB Integration** - Mongoose ODM for data persistence
- **RESTful API** - Clean REST endpoints
- **Error Handling** - Comprehensive error responses
- **Input Validation** - Request body validation middleware
- **Data Relationships** - User-Event associations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virtual-event-management-platform-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/virtual-events?retryWrites=true&w=majority

   # Server Configuration
   PORT=3000

   # JWT Configuration
   JWT_SECRET=your-secret-key-here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "user@example.com"
  }
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Event Management Endpoints

#### Get All Events
```http
GET /events
```

**Response:**
```json
{
  "message": "Events retrieved successfully",
  "events": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "date": "2024-12-25T00:00:00.000Z",
      "time": "14:30",
      "description": "Holiday celebration event",
      "participants": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "username": "user@example.com"
        }
      ],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Create Event
```http
POST /events
Content-Type: application/json

{
  "date": "2024-12-25",
  "time": "14:30",
  "description": "Holiday celebration event"
}
```

#### Get Single Event
```http
GET /events/:id
```

#### Update Event
```http
PUT /events/:id
Content-Type: application/json

{
  "date": "2024-12-26",
  "time": "15:00",
  "description": "Updated event description"
}
```

#### Delete Event
```http
DELETE /events/:id
```

#### Register for Event
```http
POST /events/:id/register
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439012"
}
```

## 🗂️ Project Structure

```
virtual-event-management-platform-backend/
├── controllers/
│   ├── userController.js      # User authentication logic
│   └── eventController.js     # Event management logic
├── models/
│   ├── userModel.js          # User Mongoose schema
│   └── eventModel.js         # Event Mongoose schema
├── routes/
│   ├── userRoutes.js         # User API routes
│   └── eventRoutes.js        # Event API routes
├── middlewares/
│   └── validateBody.js       # Request validation middleware
├── utils/
│   ├── auth.js               # Password hashing utilities
│   └── jwtUtils.js           # JWT token utilities
├── db/
│   └── mongodbConnection.js  # Database connection
├── index.js                  # Application entry point
├── package.json
└── README.md
```

## ⚙️ Validation Rules

### User Registration/Login
- **Username**: Must be a valid email format
- **Password**: Minimum 5 characters

### Event Creation/Update
- **Date**: Valid date format (YYYY-MM-DD)
- **Time**: Valid time format (HH:MM or HH:MM AM/PM)
- **Description**: Required, maximum 500 characters

## 🔧 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Validation failed",
  "details": [
    "username must be a valid email address",
    "password must be at least 5 characters long"
  ]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## 🗃️ Database Schema

### User Model
```javascript
{
  username: String (email format, required, unique),
  password: String (hashed, required, min 5 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
{
  date: Date (required),
  time: String (required, HH:MM format),
  description: String (required, max 500 chars),
  participants: [ObjectId] (references User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Development

### Running in Development Mode
```bash
npm run dev  # If nodemon is configured
```

### Testing API Endpoints
Use tools like Postman, Insomnia, or curl to test the API endpoints.

Example with curl:
```bash
# Register a user
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'

# Create an event
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-12-25","time":"14:30","description":"Test event"}'
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **MongoDB Injection Prevention**: Mongoose ODM protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support


---

Built with ❤️ using Node.js, Express, and MongoDB
