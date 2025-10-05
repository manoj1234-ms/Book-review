# 📚 Book Review Platform

A fullstack MERN application where users can sign up, log in, add books, and review books. Built with MongoDB, Express, React, Node.js, JWT authentication, and password hashing.

---

## 🚀 Features

- **User Authentication:** Sign up, log in, JWT tokens, password hashing (bcrypt)
- **Book Management:** Add, edit, delete books (only by creator), view all books, pagination (5 per page)
- **Review System:** Add, edit, delete reviews, ratings (1-5 stars), average rating calculation
- **Frontend:** React Router, Context API, Axios, Tailwind CSS/Bootstrap
- **Protected Routes:** Middleware for authentication
- **MongoDB Atlas:** User, Book, Review schemas

---

## 🗂️ Folder Structure

```
/backend   # Express API, MongoDB models, controllers
/frontend  # React app, pages, components
```

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, React Router, Context API, Axios, Tailwind CSS/Bootstrap
- **Database:** MongoDB Atlas

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-review-platform.git
cd book-review-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
# Add your MongoDB URI and JWT secret to .env
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables

Create a `.env` file in `/backend`:

```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

---

## 📝 API Documentation

See [`backend/README.md`](./backend/README.md) for full API docs and endpoints.

---

## 🖥️ Pages

- **Signup:** Register new users
- **Login:** Authenticate and store JWT
- **Book List:** Paginated list of books
- **Book Details:** Book info, reviews, average rating
- **Add/Edit Book:** Form for logged-in users
- **Profile (Bonus):** User’s books and reviews

---

## ⭐ Bonus Features

- Search & filter books
- Sort by year or rating
- Rating distribution charts
- Dark/Light mode toggle
- Deployment (Render/Netlify/Vercel)
- Postman collection for APIs

---

## 📚 Database Schemas

**User:**  
`{ name, email, password }`

**Book:**  
`{ title, author, description, genre, year, addedBy (userId ref) }`

**Review:**  
`{ bookId (ref), userId (ref), rating, reviewText }`

---

## 📤 Deployment

- **Frontend Live:** [https://book-review-pink.vercel.app/](https://book-review-pink.vercel.app/)
- Backend: [Render/Heroku/AWS] (add your backend link here)

---

## 👨‍💻 Contributing

Pull requests welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) first.

---

## 📄 License

MIT

---

## 📬 Contact

For questions, open an issue or email [your.email@example.com](mailto:your.email@example.com).
