/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useFetch from "../context/useFetch";
import { NavLink, useParams } from "react-router-dom";
const SingleMovie = () => {
  const { id } = useParams();

  const fetched = useFetch(`&i=${id || ""}`);
  const movie = fetched.singleMovie;
  const isLoading = fetched.isLoading;
  console.log(fetched);
  if (isLoading || !movie) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
