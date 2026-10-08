import { Movie, MOVIES } from "@/data/movies";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type MoviesValue = {
  movies: Movie[];
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
  addMovie: (movie: Movie) => void;
};

const MoviesContext = createContext<MoviesValue | null>(null);

export function MoviesProvider({ children }: PropsWithChildren) {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const toggleWatchlist = (id: string) =>
    setWatchlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const addMovie = (movie: Movie) =>
    setMovies((current) => [...current, movie]);

  return (
    <MoviesContext.Provider
      value={{ movies, watchlist, toggleWatchlist, addMovie }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const value = useContext(MoviesContext);
  if (!value) throw new Error("useMovies must be used inside MoviesProvider");
  return value;
}
