import { useGetMovieDetailsQuery } from "@/services/api/movies-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { useParams } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
import CastList from "@/components/shared/cast-list";
import OtherInformation from "@/components/other-information";
import Similar from "@/components/shared/similar";
import { fallbackBgImage, fallbackPoster } from "@/lib/utils";
import Collection from "@/components/collection";
import RelatedVideos from "@/components/shared/related-youtube-videos";

const MovieDetails = () => {
  const { movie_id } = useParams();
  const movieId = movie_id ?? "default";
  const { data: movieDetail } = useGetMovieDetailsQuery({ movie_id: movieId });

  const convertRatingToPercentage = (rating: number, decimalPlaces = 0) => {
    if (rating < 0 || rating > 10) {
      throw new Error("Rating must be between 0 and 10");
    }
    const percentage = (rating / 10) * 100;
    return `${percentage.toFixed(decimalPlaces)}`;
  };
  return (
    <div className="pb-4 bg-[#000]">
      <div
        className="movie-hero-bg bg-black bg-opacity-10 bg-center bg-no-repeat bg-cover min-h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.1) 100%), url(${
            movieDetail?.backdrop_path
              ? API_IMG + movieDetail.backdrop_path
              : fallbackBgImage
          })`,
        }}
      ></div>
      <div className="mt-[-28rem] px-5 sm:mx-[8rem] mb-[2rem]">
        <div className="flex gap-[4rem]">
          <div className="h-[400px] w-[30%] sm:visible hidden">
            <img
              src={
                movieDetail?.poster_path
                  ? API_IMG + movieDetail?.poster_path
                  : fallbackPoster
              }
              alt={movieDetail?.title}
              className="h-full w-full rounded-[10px] object-cover"
            />
          </div>

          <div className="sm:w-[70%] mt-[6rem] ">
            <h2 className="text-[2.6rem] sm:text-[4rem] mb-[1rem] font-bold">
              {movieDetail?.title}{" "}
              {movieDetail?.release_date && (
                <span>({movieDetail?.release_date.slice(0, 4)})</span>
              )}
            </h2>

            <div className="flex items-center gap-2 font-light my-3 text-lg">
              <p>{movieDetail?.release_date}</p>
              {movieDetail?.runtime != 0 && (
                <span>({movieDetail?.runtime}mins)</span>
              )}
            </div>

            <div className="flex items-center gap-[.6rem] my-[1rem]  ">
              <div className="font-bold text-[1.7rem] border-[4.5px] border-green-600 bg-black rounded-full h-[61px] w-[66px] flex items-center justify-center text-center ">
                {convertRatingToPercentage(movieDetail?.vote_average as number)}
                <span>%</span>
              </div>
              <span className="font-bold text-base ml-4">TMDb Score</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap my-8">
              {movieDetail?.genres &&
                movieDetail?.genres.slice(0, 5).map((genre, i) => (
                  <div
                    key={i}
                    className="text-base border border-[rgba(255,255,255,0.298)] px-5 py-1 rounded-[30px] backdrop-blur-[54px]"
                  >
                    {genre.name}
                  </div>
                ))}
            </div>

            <div className="">
              <p className="text-[1.3rem] leading-9">{movieDetail?.overview}</p>
            </div>
            <div className="flex items-center gap-4 my-8 text-lg">
              <button className="flex items-center gap-2 bg-transparent outline-none border border-[#fff] py-[7px] px-5 rounded-[25px]">
                <RiPlayCircleFill style={{ color: "#fff", fontSize: "2rem" }} />
                <p>Play Trailer</p>
              </button>

              <button
                className="flex items-center gap-2 bg-transparent outline-none border border-[#fff] py-[7px] px-5 rounded-[25px]"
                style={{ backgroundColor: " #d90429", border: "none" }}
              >
                <RiPlayCircleFill style={{ color: "#fff", fontSize: "2rem" }} />
                <span> Watch</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-[5rem] ">
        <CastList cast={movieDetail?.credits.cast || []} />

        <OtherInformation
          info={movieDetail?.external_ids ?? {}}
          status={movieDetail?.status ?? ""}
          revenue={movieDetail?.revenue ?? 0}
          budget={movieDetail?.budget ?? 0}
          homePageLink={movieDetail?.homepage ?? ""}
          language={movieDetail?.spoken_languages ?? []}
        />

        <div className="py-4">
          <div className="grid grid-cols-2 ">
            <div className="flex">
              {movieDetail?.production_companies && (
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-[1.8rem]  font-bold">
                    Production Companies
                  </h6>
                  {movieDetail?.production_companies.map((company) => (
                    <li className="text-xl" key={company?.id}>{company?.name}</li>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-y-6">
              {movieDetail?.production_countries && (
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-[1.8rem]  font-bold">
                    Production Countries
                  </h6>
                  {movieDetail?.production_countries.map((country) => (
                    <li className="text-xl" key={country?.iso_3166_1}>{country?.name}</li>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {movieDetail?.belongs_to_collection && (
          <Collection
            collection={movieDetail?.belongs_to_collection}
            tagline={movieDetail?.tagline || ""}
          />
        )}


          {movieDetail?.similar.results &&  movieDetail?.similar?.results?.length > 0  &&
           <Similar media={movieDetail?.similar?.results } mediaType="movie" />
          }

        <RelatedVideos
         videos={movieDetail?.videos?.results || []}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
