import React, { useEffect ,useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';
import FilterSortBar from './components/FilterSortBar';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter & Sort states
  const [filterYear, setFilterYear] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms 
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  // Fetch genres from TMDb
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/genre/movie/list?language=en`, API_OPTIONS);
        const data = await res.json();
        setAvailableGenres(data.genres || []);
      } catch (e) {
        setAvailableGenres([]);
      }
    };
    fetchGenres();
  }, []);

  // Update available years and languages from movieList
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => String(currentYear - i));
    setAvailableYears(years);
  }, [movieList]);

  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      let endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      // Only add genre and year filters
      const params = [];
      if (filterYear) params.push(`primary_release_year=${filterYear}`);
      if (filterGenre) params.push(`with_genres=${filterGenre}`);
      if (params.length) endpoint += (endpoint.includes('?') ? '&' : '?') + params.join('&');

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch movies: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
      
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      
    }
  }
  
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [filterYear, filterGenre]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);


  return (
    <main>
      
      <div className="pattern">

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without 
            the Hassle</h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <FilterSortBar
            filterYear={filterYear} setFilterYear={setFilterYear}
            availableYears={availableYears}
            filterGenre={filterGenre} setFilterGenre={setFilterGenre}
            availableGenres={availableGenres}
          />

          {trendingMovies.length > 0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie,index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>

                ))}
              </ul>
            </section>
          )}

          <section className='all-movies'>
              <h2 >All Movies</h2>

              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <li key={movie.id}>
                      <div onClick={() => { setSelectedMovie(movie); setIsModalOpen(true); }} className="cursor-pointer">
                        <MovieCard movie={movie} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </section>

          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} movie={selectedMovie} />
        </div>

      </div>

    </main>
  )
}

export default App