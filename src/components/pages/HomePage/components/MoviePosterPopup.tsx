import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { TMovie } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, Film } from "lucide-react";

type TMoviePosterPopupProps = {
  movie: TMovie;
  index: number;
};

const MoviePosterPopup = ({ movie, index }: TMoviePosterPopupProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({
      to: "/movie/$movieId",
      params: {
        movieId: movie.imdbID,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          tabIndex={index}
          key={movie.imdbID}
          className="group cursor-pointer rounded-lg overflow-hidden shadow bg-card transition-all hover:opacity-90 h-full"
        >
          <div className="aspect-2/3 relative overflow-hidden bg-muted focus:border-primary">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover transition-transform bg-accent"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Film className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="p-4 text-left">
            <h3 className="text-lg font-bold tracking-tight text-primary">
              {movie.Title}
            </h3>
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 w-fit font-medium text-secondary-foreground">
              <Calendar className="h-4 w-4" />
              {movie.Year}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-[50vh] object-cover transition-transform rounded-md bg-accent"
        />
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-xl line-clamp-2 mb-1">
              {movie.Title}
            </h3>
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 w-fit font-medium text-secondary-foreground">
              <Calendar className="h-4 w-4" />
              {movie.Year}
            </div>
          </div>
          <Button size={"lg"} className="w-full" onClick={handleNavigate}>
            Movie Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoviePosterPopup;
