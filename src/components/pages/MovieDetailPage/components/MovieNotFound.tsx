import { Button } from "@/components/ui/button";

const MovieNotFound = ({ handleGoBack }: { handleGoBack: () => void }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Movie not found</h2>
      <Button onClick={handleGoBack}>Go Home</Button>
    </div>
  );
};

export default MovieNotFound;
