# LK Platform Backend API

Backend API for the LK Platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication with JWT
- ✅ Booking management system
- ✅ Service catalog
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- MongoDB Compass (optional, for database GUI)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created with default values):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lk-platform
JWT_SECRET=lk-platform-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Bookings
- `POST /api/bookings` - Create booking (Public)
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/my-bookings` - Get user's bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `PATCH /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)

### Health Check
- `GET /api/health` - Server health check

## Database Models

### User
- name, email, phone, password (hashed)
- role (user/admin)
- timestamps

### Booking
- user (optional for guest bookings)
- customerName, customerEmail, customerPhone
- serviceType, serviceOption
- date, time, address, notes
- totalPrice, status
- timestamps

### Service
- name, category, description
- price, image, rating, reviews
- discount, isActive
- timestamps

## Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```

**Create a booking:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Doe",
    "customerEmail": "jane@example.com",
    "customerPhone": "9876543210",
    "serviceType": "salon",
    "serviceOption": "Women'\''s Haircut",
    "date": "2025-12-20",
    "time": "14:00",
    "address": "123 Main St",
    "totalPrice": 30
  }'
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:5000/api`
3. For protected routes, add `Authorization: Bearer <token>` header

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Booking.js           # Booking model
│   │   └── Service.js           # Service model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── bookings.js          # Booking routes
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── bookingController.js # Booking logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   └── server.js                # Express app
├── .env                          # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Rate limiting to prevent abuse
- Input validation on all endpoints
- CORS configured for frontend origin

## Next Steps

1. Start the backend server: `npm run dev`
2. Test endpoints using Postman or cURL
3. Integrate with frontend
4. Add more features as needed

## Troubleshooting

**MongoDB connection error:**
- Make sure MongoDB is running locally
- Check the connection string in `.env`
- Verify MongoDB Compass can connect

**Port already in use:**
- Change PORT in `.env` file
- Or stop the process using port 5000

**JWT errors:**
- Make sure JWT_SECRET is set in `.env`
- Check token format in Authorization header
