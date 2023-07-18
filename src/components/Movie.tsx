import { useGlobalContext } from "../context/context";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
const imgUrl = "https://via.placeholder.com/200/200";

const Movie = () => {
  const { movie, isLoading, setPage, setIsLoading } = useGlobalContext();

  const handleScroll = () => {
    try {
      if (
        window.innerHeight + Math.round(window.scrollY) + 1 >=
        document.body.offsetHeight
      ) {
        setIsLoading(true);
        setPage((prev: number) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(movie);
    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("y");
      return window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie?.map((item) => {
            if ("Title" in item) {
              // Narrowing the type to the specific object type with 'Title' property
              const movieItem = item as {
                Title: string;
                Poster: string;
                Year: number;
                imdbID: string;
              };

              const { imdbID, Title, Poster } = movieItem;
              const movieName = Title.substring(0, 15);

              return (
                <NavLink to={`movie/${imdbID}`} key={imdbID}>
                  <div className="card">
                    <div className="card-info">
                      <h2>
                        {movieName.length > 13 ? `${movieName}...` : movieName}
                      </h2>
                      <img src={Poster === "N/A" ? imgUrl : Poster} alt="#" />
                    </div>
                  </div>
                </NavLink>
              );
            }
            return null;
          })}
        </div>
        {isLoading && <div className="loading">Loading...</div>}
      </section>
    </>
  );
};

export default Movie;
