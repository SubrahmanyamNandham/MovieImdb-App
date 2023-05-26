import {useEffect,useState} from "react"
import axios from "axios"



import "./index.css"

const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const Movie=()=>{
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
   
     
  const getClassByRate = (vote) => {
    if (vote >= 7.5) return "green";
    else if (vote >= 7) return "orange";
    else return "red";
  };
      
    useEffect(() => {
      getMovies(API_URL);
    }, []);
  
    const getMovies = async (url) => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm);
        setSearchTerm("");
      } else {
        getMovies(API_URL);
      }
    };

    return(
    <div className="render">
        <center>
            <nav>
        <h1>What Should I Watch?</h1>
        <form  onSubmit={handleSearch} >
            <input type="text" placeholder="Search"  className="search"   placeHolder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
     
        />
      
        </form>
        </nav>
        </center>
<center>
       <div id="main">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              src={IMG_PATH + movie.poster_path}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className={getClassByRate(movie.vote_average)}>{movie.vote_average}</span>
            </div>
            <div className="overview">
              <h3>Overview</h3>
              <p className="over">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      </center>
    </div>
    )
}

export default Movie