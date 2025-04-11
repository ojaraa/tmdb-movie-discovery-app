import { PaginatedMediaResponse, TrendingApiResponse } from "../models/general.model";
import { ActorDetails, GenreList, MovieCollection, MovieResponse } from "../models/movie.model";
import { apiSlice } from "./apiSlice";

const generalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllTrendingMedia: builder.query<TrendingApiResponse, void>({
      query: () => ({
        url: `trending/all/day?language=en-US`,
        method: "GET",
      }),
    }),
    getActorDetails: builder.query<ActorDetails, { person_id: string }>({
      query: ({ person_id }) => ({
        url: `person/${person_id}?language=en-US&append_to_response=movie_credits,tv_credits,external_ids`,
        method: "GET",
      }),
    }),
    getCollectionDetails: builder.query< MovieCollection, { collection_id: string }>({
      query: ({ collection_id }) => ({
        url: `collection/${collection_id}`,
        method: "GET",
      }),
    }),
    getAllMovieGenres: builder.query<GenreList , void>({
      query: () => ({
        url: 'genre/movie/list',
        method: "GET"
      }) 
    }),

    getAllTvGenres: builder.query<GenreList , void>({
      query: () => ({
        url: 'genre/tv/list',
        method: "GET"
      }) 
    }),
    getGenreDetails: builder.query<MovieResponse, {genre_id: string; page:number;}>({
      query: ({genre_id, page}) => ({
        url:`/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=${genre_id}&with_watch_monetization_types=flatrate&include_adult=false&page=${page}`,
        method: 'GET'
      })
    }),
    getTvGenreDetails: builder.query<MovieResponse, {genre_id: string; page: number;}>({
      query: ({genre_id, page}) => ({
        url:`/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=${genre_id}&with_watch_monetization_types=flatrate&include_adult=false&page=${page}`,
        method: 'GET'
      })
    }),
    searchForMoviesTvPeople: builder.query<PaginatedMediaResponse , {query: string;}>({
      query: ({query}) => ({
        url : `search/multi?query=${query}&include_adult=false&language=en-US&page=1`
      })
    }),

  }),
});

export const {
  useFetchAllTrendingMediaQuery,
  useGetActorDetailsQuery,
  useGetCollectionDetailsQuery,
  useGetAllMovieGenresQuery,
  useGetGenreDetailsQuery,
  useGetAllTvGenresQuery,
  useGetTvGenreDetailsQuery,
  useLazySearchForMoviesTvPeopleQuery,
} = generalApiSlice;
