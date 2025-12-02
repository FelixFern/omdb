import { AutoCompleteInput } from "@/components/custom";
import { MovieList } from "./components";
import { useHomePageContentImpl } from "./useHomePageContentImpl";

const HomePageContent = () => {
  const { search, handleSearch, searchOptions } = useHomePageContentImpl();

  return (
    <div className="flex flex-col gap-4 mx-auto container px-4 relative">
      <div className="sticky top-0 py-8 z-10 bg-background space-y-2">
        <div className="text-left flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-primary">OMDB Movie</h1>
          <p className="text-xl text-secondary-foreground">
            Search for movies and get detailed information about them.
          </p>
        </div>
        <AutoCompleteInput
          onChange={handleSearch}
          value={search}
          options={searchOptions}
        />
      </div>
      <div className="h-full w-full">
        <MovieList />
      </div>
    </div>
  );
};

export default HomePageContent;
