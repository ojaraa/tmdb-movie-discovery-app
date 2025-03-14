import { TrendingApiResponse } from "../models/general.model";
import { ActorDetails, GenreList, MovieCollection } from "../models/movie.model";
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

  }),
});

export const {
  useFetchAllTrendingMediaQuery,
  useGetActorDetailsQuery,
  useGetCollectionDetailsQuery,
  useGetAllMovieGenresQuery,
  useGetAllTvGenresQuery,
} = generalApiSlice;
