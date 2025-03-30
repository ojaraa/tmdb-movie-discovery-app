import GenreListComponent from "@/components/genre-list";
import RequestLoader from "@/components/shared/request-loader";
import {
  useGetAllMovieGenresQuery,
  useGetAllTvGenresQuery,
} from "@/services/api/general-api-slice";


const Genres = () => {
  const { data: movieGenres, isLoading } = useGetAllMovieGenresQuery();
  const { data: tvGenres, isLoading: fetchingList } = useGetAllTvGenresQuery();

  return (
    <>
      <RequestLoader loading={isLoading || fetchingList} />
      <div className="px-10">
        <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
          <h2 className="uppercase text-center mt-12 text-3xl font-bold">
            All Genres
          </h2>
        </div>

        <div className="grid gap-y-12">
          {movieGenres && <GenreListComponent genreList={movieGenres} title='Movie'/>}
          {tvGenres && <GenreListComponent genreList={tvGenres}  title='TV'/>}
        </div>
      </div>
    </>
  );
};

export default Genres;
