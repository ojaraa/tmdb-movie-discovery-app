import CurrentSeason from "@/components/current-season";
import OtherInformation from "@/components/other-information";
import CastList from "@/components/shared/cast-list";
import RelatedVideos from "@/components/shared/related-youtube-videos";
import Similar from "@/components/shared/similar";
import Loader from "@/components/shared/skeleton-loaders/loader";
import { addToWatchList, fallbackBgImage, fallbackPoster } from "@/lib/utils";
import { useGetSeriesDetailsQuery } from "@/services/api/tv-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { MdPlaylistAdd } from "react-icons/md";
import { RiPlayCircleFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

const TvSeriesDetails = () => {
  const { series_id } = useParams();
  const { data: seriesDetail, isLoading } = useGetSeriesDetailsQuery({
    series_id: series_id as string,
  });

  const convertRatingToPercentage = (rating: number, decimalPlaces = 0) => {
    if (rating < 0 || rating > 10) {
      throw new Error("Rating must be between 0 and 10");
    }
    const percentage = (rating / 10) * 100;
    return `${percentage.toFixed(decimalPlaces)}`;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pb-4 bg-[#000]">
      <div
        className="movie-hero-bg bg-black bg-opacity-10 bg-center bg-no-repeat bg-cover min-h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.1) 100%), url(${
            seriesDetail?.backdrop_path
              ? API_IMG + seriesDetail.backdrop_path
              : fallbackBgImage
          })`,
        }}
      ></div>

      <div className="mt-[-28rem] sm:mx-[8rem] px-5 mb-[2rem]">
        <div className="flex gap-[4rem]">
          <div className="h-[400px] w-[30%] hidden md:block">
            <img
              src={
                seriesDetail?.poster_path
                  ? API_IMG + seriesDetail?.poster_path
                  : fallbackPoster
              }
              alt={seriesDetail?.original_name || seriesDetail?.name}
              className="h-full w-full rounded-[10px] object-cover"
              loading="lazy"
            />
          </div>

          <div className="sm:w-[70%] mt-[15rem] sm:mt-[6rem] ">
            <h2 className="text-[2.5rem] sm:text-[4rem] mb-[0rem] font-bold sm:leading-[50px]">
              {seriesDetail?.name || seriesDetail?.original_name}{" "}
              {seriesDetail?.first_air_date && (
                <span>({seriesDetail?.first_air_date.slice(0, 4)})</span>
              )}
            </h2>

            <div className="flex items-center gap-2 font-normal my-3 text-lg">
              <p> First Air Date : {seriesDetail?.first_air_date}</p>
            </div>

            <div className="flex items-center gap-x-4">
              <p className="font-medium">
                No of seasons : {seriesDetail?.number_of_seasons}
              </p>{" "}
              |
              <p className="font-medium">
                No of Episodes : {seriesDetail?.number_of_episodes}{" "}
              </p>
            </div>

            <div className="flex items-center gap-[.6rem] my-[1rem]  ">
              <div className="font-bold text-[1.7rem] border-[4.5px] border-green-600 bg-black rounded-full h-[61px] w-[66px] flex items-center justify-center text-center ">
                {convertRatingToPercentage(
                  seriesDetail?.vote_average as number
                )}
                <span>%</span>
              </div>
              <span className="font-bold text-base ml-4">TMDb Score</span>
            </div>
            <p className="italic">{seriesDetail?.tagline}</p>

            <div className="flex items-center gap-4 flex-wrap my-8">
              {seriesDetail?.genres &&
                seriesDetail?.genres.slice(0, 5).map((genre) => (
                  <Link to={`/genre/TV/${genre?.id}/${genre?.name}`}>
                    <div
                      key={genre?.id}
                      className="text-base border border-[rgba(255,255,255,0.298)] px-5 py-1 rounded-[30px] backdrop-blur-[54px]"
                    >
                      {genre.name}
                    </div>
                  </Link>
                ))}
            </div>

            <div className="">
              <p className=" text-lg sm:text-[1.3rem] leading-9">
                {seriesDetail?.overview}
              </p>
            </div>
            <div className="flex items-center gap-4 my-8 text-lg">
              <button
                className="flex items-center gap-2 bg-transparent outline-none border border-[#fff] py-[7px] px-5 rounded-[25px]"
                onClick={() =>
                  addToWatchList({
                    id: seriesDetail?.id || 0,
                    name:
                      seriesDetail?.name ||
                      seriesDetail?.original_name ||
                     
                      "",
                    release_date: seriesDetail?.first_air_date || "",
                    poster_path: seriesDetail?.poster_path || "",
                    type: "tv",
                  })
                }
              >
                <MdPlaylistAdd style={{ color: "#fff", fontSize: "2rem" }} />
                <p>Add to Watchlist</p>
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
        <CastList cast={seriesDetail?.credits.cast || []} />

        {seriesDetail?.last_episode_to_air && (
          <CurrentSeason
            currentSeason={seriesDetail?.last_episode_to_air || {}}
          />
        )}

        <OtherInformation
          info={seriesDetail?.external_ids ?? {}}
          status={seriesDetail?.status ?? ""}
          revenue={seriesDetail?.revenue ?? 0}
          budget={seriesDetail?.budget ?? 0}
          homePageLink={seriesDetail?.homepage ?? ""}
          language={seriesDetail?.spoken_languages ?? []}
        />
        <div className="py-4">
          <div className="grid grid-cols-2 ">
            <div className="flex">
              {seriesDetail?.production_companies && (
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-xl sm:text-[1.8rem]   font-bold">
                    Production Companies
                  </h6>
                  {seriesDetail?.production_companies.map((company) => (
                    <li className="text-base sm:text-xl" key={company?.id}>
                      {company?.name}
                    </li>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-y-6">
              {seriesDetail?.production_countries && (
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-xl sm:text-[1.8rem]   font-bold">
                    Production Countries
                  </h6>
                  {seriesDetail?.production_countries.map((country) => (
                    <li
                      className="text-base sm:text-xl"
                      key={country?.iso_3166_1}
                    >
                      {country?.name}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {seriesDetail?.similar?.results &&
          seriesDetail?.similar?.results?.length && (
            <Similar
              media={seriesDetail?.similar?.results || []}
              mediaType="tv"
            />
          )}

        {seriesDetail?.videos?.results &&
          seriesDetail?.videos?.results.length && (
            <RelatedVideos videos={seriesDetail?.videos?.results || []} />
          )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="dark"
        hideProgressBar
        transition={Slide}
        closeOnClick={true}
        pauseOnHover
      />
    </div>
  );
};

export default TvSeriesDetails;
