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

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Smart-Communication-Hub-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your-secret-jwt-key-here
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile (Protected)

### User Routes (`/api/users`)

- `GET /api/users` - Get all users except current user (Protected)

### Message Routes (`/api/messages`)

- `GET /api/messages/:otherUserId` - Get chat history with a specific user (Protected)

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

To get a token:

1. Register a new user at `POST /api/auth/register`
2. Login at `POST /api/auth/login` to receive a JWT token

## 🔌 WebSocket Events

### Client → Server Events

- `join_user` - Join as a specific user (userId required)
- `send_message` - Send a message to another user
- `disconnect` - User disconnects

### Server → Client Events

- `update_online_users` - List of online user IDs
- `receive_message` - New message received
- `message_sent` - Confirmation that message was sent

## 📚 API Documentation (Swagger)

The API documentation is available via Swagger UI when the server is running:

**Access Swagger UI**: `http://localhost:5000/api-docs`

Swagger provides:

- Interactive API documentation
- Try-it-out functionality for all endpoints
- Request/response schemas
- Authentication testing

### Sharing Swagger Documentation

You can share the API documentation with others in several ways:

1. **Direct URL Access**: Share the Swagger UI URL with your team:

   ```
   http://your-server-address:5000/api-docs
   ```

2. **Export OpenAPI Specification**:

   - Access the OpenAPI JSON at: `http://localhost:5000/api-docs.json`
   - This JSON file can be imported into:
     - Postman
     - Insomnia
     - Other API clients
     - Swagger Editor (swagger.io)

3. **Deploy and Share**:

   - Deploy your backend server
   - Share the deployed Swagger URL with stakeholders
   - Example: `https://your-api-domain.com/api-docs`

4. **Generate Documentation Files**:
   - Copy the OpenAPI JSON from `/api-docs.json`
   - Save it as `openapi.json` or `swagger.json`
   - Share this file with your team or import it into documentation tools

## 🧪 Testing the API

You can test the API using:

1. **Swagger UI** (Recommended): Access `http://localhost:5000/api-docs` in your browser
2. **Postman**: Import the OpenAPI specification from `/api-docs.json`
3. **cURL**: Use command-line tools
4. **Thunder Client / REST Client**: VS Code extensions

### Example cURL Request

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
