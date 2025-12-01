export type TMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}


export type TOMBDBaseResponse<T> = {
  Response: "False";
  Error: string;
} | T & {
  Response: "True";
}
