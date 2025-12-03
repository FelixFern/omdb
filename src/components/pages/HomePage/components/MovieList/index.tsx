import { Loader2 } from "lucide-react";
import {
  MovieEmpty,
  MovieListError,
  MovieListLoading,
  MoviePosterPopup,
} from "..";
import MovieNotSearching from "../MovieNotSearching";
import { useMovieListImpl } from "./useMovieListImpl";

const MovieList = () => {
  const {
    searchResults,
    isSearching,
    searchError,
    search,
    intersectionRef,
    isLoadingMore,
  } = useMovieListImpl();

  if (!search.length) return <MovieNotSearching />;
  if (isSearching) return <MovieListLoading />;
  if (searchError) return <MovieListError searchError={searchError} />;
  if (searchResults.length === 0 && search.length > 0) return <MovieEmpty />;

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-4">
        {searchResults.map((movie, idx) => (
          <MoviePosterPopup key={movie.imdbID} index={idx} movie={movie} />
        ))}
      </div>
      {isLoadingMore && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <div ref={intersectionRef} className="h-4" />
    </div>
  );
};

export default MovieList;
