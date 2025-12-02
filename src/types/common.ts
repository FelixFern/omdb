export type TMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: TMovieType;
  Poster: string;
}

export type TMovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: TMovieType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export enum TMovieType {
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}

export type TOMBDBaseResponse<T> = {
  Response: "False";
  Error: string;
} | T & {
  Response: "True";
}

