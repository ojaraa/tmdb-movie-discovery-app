import MediaSlider from "@/components/shared/media-slider";
import Popular from "@/components/ui/trending/popular";
import { useGetAllPopularMoviesQuery } from "@/services/api/movies-api-slice";
import { useFetchAllPopularTvShowsQuery } from "@/services/api/tv-api-slice";

const Landing = () => {
  const { data: popularMovies } = useGetAllPopularMoviesQuery();
  const { data: popularTvShows } = useFetchAllPopularTvShowsQuery();
  console.log(popularTvShows);
  return (
    <div>
      <Popular />
     {popularMovies &&  <MediaSlider media={popularMovies} title="Popular Movies" mediaType='movie' />}
    {popularTvShows &&   <MediaSlider media={popularTvShows} title="Popular Tv Shows"  mediaType='tv'/>}
      
    </div>
  );
};

export default Landing;
