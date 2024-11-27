import { useEffect, useState } from "react";
const KEY = "4bc7df4e";
export function useMovies(query) {
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
          const controller = new AbortController();
          async function fetchMovies() {
            try {
              setIsLoading(true);
              setError("");
              const resp = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
              if (!resp.ok) throw new Error("Something went wrong!!!");
              const data = await resp.json();
              if (data.Response === "False") throw new Error("Movie not found");
              setMovies(data.Search);
              setIsLoading(false);
            } catch (error) {
              if (error.name !== "AbortError") {
                setError(error.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
        //   handleCloseMovie();
          fetchMovies();
          return function () {
            controller.abort();
          };
        },
        [query]
      );

      return {movies, error, isLoading};
}