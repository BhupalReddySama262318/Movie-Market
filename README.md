# Movie Market

A modern movie discovery web app built with React, Vite, and Tailwind CSS. Search for movies, filter by genre and year, view trending titles, and enjoy a beautiful, responsive UI.

- **Live Website:** [https://movie-market.onrender.com/](https://movie-market.onrender.com/)
- **GitHub Repo:** [https://github.com/BhupalReddySama262318/Movie-Market](https://github.com/BhupalReddySama262318/Movie-Market)

## Features
- Search for movies using The Movie Database (TMDb) API
- Filter movies by genre and year
- View trending movies (tracked with Appwrite backend)
- Responsive and modern design with Tailwind CSS
- Debounced search for efficient API usage
- Movie details modal with description and ratings
- Error handling and loading states

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDb API](https://www.themoviedb.org/documentation/api)
- [Appwrite](https://appwrite.io/) (for trending analytics)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository:**
   ```powershell
   git clone https://github.com/BhupalReddySama262318/Movie-Market.git
   cd Movie-Market
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your TMDb and Appwrite API keys:
     ```env
     VITE_TMDB_API_KEY=your_tmdb_api_key_here
     VITE_APPWRITE_PROJECT_ID=your_project_id
     VITE_APPWRITE_DATABASE_ID=your_database_id
     VITE_APPWRITE_COLLECTION_ID=your_collection_id
     ```

### Running the App Locally
```powershell
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Deployment
This project is deployed on [Render](https://render.com/) using Docker. All environment variables are securely set in the Render dashboard.

## Project Structure
```
Movie-Market/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # React components
│   ├── App.jsx       # Main app component
│   ├── index.css     # Tailwind and global styles
│   └── ...
├── .env.local        # Environment variables (not committed)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── ...
```

## Appwrite Integration

This project uses [Appwrite](https://appwrite.io/) as a backend service to store and track movie search analytics (such as trending searches).

### How Appwrite is Used
- **Search Analytics:** When a user searches for a movie, the search term and movie info are stored in an Appwrite database. If the term already exists, its count is incremented.
- **Trending Movies:** The app fetches the most searched movies from Appwrite to display as trending.

### Appwrite Setup
1. **Create an Appwrite Project:**
   - Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted Appwrite instance.
   - Create a new project and note the Project ID.
2. **Create a Database and Collection:**
   - Create a database and a collection for storing search analytics.
   - Add fields: `searchTerm` (string), `count` (number), `movie_id` (string), `poster_url` (string).
3. **Set Environment Variables:**
   - Add the following to your `.env.local`:
     ```env
     VITE_APPWRITE_PROJECT_ID=your_project_id
     VITE_APPWRITE_DATABASE_ID=your_database_id
     VITE_APPWRITE_COLLECTION_ID=your_collection_id
     ```
4. **Configure Permissions:**
   - Ensure your collection has appropriate read/write permissions for your app.

---

**Note:** This project uses the TMDb API but is not endorsed or certified by TMDb.
