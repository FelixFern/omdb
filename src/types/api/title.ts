import type { TMovieDetail, TMovieType, TOMBDBaseResponse } from "../common";

export type TSearchByTitleParams = {
  i?: string;
  t?: string;
  type?: TMovieType;
  y?: string;
  plot?: "short" | "full";
  r?: "json" | "xml";
}

export type TSearchByTitleResponse = TOMBDBaseResponse<TMovieDetail>
