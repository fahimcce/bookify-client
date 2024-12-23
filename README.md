# **Meeting Room Booking System**

## **Overview**

The Meeting Room Booking System is a web-based application designed to simplify the process of reserving meeting rooms in an organization. Users can view available rooms, book slots, and manage their reservations effortlessly. The application ensures a smooth, streamlined experience for administrators and employees alike, helping businesses better manage their resources.

---

## **Live URL**
- **Live view:**: [bookify Client](https://bookify-peach.vercel.app/)
- **server Live view:**: [bookify Backend](https://assignment3-seven-xi.vercel.app/)
---
## **Features**
- **User Management:**
  - Role-based access control (Admin and User roles)
  - Soft deletion of users
  - Admin can manage users and assign roles
- **Room Management:**
  - Add, update, and delete meeting rooms
  - Set room amenities (e.g., projector, whiteboard, video conferencing)
- **Slot Booking:**
  - Real-time booking of available slots
  - Price per slot feature based on room capacity
  - Booking history and status updates
- **Advanced Features:**
  - Dynamic search and filtering of rooms
  - Capacity-based pricing model
  - Detailed room and booking information
  - Error handling with clear error messages and logging
--
## **Tech Stack**

- **Frontend:**
  - TypeScript
  - React
  - Redux
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - Mongoose (MongoDB as the database)

- **Other Technologies:**
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - Zod for schema validation
  - HTTP-status for consistent status codes
  - using Stripe for payment gateway
---

## **Setup and Installation**
### **Prerequisites*
Before setting up the application, ensure you have the following installed:
- Node.js (v14+)
- MongoDB
- Git
### **Steps to Install and Run Locally**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/fahimcce/bookify-client.git
   cd bookify-client
   ```
2. **set env file name .env like this**:
    ```bash
      VITE_Cloud_Name=your cloudinary cloud name
      VITE_Api_Key= your cloudinary API key
      VITE_Api_Secret= your cloudinary API secret
      VITE_UpLoad_preset=your cloudinary upload preset
      VITE_AccessToken_Secret=your jwt access token secret
      VITE_Publishable_Key= your stripe publishable key
    ```
3. **others instructions**:
   ```bash
      npm install
      npm run dev
   ```
