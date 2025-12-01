import api from "@/lib/axios";
import type { TSearchMovieParams } from "@/types";

export const omdbService = {
  search: (params: TSearchMovieParams) => {
    return api.get('/search', { params });
  }
}