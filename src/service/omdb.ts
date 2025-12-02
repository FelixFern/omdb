import api from "@/lib/axios";
import type { TSearchByTitleParams, TSearchMovieParams } from "@/types";

export const omdbService = {
  search: (params: TSearchMovieParams) => {
    return api.get('', { params });
  },
  searchByTitle: (params: TSearchByTitleParams) => {
    return api.get('', { params });
  },

}