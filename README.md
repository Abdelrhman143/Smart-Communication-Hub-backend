# Smart Communication Hub Backend

A real-time communication backend system built for VConnect company, providing RESTful API endpoints and WebSocket support for instant messaging and user management.

## 📋 Project Summary

The Smart Communication Hub Backend is a Node.js/Express application that powers a communication platform with the following features:

- **User Authentication**: Secure registration and login with JWT tokens
- **User Management**: Get user profiles and list all users
- **Real-time Messaging**: WebSocket-based instant messaging using Socket.IO
- **Message History**: RESTful API to retrieve chat history between users
- **Online Status**: Real-time tracking of online users

## 🛠️ Technologies & Libraries Used

### Core Framework

- **Express.js** (v5.1.0) - Fast, unopinionated web framework for Node.js
- **Node.js** - JavaScript runtime environment

### Database & ORM

- **Prisma** (v6.18.0) - Modern database toolkit and ORM
- **PostgreSQL** - Relational database (configured via Prisma)

### Authentication & Security

- **jsonwebtoken** (v9.0.2) - JSON Web Token implementation for authentication
- **bcryptjs** (v3.0.2) - Library for hashing passwords
- **cors** (v2.8.5) - Cross-Origin Resource Sharing middleware

### Real-time Communication

- **socket.io** (v4.8.1) - Real-time bidirectional event-based communication

### Validation

- **joi** (v18.0.1) - Schema description language and data validator
- **express-validation** (v4.1.1) - Express middleware for request validation

### Development Tools

- **nodemon** (v3.1.10) - Development dependency for auto-restarting server
- **dotenv** (v17.2.3) - Loads environment variables from .env file

### API Documentation

- **swagger-jsdoc** - Generates Swagger/OpenAPI specification from JSDoc comments
- **swagger-ui-express** - Serves interactive Swagger documentation

## 🤖 AI Assistance

During the development of this project, **Gemini Pro** was utilized as a learning tool to help understand and implement real-time communication features.

### Where AI Was Used

- **WebSocket & Socket.IO Implementation**: This was the first time working with WebSockets, so Gemini Pro was used to:
  - Understand WebSocket concepts and real-time bidirectional communication
  - Learn Socket.IO patterns and best practices
  - Implement event handlers for real-time messaging
  - Set up online user tracking and connection management
  - Understand socket connection lifecycle (connect, disconnect, reconnection)

### Why AI Was Used

The decision to use AI assistance was made to:

- Accelerate learning of unfamiliar technology (WebSockets/Socket.IO)
- Understand complex real-time communication patterns
- Get guidance on proper socket event handling and user management
- Learn best practices for implementing real-time features in Node.js/Express applications

The AI served as an educational resource to bridge knowledge gaps in real-time communication, enabling the successful implementation of instant messaging functionality.

## 📁 Project Structure

```
Smart-Communication-Hub-backend/
├── controllers/          # Route handlers and business logic
│   ├── auth.controller.js
│   ├── user.controller.js
│   └── message.controller.js
├── routes/              # API route definitions
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── message.routes.js
├── middlewares/         # Custom middleware functions
│   ├── authenticate.middleware.js
│   └── validation.middleware.js
├── validation/          # Joi validation schemas
│   ├── login.validation.js
│   └── register.validation.js
├── socket/              # Socket.IO handlers
│   ├── socketHandler.js
│   └── handlers/
│       ├── message.handler.js
│       └── user.handler.js
├── prisma/              # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── server.js            # Application entry point
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download PostgreSQL](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager (comes with Node.js)
- **Git** (for cloning the repository)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Smart-Communication-Hub-backend
```

#### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`.

#### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables to `.env`:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your-secret-jwt-key-here-change-in-production
```

**Important Notes:**

- Replace `username`, `password`, and `database_name` with your PostgreSQL credentials
- Use a strong, random string for `JWT_SECRET` in production
- Never commit `.env` file to version control (already in `.gitignore`)

#### 4. Database Setup

**Create PostgreSQL Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE smart_communication_hub;

# Exit psql
\q
```

**Run Prisma Migrations:**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations to create tables
npx prisma migrate dev

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

#### 5. Start the Development Server

```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

You should see:

```
Server is running with Socket.IO on http://localhost:5000
```

#### 6. Verify Installation

- **API Server**: `http://localhost:5000`
- **Swagger Documentation**: `http://localhost:5000/api-docs`
- **Health Check**: Test any endpoint via Swagger UI or cURL

### Production Deployment

For production deployment (e.g., Render, Heroku):

1. Set environment variables in your hosting platform
2. Update CORS origins in `server.js` to include your frontend domain
3. Update Swagger server URL in `swagger.config.js`
4. Ensure PostgreSQL database is accessible from your hosting platform
5. Run `npx prisma migrate deploy` instead of `npx prisma migrate dev`

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://smart-communication-hub-backend.onrender.com`

### Interactive API Documentation

Access the full interactive API documentation with Swagger UI:

- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://smart-communication-hub-backend.onrender.com/api-docs`

### API Endpoints Overview

#### Authentication Routes (`/api/auth`)

##### 1. Register User

- **Endpoint**: `POST /api/auth/register`
- **Description**: Create a new user account
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "message": "User created successfully",
    "userId": 1
  }
  ```
- **Error Responses**:
  - `400`: Validation error or email already exists
  - `500`: Server error

##### 2. Login User

- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and receive JWT token
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "name": "John Doe"
  }
  ```
- **Error Responses**:
  - `400`: Invalid credentials
  - `500`: Server error

##### 3. Get Current User

- **Endpoint**: `GET /api/auth/me`
- **Description**: Get authenticated user's profile
- **Authentication**: Required (Bearer Token)
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Success Response** (200):
  ```json
  {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
  ```
- **Error Responses**:
  - `401`: Unauthorized - Invalid or missing token
  - `500`: Server error

#### User Routes (`/api/users`)

##### 1. Get All Users

- **Endpoint**: `GET /api/users`
- **Description**: Get list of all users except the current authenticated user
- **Authentication**: Required (Bearer Token)
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Success Response** (200):
  ```json
  [
    {
      "id": 2,
      "email": "jane@example.com",
      "name": "Jane Doe"
    },
    {
      "id": 3,
      "email": "bob@example.com",
      "name": "Bob Smith"
    }
  ]
  ```
- **Error Responses**:
  - `401`: Unauthorized
  - `500`: Server error

#### Message Routes (`/api/messages`)

##### 1. Get Chat History

- **Endpoint**: `GET /api/messages/:otherUserId`
- **Description**: Retrieve chat history between current user and specified user
- **Authentication**: Required (Bearer Token)
- **Path Parameters**:
  - `otherUserId` (integer): ID of the other user
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Success Response** (200):
  ```json
  {
    "messages": [
      {
        "id": 1,
        "text": "Hello!",
        "timestamp": "2024-01-15T10:30:00Z",
        "senderId": 1,
        "receiverId": 2
      },
      {
        "id": 2,
        "text": "Hi there!",
        "timestamp": "2024-01-15T10:31:00Z",
        "senderId": 2,
        "receiverId": 1
      }
    ]
  }
  ```
- **Error Responses**:
  - `400`: Invalid user ID parameter
  - `401`: Unauthorized
  - `500`: Server error

### Authentication

Most endpoints require authentication using JWT (JSON Web Tokens).

#### How to Authenticate

1. **Register or Login** to receive a JWT token:

   - Use `POST /api/auth/register` or `POST /api/auth/login`
   - Copy the `token` from the response

2. **Include Token in Requests**:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

#### Token Details

- **Token Type**: JWT (JSON Web Token)
- **Expiration**: 24 hours
- **Header Format**: `Bearer <token>`
- **Storage**: Store securely (localStorage, sessionStorage, or httpOnly cookies)

#### Protected Endpoints

The following endpoints require authentication:

- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/messages/:otherUserId`

## 🔌 WebSocket Events

### Client → Server Events

- `join_user` - Join as a specific user (userId required)
- `send_message` - Send a message to another user
- `disconnect` - User disconnects

### Server → Client Events

- `update_online_users` - List of online user IDs
- `receive_message` - New message received
- `message_sent` - Confirmation that message was sent

## 📖 Additional Documentation

### Swagger/OpenAPI Documentation

The API documentation is available via Swagger UI:

- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://smart-communication-hub-backend.onrender.com/api-docs`

**Swagger Features:**

- Interactive API documentation
- Try-it-out functionality for all endpoints
- Request/response schemas
- Authentication testing with JWT tokens
- Export OpenAPI specification

### Sharing Documentation

1. **Direct URL**: Share the Swagger UI URL with your team
2. **OpenAPI JSON**: Access at `/api-docs.json` and import into Postman, Insomnia, or Swagger Editor
3. **Export**: Download the JSON file and share with stakeholders

## 🧪 Tests

### Testing Strategy

This project currently supports manual testing through various tools. Automated unit and integration tests are planned for future implementation.

### Manual Testing Tools

#### 1. Swagger UI (Recommended)

Access interactive API documentation at:

- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://smart-communication-hub-backend.onrender.com/api-docs`

**Features:**

- Test endpoints directly from the browser
- View request/response schemas
- Test authentication with the "Authorize" button
- See example requests and responses

#### 2. Postman

1. Import OpenAPI specification:

   - URL: `http://localhost:5000/api-docs.json`
   - Or download the JSON file and import manually

2. Set up environment variables:

   - `baseUrl`: `http://localhost:5000`
   - `token`: (set after login)

3. Test endpoints using Postman collections

#### 3. cURL Commands

**Register a new user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get all users (with authentication):**

```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Get chat history:**

```bash
curl -X GET http://localhost:5000/api/messages/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 4. VS Code Extensions

- **Thunder Client**: REST API client extension
- **REST Client**: Test APIs using `.http` files

### Test Scenarios

