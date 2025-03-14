import { SimilarMovieResult } from "./movie.model";

export interface TvSeriesDetails {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: { results: Video[] };
  credits: Credits;
  external_ids: ExternalIds;
  similar: Similar;
}
interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

export interface SeasonDetails {
  id: number;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  videos: Video;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  guest_stars: Guest[]
}

interface Guest {
    character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CastMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  department: string;
  job: string;
}

interface ExternalIds {
  [key: string]: string | null;
  // imdb_id: string;
  // freebase_mid: string | null;
  // freebase_id: string | null;
  // tvdb_id: number;
  // tvrage_id: string | null;
  // wikidata_id: string;
  // facebook_id: string | null;
  // instagram_id: string | null;
  // twitter_id: string | null;
}

//   interface SimilarMovieResult {
//     adult: boolean;
//     backdrop_path: string | null;
//     genre_ids: number[];
//     id: number;
//     origin_country: string[];
//     original_language: string;
//     original_name: string;
//     overview: string;
//     popularity: number;
//     poster_path: string | null;
//     first_air_date: string;
//     name: string;
//     vote_average: number;
//     vote_count: number;
//     title: string;
//     video: boolean;
//     release_date: string;

//   }

interface Similar {
  page: number;
  results: SimilarMovieResult[];
  total_pages: number;
  total_results: number;
}
