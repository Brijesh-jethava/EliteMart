# 🛒 EliteMart

EliteMart is a modern, full-featured eCommerce web application built with the MERN stack. It allows users to browse products, add them to a cart, and securely complete purchases with a smooth user experience.

## 🚀 Features

- User registration and login with JWT authentication
- Product listing with search and filter options
- Add to cart, remove, and checkout functionality
- Online payment integration (e.g., Stripe/Razorpay)
- Admin panel to manage products and users
- Responsive UI using React and modern CSS
- MongoDB backend for product and user data

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS / Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Payments:** Stripe / Razorpay (optional)

## 📦 Installation

### 1. Clone the Repository
Clone this project to your local machine:
```bash

2. Install Dependencies
Install the backend and frontend dependencies.

For backend:

cd backend
npm install
For frontend:

For frontend:
cd frontend
npm install

3. Set Up Environment Variables
Create a .env file in the root directory (for the backend) and set the required environment variables.

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/elitemart?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_secret_key

4. Run the Application
Start both the backend and frontend servers:

npm run dev

