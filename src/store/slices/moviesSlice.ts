import { omdbService } from '@/service/omdb';
import type { TMovie, TMovieDetail, TSearchByTitleResponse, TSearchMoviesResponse } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TMoviesReduxState = {
  movieDetails: TMovieDetail | null;
  searchResults: TMovie[];
  totalResults: number;
  currentPage: number;
  isSearching: boolean;
  isLoadingMore: boolean;
  searchError: string | null;
  hasMore: boolean;
  isLoadingDetail: boolean;
  detailError: string | null;
}

const initialState: TMoviesReduxState = {
  movieDetails: null,
  searchResults: [],
  totalResults: 0,
  currentPage: 1,
  isSearching: false,
  isLoadingMore: false,
  searchError: null,
  hasMore: true,
  isLoadingDetail: false,
  detailError: null,
};

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }: { query: string; page?: number }, { rejectWithValue }) => {
    try {
      const response = await omdbService.search({ s: query.trim(), page });
      if (response.data.Response === 'False') return rejectWithValue(response.data.Error);
      return response.data as TSearchMoviesResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.Error || 'Failed to search movies');
    }
  }
);

export const loadMoreMovies = createAsyncThunk(
  'movies/loadMore',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await omdbService.search({ s: query.trimEnd(), page });
      if (response.data.Response === 'False') return rejectWithValue(response.data.Error);
      return response.data as TSearchMoviesResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.Error || 'Failed to load more movies');
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  'movies/getDetail',
  async (params: { i?: string; t?: string }, { rejectWithValue }) => {
    try {
      const response = await omdbService.searchByTitle({
        ...params,
        plot: 'full'
      });
      if (response.data.Response === 'False') return rejectWithValue(response.data.Error);
      return response.data as TSearchByTitleResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.Error || 'Failed to load movie details');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.searchError = null;
      state.hasMore = true;
    },
    clearDetail: (state) => {
      state.movieDetails = null;
      state.isLoadingDetail = false;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true;
        state.searchError = null;
        state.searchResults = [];
        state.currentPage = 1;
        state.hasMore = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isSearching = false;
        if (action.payload.Response === 'True') {
          state.searchResults = action.payload.Search || [];
          state.totalResults = parseInt(action.payload.totalResults) || 0;
          state.currentPage = 1;
          state.hasMore = state.searchResults.length < state.totalResults;
        } else {
          state.searchError = action.payload.Error;
          state.searchResults = [];
          state.totalResults = 0;
          state.hasMore = false;
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isSearching = false;
        state.searchError = action.payload as string || 'Failed to search movies';
      });

    builder
      .addCase(loadMoreMovies.pending, (state) => {
        state.isLoadingMore = true;
      })
      .addCase(loadMoreMovies.fulfilled, (state, action) => {
        state.isLoadingMore = false;
        if (action.payload.Response === 'True') {
          const newMovies = action.payload.Search || [];
          state.searchResults = [...state.searchResults, ...newMovies];
          state.currentPage += 1;
          state.hasMore = state.searchResults.length < state.totalResults;
        }
      })
      .addCase(loadMoreMovies.rejected, (state, action) => {
        state.isLoadingMore = false;
        state.searchError = action.payload as string || 'Failed to load more movies';
      });

    builder
      .addCase(getMovieDetail.pending, (state) => {
        state.isLoadingDetail = true;
        state.detailError = null;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.detailError = null;
        if (action.payload.Response === "True")
          state.movieDetails = action.payload;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.detailError = action.payload as string || 'Failed to load movie details';
      });

  },
});

export const { clearSearch, clearDetail } = moviesSlice.actions;
export default moviesSlice.reducer;
