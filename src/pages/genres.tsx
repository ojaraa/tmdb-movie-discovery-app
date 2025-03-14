// import GenreListComponent from "@/components/genre-list";
// import { Button } from "@/components/ui/button";
// import { useGetAllMovieGenresQuery, useGetAllTvGenresQuery } from "@/services/api/general-api-slice";
// import { Link } from "react-router-dom";

const Genres = () => {
  // const { data: movieGenres } = useGetAllMovieGenresQuery();
  // const {data: tvGenres} = useGetAllTvGenresQuery()
  // console.log(movieGenres);
  return (
    <div className="px-10">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
        All  Genres
        </h2>
      </div>

      <div className="grid">
        {/* <GenreListComponent MovieGenreList={movieGenres || []}/>
        <GenreListComponent TvGenreList={tvGenres || []}/> */}

      </div>

    </div>
  );
};

export default Genres;
