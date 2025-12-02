import { Skeleton } from "@/components/ui/skeleton";

const MovieListLoading = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 w-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="aspect-2/3 w-full" />
        ))}
      </div>
    </div>
  );
};

export default MovieListLoading;
