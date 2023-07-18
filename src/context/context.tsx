import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import useFetch, { SingleMovieType, dataTypes } from "./useFetch";
import { movieTypes } from "./useFetch";

type childrenTypes = {
  children: React.ReactNode;
};

export interface ProviderValueTypes {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  movie: movieTypes | null | movieTypes[];
  singleMovie: SingleMovieType | null | dataTypes;
  isError: {
    show: boolean;
    msg: string | null;
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext({} as ProviderValueTypes);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

const AppContextProvider = ({ children }: childrenTypes) => {
  const [query, setQuery] = useState("hacker");

  const [page, setPage] = useState(1);

  const { isLoading, movie, isError, singleMovie, setIsLoading } = useFetch(
    `s=${query}&page=${page}`
  );

  return (
    <AppContext.Provider
      value={{
        setIsLoading,
        query,
        setQuery,
        isLoading,
        movie,
        isError,
        page,
        setPage,
        singleMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
