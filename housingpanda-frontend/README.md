# HousingPanda Frontend

## Description
This is a React.js frontend application for HousingPanda. It provides a user interface to interact with the housing listings backend, allowing users to add, view, and manage housing listings.

## Tech Stack
- React.js
- Ant Design (UI library)
- React Router DOM
- Create React App
- JavaScript (ES6+)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd housingpanda-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
If your frontend needs to connect to a custom backend API endpoint, create a `.env` file in the root directory and add:
```
REACT_APP_API_URL=http://localhost:3000
```
> **Note:** By default, the frontend expects the backend to run on `http://localhost:3000`. Adjust this if your backend runs elsewhere.

### 4. Start the development server
```bash
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000) by default (or another port if 3000 is occupied).

## Project Structure

```
.
├── public/                # Static files and index.html
├── src/                   # Source code
│   ├── App.js             # Main app component
│   ├── ListingForm.js     # Form for adding/editing listings
│   ├── ListingList.js     # Component to display listings
│   ├── App.css            # App-wide styles
│   ├── ListingForm.css    # Listing form styles
│   ├── ListingList.css    # Listing list styles
│   ├── index.js           # Entry point
│   └── ...                # Other components and files
├── package.json
├── README.md
└── ...                    # Other config files
```

## Available Scripts

### Start the development server
```bash
npm start
```

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm test
```

### Eject configuration (not recommended)
```bash
npm run eject
```

## License
MIT
