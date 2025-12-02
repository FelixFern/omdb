import api from "@/lib/axios";
import { TMovieType } from "@/types";
import { vi, type Mock } from "vitest";

export const mockSearchMovies = {
  Search: [
    {
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
      Type: TMovieType.Movie,
      Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      Title: "Batman v Superman: Dawn of Justice",
      Year: "2016",
      imdbID: "tt2975590",
      Type: TMovieType.Movie,
      Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      Title: "The Batman",
      Year: "2022",
      imdbID: "tt1877830",
      Type: TMovieType.Movie,
      Poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
    }
  ],
  totalResults: "530",
  Response: "True"
};

export const mockFailedSearchMovies = {
  Search: [],
  totalResults: "0",
  Response: "False",
  Error: "Movie not found!"
};

export const mockEmptySearchMovies = {
  Search: [],
  totalResults: "0",
  Response: "False",
  Error: "Movie not found!"
};

export const mockMovieDetail = {
  Response: "True",
  Title: "Batman Begins",
  Year: "2005",
  Rated: "PG-13",
  Released: "15 Jun 2005",
  Runtime: "140 min",
  Genre: "Action, Crime, Drama",
  Director: "Christopher Nolan",
  Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
  Actors: "Christian Bale, Michael Caine, Liam Neeson",
  Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
  Language: "English, Mandarin",
  Country: "United States, United Kingdom",
  Awards: "Nominated for 1 Oscar. 14 wins & 79 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "8.2/10" },
    { Source: "Rotten Tomatoes", Value: "85%" },
    { Source: "Metacritic", Value: "70/100" }
  ],
  Metascore: "70",
  imdbRating: "8.2",
  imdbVotes: "1,553,246",
  imdbID: "tt0372784",
  Type: TMovieType.Movie,
  DVD: "18 Oct 2005",
  BoxOffice: "$206,852,432",
  Production: "N/A",
  Website: "N/A"
};

vi.mock("@/lib/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

export const setupMockSearchMovies = () => {
  (api.get as Mock).mockResolvedValue({
    data: mockSearchMovies
  });
};

export const setupMockEmptySearchMovies = () => {
  (api.get as Mock).mockResolvedValue({
    data: mockEmptySearchMovies
  });
};

export const setupMockFailedSearchMovies = () => {
  (api.get as Mock).mockRejectedValue({
    response: {
      data: {
        Error: "Something went wrong"
      }
    }
  });
};

export const setupMockMovieDetail = () => {
  (api.get as Mock).mockResolvedValue({
    data: {
      ...mockMovieDetail, Response: "True",
    }
  });
};

export const setupMockFailedMovieDetail = () => {
  (api.get as Mock).mockRejectedValue({
    response: {
      data: {
        Error: "Movie not found"
      }
    }
  });
};
