import { TrendingApiResponse } from "../models/general.model";
import { SeasonDetails, TvSeriesDetails } from "../models/tv.model";
import { apiSlice } from "./apiSlice";

const tvApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllPopularTvShows: builder.query<TrendingApiResponse, void>({
            query: () => ({
                url: `tv/popular?language=en-US&page=1`,
                method: 'GET'
            })
        }),
        getSeriesDetails: builder.query<TvSeriesDetails, {series_id: string;}>({
            query: ({series_id}) => ({
                url: `tv/${series_id}?&language=en-US&append_to_response=videos,credits,external_ids,similar,watch/providers`,
                method: 'GET'
            })
        }),
        getSeasonDetails: builder.query<SeasonDetails, {series_id: string; season_id: string}>({
            query: ({series_id, season_id}) => ({
                url: `tv/${series_id}/season/${season_id}?&language=en-US&append_to_response=videos`,
                method: "GET"
            })
        }),
        
    })
})

export const {useFetchAllPopularTvShowsQuery, useGetSeriesDetailsQuery, useGetSeasonDetailsQuery} = tvApiSlice