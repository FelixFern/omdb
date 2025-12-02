import type { TMovie, TOMBDBaseResponse } from "../common";

export type TSearchMovieParams = {
  s: string;
  y?: string;
  r?: "json" | 'xml';
  page?: number
  type?: string
}

export type TSearchMoviesResponse = TOMBDBaseResponse<{
  Search: TMovie[];
  totalResults: string;
}>