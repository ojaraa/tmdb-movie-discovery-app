import Loader from "@/components/shared/skeleton-loaders/loader";
import { fallbackPoster } from "@/lib/utils";
import {
  useGetGenreDetailsQuery,
  useGetTvGenreDetailsQuery,
} from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";

const GenreDetails = () => {
  const { genre_id, genre_name, mediaType } = useParams();
  const { data, isLoading: loadingDetails } = useGetGenreDetailsQuery({
    genre_id: genre_id ?? "",
  });
  const { data: tvGenreData, isLoading } = useGetTvGenreDetailsQuery({
    genre_id: genre_id ?? "",
  });
  const genreData = mediaType === "Movie" ? data : tvGenreData;

  if (loadingDetails || isLoading) {
    return <Loader />;
  }

  return (
    <div className=" px-4 sm:px-10">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          Genre - {genre_name} {mediaType === "Movie" ? "Movies" : "TV Shows"}
        </h2>
      </div>

      <div className="grid items-center gap-4 sm:gap-8 py-6 px-0 sm:px-6 grid-cols-2 sm:grid-cols-5">
        {genreData?.results?.map((movie) => (
          <Link to={`/${mediaType}/${movie.id}`} key={movie.id}>
            <div className="relative">
              <div className=" h-[260px] sm:h-[320px] w-full">
                <img
                  src={
                    movie?.poster_path
                      ? API_IMG + movie?.poster_path
                      : fallbackPoster
                  }
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[5px]"
                />
              </div>


              <div className="py-3 flex items-center justify-center">
                <h4 className=" text-base sm:text-[1.2rem] font-medium text-center pt-2 ">
                  { movie?.original_name|| movie?.name || movie?.original_title }{" "}
                  {""}
                  {(movie?.release_date || movie?.first_air_date) && (
                    <span>
                      (
                      {format(
                        movie?.release_date || movie?.first_air_date,
                        "yyyy"
                      )}
                      )
                    </span>
                  )}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDetails;
