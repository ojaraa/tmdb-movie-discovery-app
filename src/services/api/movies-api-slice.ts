import { MediaType, TrendingApiResponse } from "../models/general.model";
import {
  CategoryType,
  MovieDetails,
  MovieResponse,
} from "../models/movie.model";
import { apiSlice } from "./apiSlice";

const movieListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPopularMovies: builder.query<TrendingApiResponse, void>({
      query: () => ({
        url: `movie/popular?language=en-US&page=1`,
        method: "GET",
      }),
    }),
    getMoviesByCategories: builder.query<
      MovieResponse,
      { categoryType: CategoryType; page: number }
    >({
      query: ({ categoryType, page }) => ({
        url: `movie/${categoryType}?language=en-US&page=${page}`,
        method: "GET",
      }),
    }),
    getTrendingMovies: builder.query<MovieResponse, void>({
      query: () => ({
        url: `trending/movie/day`,
        method: "GET"
      })
    }),
    getMediaListByCategories: builder.query<
      MovieResponse,
      { categoryType: CategoryType; page: number; mediaType: MediaType }
    >({
      query: ({ categoryType, page, mediaType }) => ({
        url: `${mediaType}/${categoryType}?language=en-US&page=${page}`,
        method: "GET",
      }),
    }),
    getMovieDetails: builder.query<MovieDetails, { movie_id: string }>({
      query: ({ movie_id }) => ({
        url: `/movie/${movie_id}?append_to_response=videos,credits,external_ids,similar,watch`,
        method: "GET",
      }),
    }),
    getAllVideos: builder.query<MovieDetails, { movie_id: string }>({
      query: ({ movie_id }) => ({
        url: `/movie/${movie_id}?append_to_response=videos`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPopularMoviesQuery,
  useGetMoviesByCategoriesQuery,
  useGetMediaListByCategoriesQuery,
  useGetMovieDetailsQuery,
  useGetAllVideosQuery,
} = movieListApi;
