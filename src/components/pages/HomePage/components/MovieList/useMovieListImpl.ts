import { Route } from "@/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadMoreMovies } from "@/store/slices/moviesSlice";
import { useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";

const OVERSCAN = "256px"

export const useMovieListImpl = () => {
  const {
    searchResults,
    isSearching,
    searchError,
    isLoadingMore,
    hasMore,
    currentPage,
  } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  const intersectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearch({ from: Route.id });
  const search = searchParams?.q?.trim() || "";

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && search) {
      dispatch(
        loadMoreMovies({
          query: search,
          page: currentPage + 1,
        })
      );
    }
  }, [dispatch, isLoadingMore, hasMore, search, currentPage]);

  useEffect(() => {
    if (isSearching || !searchResults.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) handleLoadMore();
      },
      {
        root: null,
        rootMargin: OVERSCAN,
      }
    );

    const currentRef = intersectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleLoadMore, isSearching, searchResults.length]);

  return {
    searchResults,
    isSearching,
    searchError,
    search,
    intersectionRef,
    isLoadingMore,
  };
};