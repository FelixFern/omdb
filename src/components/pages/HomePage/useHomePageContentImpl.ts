import { useDebounce } from "@/hooks";
import { Route } from "@/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearSearch, searchMovies } from "@/store/slices/moviesSlice";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const DEBOUNCE_TIME = 150;

export const useHomePageContentImpl = () => {
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.movies);
  const searchParams = useSearch({ from: Route.id });
  const [search, setSearch] = useState(searchParams.q || '');

  const searchOptions = searchResults.map((movie) => ({
    value: movie.Title,
    label: movie.Title,
  }))

  const navigate = useNavigate({
    from: Route.path
  })

  useEffect(() => {
    if (searchParams.q && searchParams.q.trim().length > 0) {
      dispatch(searchMovies({ query: searchParams.q, page: 1 }));
    } else {
      dispatch(clearSearch());
    }
  }, [searchParams.q, dispatch]);

  useDebounce(() => {
    navigate({
      search: {
        q: search
      }
    })
  }, DEBOUNCE_TIME, [search])

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return { searchOptions, search, setSearch, handleSearch }
}