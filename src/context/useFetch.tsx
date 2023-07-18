import { useEffect, useState } from "react";

// console.log(process);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const key = import.meta.env.VITE_REACT_APP_API_KEY;

export type movieTypes = {
  Title: string;
  Poster: string;
  Year: number;
  imdbID: string;
  imdbRating: string;
  Released: string;
  Country: string;
  Genre: string;
}[];

export type SingleMovieType = {
  Title: string;
  Poster: string;
  Year: number;
  imdbID: string;
  imdbRating: string;
  Released: string;
  Country: string;
  Genre: string;
};

export type dataTypes = {
  Response: string;
  Search: movieTypes;
  totalResults: number;
  Error: null | string;
  Title: string;
  Poster: string;
  Year: number;
  imdbID: string;
  imdbRating: string;
  Released: string;
  Country: string;
  Genre: string;
};

type errorTypes = {
  show: boolean;
  msg: null | string;
};

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const API_URL = `https://www.omdbapi.com/?&apikey=${key}`;

const useFetch = (apiParams: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<errorTypes>({ show: false, msg: "" });
  const [movie, setMovie] = useState<movieTypes[]>([]);
  const [singleMovie, setSingleMovie] = useState<
    null | SingleMovieType | dataTypes
  >(null);

  const getMovie = async (url: string) => {
    console.log("api called");
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = (await res.json()) as dataTypes;
      console.log(data);
      if (data.Response === "True") {
        // setMovie(data.Search || data);
        data.Search
          ? setMovie((prev: movieTypes[]) => prev?.concat(data.Search))
          : setSingleMovie(data);
        setIsError({ show: false, msg: "" });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setMovie([] as movieTypes[]);
        setSingleMovie(null);
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getMovie(`${API_URL}&${apiParams}`);
    }, 700);

    return () => clearTimeout(timer);
  }, [apiParams]);

  return { isLoading, isError, movie, singleMovie, setIsLoading };
};
export default useFetch;
