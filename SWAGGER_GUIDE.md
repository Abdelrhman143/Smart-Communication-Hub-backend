# Swagger API Documentation Guide

## 📖 Overview

Swagger (OpenAPI) documentation is now integrated into the Smart Communication Hub Backend. This interactive documentation allows you to explore and test all API endpoints directly from your browser.

## 🚀 Accessing Swagger UI

Once your server is running, access Swagger UI at:

```
http://localhost:5000/api-docs
```

If your server is running on a different port, replace `5000` with your actual port number.

## 🔍 Using Swagger UI

### 1. **Exploring Endpoints**
- Swagger UI organizes endpoints by tags (Authentication, Users, Messages)
- Click on any endpoint to expand and see details
- Each endpoint shows:
  - HTTP method and path
  - Description
  - Request parameters
  - Request body schema
  - Response schemas
  - Authentication requirements

### 2. **Testing Endpoints**

#### Public Endpoints (No Authentication)
1. **Register a New User** (`POST /api/auth/register`)
   - Click "Try it out"
   - Fill in the request body with:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Click "Execute"
   - See the response below

2. **Login** (`POST /api/auth/login`)
   - Click "Try it out"
   - Fill in the request body with:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Click "Execute"
   - **Copy the token** from the response (you'll need it for protected endpoints)

#### Protected Endpoints (Require Authentication)
1. **Authorize First**:
   - Click the **"Authorize"** button at the top right of Swagger UI
   - In the "Value" field, paste your JWT token (without "Bearer" prefix)
   - Click "Authorize"
   - Click "Close"

2. **Test Protected Endpoints**:
   - **Get Current User** (`GET /api/auth/me`)
     - Click "Try it out"
     - Click "Execute"
     - Should return your user profile
   
   - **Get All Users** (`GET /api/users`)
     - Click "Try it out"
     - Click "Execute"
     - Returns list of all users except yourself
   
   - **Get Chat History** (`GET /api/messages/{otherUserId}`)
     - Click "Try it out"
     - Enter a user ID in the `otherUserId` field
     - Click "Execute"
     - Returns messages between you and that user

### 3. **Understanding Responses**
- **Green responses (2xx)**: Success
- **Yellow responses (4xx)**: Client errors (validation, authentication, etc.)
- **Red responses (5xx)**: Server errors

## 📤 Sharing Swagger Documentation

### Method 1: Direct URL Access (Easiest)
Share the Swagger UI URL with your team:

**For Local Development:**
```
http://localhost:5000/api-docs
```

**For Deployed Server:**
```
https://your-server-domain.com/api-docs
```

**Note**: For localhost URLs, team members need to:
- Be on the same network, OR
- Access via your machine's IP address (e.g., `http://192.168.1.100:5000/api-docs`)

### Method 2: OpenAPI JSON File

1. **Access the OpenAPI JSON**:
   ```
   http://localhost:5000/api-docs.json
   ```

2. **Save the JSON**:
   - Open the URL in your browser
   - Save the page as `openapi.json` or `swagger.json`
   - Share this file with your team

3. **Import into Tools**:
   - **Postman**: File → Import → Upload File → Select the JSON file
   - **Insomnia**: Application → Preferences → Data → Import Data → From File
   - **Swagger Editor**: Go to https://editor.swagger.io → File → Import File
   - **VS Code**: Use the "OpenAPI (Swagger) Editor" extension

### Method 3: Deploy and Share

1. **Deploy your backend** to a cloud service (Heroku, AWS, DigitalOcean, etc.)
2. **Update the server URL** in `swagger.config.js`:
   ```javascript
   servers: [
     {
       url: "https://your-production-domain.com",
       description: "Production server",
     },
   ]
   ```
3. **Share the production Swagger URL**:
   ```
   https://your-production-domain.com/api-docs
   ```

### Method 4: Export as Static HTML

1. Generate static HTML using tools like:
   - [Redoc](https://github.com/Redocly/redoc)
   - [Swagger UI Standalone](https://swagger.io/tools/swagger-ui/)
   
2. Host the HTML file on any web server or share via email/documentation platforms

## 🔧 Customizing Swagger

### Adding More Details

Edit `swagger.config.js` to customize:
- API title and description
- Contact information
- Server URLs
- Additional schemas

### Adding Examples

Edit route files (e.g., `routes/auth.routes.js`) to add more examples in the `@swagger` comments.

## 💡 Tips

1. **Always test authentication** in Swagger before testing protected endpoints
2. **Use realistic test data** to avoid validation errors
3. **Check response schemas** to understand the data structure
4. **Bookmark the Swagger URL** for quick access
5. **Share the JSON file** for team members who prefer Postman or other tools

## 🐛 Troubleshooting

### Swagger UI not loading?
- Make sure the server is running
- Check the port number in the URL
- Verify `swagger-ui-express` is installed: `npm list swagger-ui-express`

### "Try it out" button not working?
- Make sure you've filled in required fields
- Check the browser console for errors
- Verify the request body format is valid JSON

### Authentication not working?
- Make sure you clicked "Authorize" and entered the token
- Verify the token is valid (not expired)
- Token should be entered without "Bearer" prefix in Swagger UI

## 📚 Additional Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Postman Import Guide](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)

