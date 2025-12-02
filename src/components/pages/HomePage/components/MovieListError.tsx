import { Film } from "lucide-react";

const MovieListError = ({ searchError }: { searchError: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-destructive">
      <Film className="h-12 w-12" />
      <p className="font-mono text-lg">{searchError}</p>
    </div>
  );
};

export default MovieListError;
