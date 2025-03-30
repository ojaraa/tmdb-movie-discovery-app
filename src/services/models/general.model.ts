export const API_IMG = "https://image.tmdb.org/t/p/original/";
export const API_IMG_500 = "https://image.tmdb.org/t/p/w500/";

export type MediaType = "movie" | "tv"

export interface TrendingApiResponse {
  page: number;
  results: MediaResult[];
}

export interface MediaResult {
  backdrop_path: string;
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
}

export interface MultiMediaItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  gender: number;
  title: string;
  original_language: string;
  original_title: string;
  name: string;
  overview: string;
  poster_path: string;
  profile_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

 export interface PaginatedMediaResponse {
  page: number;
  results: MultiMediaItem[]; // Array of media items
  total_pages: number;
  total_results: number;
}
