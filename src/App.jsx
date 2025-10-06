import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./assets/search.svg";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input placeholder="Search for movies" />
        <img src={SearchIcon} alt="search" />
      </div>

      <div className="container">
        <MovieCard  />
      </div>
    </div>
  );
};

export default App;