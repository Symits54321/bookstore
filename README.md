# Bookstore API

A RESTful API for managing a bookstore with user authentication and book CRUD operations.

## 📖 Description

This is a Node.js Express application that provides a complete bookstore management system. Users can register, login, and perform CRUD operations on books. The application uses JWT for authentication and bcrypt for password hashing.

## 🚀 Features

- **User Authentication**
  - User registration
  - User login with JWT token generation
  - Password hashing with bcrypt

- **Book Management**
  - Add new books
  - Get all books
  - Get book by ID
  - Update book information
  - Delete books

- **Security**
  - JWT-based authentication
  - Protected routes with authentication middleware
  - Password encryption

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **uuid** - Unique ID generation
- **File System** - JSON file-based data storage

## 📁 Project Structure

```
bookstore/
├── index.js                 # Main server file
├── package.json             # Project dependencies
├── README.md               # Project documentation
└── src/
    ├── controller/
    │   ├── auth_controller.js    # Authentication logic
    │   └── book_controller.js    # Book management logic
    ├── data/
    │   ├── book.json            # Book data storage
    │   └── user.json            # User data storage
    ├── middleware/
    │   └── auth_middleware.js   # Authentication middleware
    └── routes/
        └── routes.js            # API route definitions
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Symits54321/bookstore.git
   cd bookstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node index.js
   ```

The server will start on port 8080. You should see:
```
Bookstore server is running on port:8080
```

## 📚 API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

#### Login User
- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Returns JWT token for authentication

### Book Endpoints
*Note: All book endpoints require authentication. Include the JWT token in the Authorization header.*

#### Add Book
- **POST** `/books`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Fiction",
    "publishedYear": "2024",
    "userId": "user-uuid"
  }
  ```

#### Get All Books
- **GET** `/books`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Get Book by ID
- **GET** `/books/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Update Book
- **PUT** `/books/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "genre": "Updated Genre",
    "publishedYear": "2024"
  }
  ```

#### Delete Book
- **DELETE** `/books/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, you'll receive a token that must be included in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

The token expires after 4 hours.

## 📝 Usage Examples

### Using Postman

1. **Register a new user:**
   - Method: `POST`
   - URL: `http://localhost:8080/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login:**
   - Method: `POST`
   - URL: `http://localhost:8080/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Copy the JWT token from the response

3. **Add a book:**
   - Method: `POST`
   - URL: `http://localhost:8080/books`
   - Headers: 
     - `Content-Type: application/json`
     - `Authorization: Bearer <your_jwt_token>`
   - Body (raw JSON):
     ```json
     {
       "title": "The Great Gatsby",
       "author": "F. Scott Fitzgerald",
       "genre": "Fiction",
       "publishedYear": "1925",
       "userId": "user-id"
     }
     ```

4. **Get all books:**
   - Method: `GET`
   - URL: `http://localhost:8080/books`
   - Headers: `Authorization: Bearer <your_jwt_token>`

5. **Get book by ID:**
   - Method: `GET`
   - URL: `http://localhost:8080/books/{book-id}`
   - Headers: `Authorization: Bearer <your_jwt_token>`

6. **Update a book:**
   - Method: `PUT`
   - URL: `http://localhost:8080/books/{book-id}`
   - Headers: 
     - `Content-Type: application/json`
     - `Authorization: Bearer <your_jwt_token>`
   - Body (raw JSON):
     ```json
     {
       "title": "Updated Title",
       "author": "Updated Author",
       "genre": "Updated Genre",
       "publishedYear": "2024"
     }
     ```

7. **Delete a book:**
   - Method: `DELETE`
   - URL: `http://localhost:8080/books/{book-id}`
   - Headers: `Authorization: Bearer <your_jwt_token>`

### 💡 Postman Tips
- Save your JWT token in a Postman environment variable for easier testing
- Create a Postman collection to organize all your API requests
- Use Postman's pre-request scripts to automatically add authentication headers

## 🗄️ Data Storage

This application uses JSON files for data persistence:
- `src/data/user.json` - Stores user information
- `src/data/book.json` - Stores book information

## ⚙️ Configuration

The JWT secret key is currently hardcoded in the auth controller. For production use, consider:
- Using environment variables for sensitive configuration
- Implementing a proper database (MongoDB, PostgreSQL, etc.)
- Adding input validation and sanitization
- Implementing rate limiting
- Adding comprehensive error handling



## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sumit Singh**

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please feel free to open an issue in the repository.

---

*Happy coding! 📚✨*
