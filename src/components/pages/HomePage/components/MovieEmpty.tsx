import { Film } from "lucide-react";

const MovieEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
      <Film className="h-12 w-12" />
      <p className="font-mono text-lg">No movies found</p>
    </div>
  );
};

export default MovieEmpty;
