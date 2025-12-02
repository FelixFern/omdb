import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Award,
  Calendar,
  Clapperboard,
  Clock,
  PenTool,
  Star,
  Users,
} from "lucide-react";
import MovieDetailSkeleton from "./components/MovieDetailSkeleton";
import MovieNotFound from "./components/MovieNotFound";
import { useMovieDetailPageImpl } from "./useMovieDetailPageImpl";

const MovieDetailPageContent = () => {
  const { movieDetails, isLoadingDetail, handleGoBack } =
    useMovieDetailPageImpl();

  if (isLoadingDetail) return <MovieDetailSkeleton />;
  if (!movieDetails) return <MovieNotFound handleGoBack={handleGoBack} />;

  return (
    <div className="min-h-screen bg-background text-foreground animate-in fade-in duration-500 items-center justify-center">
      <div className="container relative z-10 mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          className="mb-8 gap-2 hover:bg-accent/50"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr] xl:gap-16">
          <div className="flex flex-col gap-6">
            <div className="group relative aspect-2/3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.02]">
              {movieDetails.Poster !== "N/A" ? (
                <img
                  src={movieDetails.Poster}
                  alt={movieDetails.Title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Clapperboard className="h-24 w-24 text-muted-foreground/20" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-card/50 p-4 text-center ring-1 ring-border/50 backdrop-blur-sm">
                <div className="flex justify-center text-yellow-500 mb-1">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-xl font-bold">
                  {movieDetails.imdbRating}
                </div>
                <div className="text-xs text-muted-foreground">IMDb Rating</div>
              </div>
              <div className="rounded-xl bg-card/50 p-4 text-center ring-1 ring-border/50 backdrop-blur-sm">
                <div className="flex justify-center text-primary mb-1">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold">
                  {movieDetails.Metascore}
                </div>
                <div className="text-xs text-muted-foreground">Metascore</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-primary">
                {movieDetails.Title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                  <Calendar className="h-4 w-4" />
                  {movieDetails.Year}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                  <Clock className="h-4 w-4" />
                  {movieDetails.Runtime}
                </div>
                <div className="rounded-full border border-border px-3 py-1 font-medium text-muted-foreground">
                  {movieDetails.Rated}
                </div>
                <div className="rounded-full border border-border px-3 py-1 font-medium text-muted-foreground">
                  {movieDetails.Type}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {movieDetails.Genre.split(", ").map((genre) => (
                  <span
                    key={genre}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Plot</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-serif">
                {movieDetails.Plot}
              </p>
            </div>

            <div className="grid gap-6 rounded-2xl bg-card/30 p-6 ring-1 ring-border/50 backdrop-blur-sm sm:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clapperboard className="h-4 w-4" />
                  Director
                </div>
                <p className="font-medium">{movieDetails.Director}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <PenTool className="h-4 w-4" />
                  Writer
                </div>
                <p className="font-medium">{movieDetails.Writer}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Actors
                </div>
                <p className="font-medium">{movieDetails.Actors}</p>
              </div>
            </div>

            {(movieDetails.Awards !== "N/A" ||
              movieDetails.BoxOffice !== "N/A") && (
              <div className="flex flex-col gap-4 border-t border-border pt-6">
                {movieDetails.Awards !== "N/A" && (
                  <div className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 text-yellow-500" />
                    <div>
                      <span className="font-semibold">Awards: </span>
                      <span className="text-muted-foreground">
                        {movieDetails.Awards}
                      </span>
                    </div>
                  </div>
                )}
                {movieDetails.BoxOffice !== "N/A" && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-xs font-bold text-green-500">
                      $
                    </div>
                    <div>
                      <span className="font-semibold">Box Office: </span>
                      <span className="text-muted-foreground">
                        {movieDetails.BoxOffice}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPageContent;
