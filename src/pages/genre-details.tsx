import { fallbackPoster } from "@/lib/utils";
import {
  useGetGenreDetailsQuery,
  useGetTvGenreDetailsQuery,
} from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { Link, useParams } from "react-router-dom";

const GenreDetails = () => {
  const { genre_id, genre_name, mediaType } = useParams();
  const { data } = useGetGenreDetailsQuery({ genre_id: genre_id ?? "" });
  const { data: tvGenreData } = useGetTvGenreDetailsQuery({
    genre_id: genre_id ?? "",
  });
  const genreData = mediaType === "Movie" ? data : tvGenreData;


  return (
    <div className="px-10">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          Genre - {genre_name} {mediaType === "Movie" ? "Movies" : "TV Shows"}
        </h2>
      </div>

      <div className="grid items-center gap-8 py-6 px-7 grid-cols-4">
        {genreData?.results?.map((movie) => (
          <Link to={`/${mediaType}/${movie.id}`} key={movie.id}>
            <div className="relative"  >
              <div className="h-[320px] w-full">
                <img
                  src={
                    movie?.poster_path
                      ? API_IMG + movie?.poster_path
                      : fallbackPoster
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-[5px]"
                />
              </div>

              <div className="absolute bottom-6 px-5 py-5 backdrop-blur-[54px] left-6 right-6 rounded-[8px]">
                <h4 className="text-[1.2rem] font-semibold">
                  {movie?.original_title || movie?.original_name}
                </h4>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-base font-normal text-[rgb(207, 206, 206)]">
                    {movie?.release_date || movie?.first_air_date}
                  </p>
                  <p>
                    {8.5}{" "}
                    <span>
                      <img src="" alt="" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDetails;
