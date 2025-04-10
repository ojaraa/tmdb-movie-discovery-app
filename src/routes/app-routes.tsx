import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/layout";
import ActorDetails from "@/components/actor-details";
import Landing from "@/pages/landing";
import MovieDetails from "@/pages/movie-details";
import Movies from "@/pages/movies";
import Series from "@/pages/series";
import TvSeriesDetails from "@/pages/tv-series";
import FullCreditsList from "@/components/full-credits-list";
import AllVideos from "@/components/shared/all-videos";
import CollectionDetails from "@/components/collection-details";
import AllSeasons from "@/pages/all-seasons";
import SeasonDetails from "@/pages/season-details";
import Genres from "@/pages/genres";
import GenreDetails from "@/pages/genre-details";
import Search from "@/pages/search";
import Favourites from "@/pages/favourites";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Landing /> },
        { path: "movies", element: <Movies /> },
        { path: "tv", element: <Series /> },
        { path: "movie/:movie_id", element: <MovieDetails /> },
        { path: "tv/:series_id", element: <TvSeriesDetails /> },
        { path: "tv/all-seasons/:series_id", element: <AllSeasons /> },
        { path: "person/:person_id", element: <ActorDetails /> },
        { path: ":mediaType/:movie_id/full-cast-crew", element: <FullCreditsList />},
        { path: "movie/:movie_id/all-videos", element: <AllVideos /> },
        { path: "collection/:collection_id", element: <CollectionDetails /> },
        { path: "tv/season/:series_id/:season_id", element: <SeasonDetails /> },
        { path: "genres", element: <Genres /> },
        { path: "genre/:mediaType/:genre_id/:genre_name", element: <GenreDetails /> },
        { path: "search", element: <Search /> },
        { path: "favourites", element: <Favourites /> },

        


      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
