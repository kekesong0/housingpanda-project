# Housing Listings Backend

## Description
This is a Node.js + Express backend service for managing housing listings. It provides RESTful APIs to add, retrieve, and delete housing listings stored in a MySQL database.

## Tech Stack
- Node.js
- Express
- MySQL (using `mysql2` package)
- dotenv (for environment variable management)
- CORS

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following variables:

```
DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

### 4. Start the server
```bash
node server.js
```
The server will run on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### Add a new listing
- **POST** `/listings`
- **Body:**  
  ```json
  {
    "title": "string",
    "description": "string",
    "rent": number,
    "address": "string",
    "rooms": number,
    "contact_info": "string"
  }
  ```

### Get all listings
- **GET** `/listings`

### Delete a listing
- **DELETE** `/listings/:id`

## Project Structure

```
.
├── models/             # Database connection
│   └── index.js
├── routes/             # API routes
│   └── listings.js
├── .env                # Environment variables (not committed)
├── .gitignore
├── package.json
├── server.js           # Entry point
├── testConnection.js   # Test DB connection
└── README.md
```

## Testing Database Connection
You can run:
```bash
node testConnection.js
```
to verify your MySQL connection settings.

## License
MIT