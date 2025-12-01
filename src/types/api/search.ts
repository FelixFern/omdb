import type { TMovie } from "../common";

export type TSearchMovieParams = {
  s: string;
  page: number
}

export type TSearchMoviesResponse = {
  Search: TMovie[];
  totalResults: string;
  Response: "True";
}