# JetPath Airlines Backend

Backend API for JetPath Airlines booking system built with Node.js, Express, and MySQL.

## Features

- User authentication with JWT
- Flight management
- Booking system with loyalty points
- Admin panel
- Support messaging
- AI-powered chatbot
- Review system

## Railway Deployment Guide

### Prerequisites

1. A Railway account (https://railway.app)
2. MySQL database service on Railway

### Deployment Steps

1. **Create a new project on Railway**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

2. **Add MySQL Database**
   - Click "New" → "Database" → "Add MySQL"
   - Railway will automatically provision a MySQL database
   - Note the connection details from the "Variables" tab

3. **Deploy the Backend**
   - If using GitHub: Connect your repository
   - If using CLI: Install Railway CLI and run `railway up`

4. **Set Environment Variables**
   
   Go to your service settings → Variables tab and add:
   
   ```
   DB_HOST=<your-mysql-host-from-railway>
   DB_USER=<your-mysql-user-from-railway>
   DB_PASSWORD=<your-mysql-password-from-railway>
   DB_NAME=JetPathAirline
   JWT_SECRET=<generate-a-secure-random-string>
   OPENAI_API_KEY=<your-openai-api-key>
   NODE_ENV=production
   ```

   **Note:** Railway automatically sets the `PORT` variable, so you don't need to set it manually.

5. **Initialize the Database**
   
   After deployment, you need to initialize your database:
   
   - Connect to your MySQL database using Railway's MySQL client or any MySQL client
   - Run the SQL commands from `init_database.sql` to create tables
   - Optionally run `node seedData.js` to populate with sample data
   - Run `node make-admin.js` to create an admin user

6. **Verify Deployment**
   
   - Your backend will be available at: `https://your-app.railway.app`
   - Test the health endpoint: `https://your-app.railway.app/health`
   - Test the root endpoint: `https://your-app.railway.app/`

### Important Notes

- Railway automatically detects Node.js projects and installs dependencies
- The server binds to `0.0.0.0` to accept connections from Railway's proxy
- Health check endpoint is available at `/health`
- All API endpoints are prefixed with `/api`

### Troubleshooting

**Backend not starting:**
- Check Railway logs for errors
- Verify all environment variables are set correctly
- Ensure MySQL database is running and accessible

**Database connection errors:**
- Verify DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME are correct
- Check if MySQL service is running in Railway
- Ensure database `JetPathAirline` exists

**Port binding errors:**
- Railway automatically sets PORT - don't override it
- Server now binds to 0.0.0.0 (all interfaces)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (use `env.example` as template):
   ```bash
   cp env.example .env
   ```

3. Update `.env` with your local MySQL credentials

4. Initialize the database:
   ```bash
   # Run init_database.sql in your MySQL client
   # Then optionally:
   node seedData.js
   node make-admin.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/Login/register` - Register new user
- `POST /api/Login/login` - User login
- `POST /api/Login/logout` - User logout
- `POST /api/Login/get-name` - Get user name
- `POST /api/Login/get-id` - Get user ID
- `POST /api/Login/get-user-by-id{id}` - Get user by ID
- `POST /api/Login/update-user` - Update user stats
- `POST /api/Login/update-full-user` - Update full user profile

### Flights
- `POST /api/Flight/get-all-flights` - Get all flights
- `POST /api/Flight/get-flight-by-id{id}` - Get flight by ID

### User Flights (Bookings)
- `POST /api/UserFlights/get-all-user-flights-by-id{id}` - Get user bookings
- `POST /api/UserFlights/add-user-flight` - Book a flight
- `POST /api/UserFlights/remove-user-flight-by-id` - Cancel booking

### Reviews
- `GET /api/Review/get-all-reviews` - Get all reviews
- `POST /api/Review/add-review` - Add a review

### Support
- `POST /api/Support/add-message` - Submit support message
- `GET /api/Support/get-all-messages` - Get all messages (Admin)
- `POST /api/Support/update-message` - Update message status (Admin)
- `DELETE /api/Support/delete-message/:id` - Delete message (Admin)

### Admin
- `GET /api/Admin/get-all-users` - Get all users
- `POST /api/Admin/create-user` - Create new user
- `POST /api/Admin/update-user-admin` - Toggle admin status
- `DELETE /api/Admin/delete-user/:id` - Delete user
- `GET /api/flights` - Get all flights (Admin)
- `POST /api/flights` - Add new flight
- `DELETE /api/flights/:id` - Delete flight
- `POST /api/Admin/upload-image` - Upload flight image

### Chatbot
- `POST /api/chatbot/query` - Query AI chatbot

### Locations
- `POST /api/Location/get-all-locations` - Get all locations

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **OpenAI** - AI chatbot
- **CORS** - Cross-origin resource sharing

## License

MIT