#### Authentication Tests

1. ✅ Register with valid data
2. ✅ Register with duplicate email (should fail)
3. ✅ Register with invalid email format (should fail)
4. ✅ Login with valid credentials
5. ✅ Login with invalid credentials (should fail)
6. ✅ Get current user with valid token
7. ✅ Get current user without token (should fail)

#### User Management Tests

1. ✅ Get all users with authentication
2. ✅ Get all users without authentication (should fail)
3. ✅ Verify current user is excluded from results

#### Message Tests

1. ✅ Get chat history with valid user ID
2. ✅ Get chat history with invalid user ID (should fail)
3. ✅ Verify messages are ordered chronologically
4. ✅ Verify both sent and received messages are included

### WebSocket Testing

Test real-time features using Socket.IO client:

1. Connect to WebSocket server
2. Emit `send_userId` event with user ID
3. Send messages using `send_message` event
4. Verify `receive_message` events
5. Test online user updates via `update_online_users` event

### Automated Testing (Future)

Planned test setup:

- **Testing Framework**: Jest or Mocha
- **Test Types**: Unit tests, Integration tests, E2E tests
- **Coverage**: Aim for 80%+ code coverage
- **CI/CD**: Automated tests on pull requests

To run tests (once implemented):

```bash
npm test
```

## 💭 Assumptions

The following assumptions were made during the development of this project:

### Technical Assumptions

1. **Database**: PostgreSQL is used as the primary database. The application assumes:

   - Database is accessible and properly configured
   - Prisma migrations have been run
   - Database connection is stable and reliable

2. **Authentication**:

   - JWT tokens are the primary authentication mechanism
   - Tokens expire after 24 hours
   - Users must re-authenticate after token expiration
   - Password hashing is done using bcryptjs with salt rounds of 10

3. **Real-time Communication**:

   - Socket.IO is used for WebSocket connections
   - Users connect via Socket.IO client with proper authentication context
   - Online user tracking is maintained in memory (not persistent across server restarts)

4. **CORS Configuration**:

   - Frontend is hosted on `https://smart-communication-hub.netlify.app`
   - Local development uses `http://localhost:3000`
   - CORS is configured to allow these origins only

5. **Environment Variables**:
   - `.env` file is properly configured with all required variables
   - `JWT_SECRET` is kept secure and not exposed
   - `DATABASE_URL` follows PostgreSQL connection string format

### Business Logic Assumptions

1. **User Management**:

   - Each user has a unique email address
   - User passwords must be at least 6 characters long
   - User names must be at least 3 characters long

2. **Messaging**:

   - Messages are stored permanently in the database
   - Chat history is retrieved in chronological order (oldest first)
   - Users can retrieve chat history with any other user (no blocking mechanism)

3. **Real-time Features**:
   - Users can be online from multiple devices/sessions simultaneously
   - Online status is tracked per user ID, not per socket connection
   - Messages are delivered to all active sessions of the recipient

### Deployment Assumptions

1. **Hosting**:

   - Backend is deployed on Render
   - Frontend is deployed on Netlify
   - Both services are accessible via HTTPS in production

2. **Database**:

   - Production database is accessible from Render hosting
   - Database connection pooling is handled by Prisma
   - Migrations are run manually during deployment

3. **Scalability**:
   - Current implementation assumes single server instance
   - Socket.IO connections are not shared across multiple instances
   - For horizontal scaling, Redis adapter would be needed

### Security Assumptions

1. **Data Protection**:

   - Passwords are hashed using bcryptjs (never stored in plain text)
   - JWT tokens contain minimal user information (userId, email)
   - Environment variables contain sensitive data and are not committed

2. **API Security**:

   - Protected endpoints require valid JWT token
   - CORS is configured to allow only trusted origins
   - Input validation is performed using Joi schemas

3. **Error Handling**:
   - Error messages don't expose sensitive information
   - Database errors are caught and return generic error messages
   - Validation errors provide helpful feedback without revealing system internals

### Performance Assumptions

1. **Database Queries**:

   - Prisma Client is used for optimized database queries
   - Indexes are in place for frequently queried fields (senderId, receiverId)
   - Chat history retrieval assumes reasonable message volume per conversation

2. **Real-time Performance**:
   - Socket.IO connection overhead is acceptable for the use case
   - Online user list is broadcast to all connected clients
   - Message delivery is near-instantaneous for online users

## 🗄️ Database Schema

### User Model

- `id` (Int, Primary Key)
- `email` (String, Unique)
- `name` (String)
- `password` (String, Hashed)

### Message Model

- `id` (Int, Primary Key)
- `text` (String)
- `timestamp` (DateTime)
- `senderId` (Int, Foreign Key → User)
- `receiverId` (Int, Foreign Key → User)

## 🔧 Available Scripts

- `npm start` - Start the development server with nodemon (auto-restart on changes)
- `npm test` - Run tests (currently not configured)

## 👤 Author

**Abdelrahman Tharwat**

## 📄 License

ISC

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue in the repository.
