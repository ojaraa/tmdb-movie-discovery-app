export type CategoryType = "popular" | "trending" | "top_rated" | "now_playing" |"airing_today";

export enum movieType {
  popular = "popular",
  trending = "trending",
  topRated = "top_rated",
  nowPlaying = "now_playing",
  airingToday = "airing_today"
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MovieCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: CollectionData | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  name: string;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: VideoResults;
  credits: Credits;
  external_ids: ExternalIds;
  similar: SimilarMovie;
}

export interface ActorDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
  movie_credits: CreditMovies;
  tv_credits: CreditMovies;
  external_ids: ExternalIds;
}

interface SimilarMovie {
  page: number;
  results: SimilarMovieResult[];
}

export interface SimilarMovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; 
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CollectionData {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface GenreList {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface VideoResults {
  results: Video[];
}

export interface Video {
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
  crew:CastMember[];
}

export interface CreditMovies {
  cast: CastCredit[];
  crew: CastCredit[];
}

export interface CastCredit {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_name: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  department: string;
  job: string;
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

// interface CrewMember {
//   adult: boolean;
//   gender: number | null;
//   id: number;
//   known_for_department: string;
//   name: string;
//   original_name: string;
//   popularity: number;
//   profile_path: string | null;
//   credit_id: string;
//   department: string;
//   job: string;
// }

export interface ExternalIds {
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
