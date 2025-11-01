/**
 * Swagger/OpenAPI configuration
 * Generates API documentation from JSDoc comments in route files
 */
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Communication Hub API",
      version: "1.0.0",
      description:
        "Backend API for Smart Communication Hub - A real-time communication platform for VConnect company. This API provides user authentication, user management, and real-time messaging capabilities.",
      contact: {
        name: "Abdelrahman Tharwat",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://api.example.com",
        description: "Production server (example)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token obtained from login endpoint",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "User unique identifier",
              example: 1,
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "user@example.com",
            },
            name: {
              type: "string",
              description: "User full name",
              example: "John Doe",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "User full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              format: "password",
              description: "User password (minimum 6 characters)",
              example: "password123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email address",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              description: "User password",
              example: "password123",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Login successful",
            },
            token: {
              type: "string",
              description: "JWT authentication token",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MzI1NDIyfQ.example",
            },
            userId: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "John Doe",
            },
          },
        },
        RegisterResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "User created successfully",
            },
            userId: {
              type: "integer",
              example: 1,
            },
          },
        },
        Message: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            text: {
              type: "string",
              example: "Hello, how are you?",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:30:00Z",
            },
            senderId: {
              type: "integer",
              example: 1,
            },
            receiverId: {
              type: "integer",
              example: 2,
            },
          },
        },
        ChatHistoryResponse: {
          type: "object",
          properties: {
            messages: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Message",
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Error message",
            },
            details: {
              type: "string",
              example: "Detailed error information",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./server.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

