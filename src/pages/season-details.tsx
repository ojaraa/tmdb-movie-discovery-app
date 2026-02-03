import { fallbackBgImage, fallbackPoster } from "@/lib/utils";
import {
  useGetSeasonDetailsQuery,
  useGetSeriesDetailsQuery,
} from "@/services/api/tv-api-slice";
// import male from "/assets/male.png";
// import female from "/assets/female.png";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import {  useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
import Loader from "@/components/shared/skeleton-loaders/loader";

const SeasonDetails = () => {
  const { series_id, season_id } = useParams();
  const { data: seasonsDetail , isLoading: loadingSeasonDetail} = useGetSeriesDetailsQuery({
    series_id: series_id as string,
  });
  const { data: episodesDetail, isLoading: loadingEpisodeDetail } = useGetSeasonDetailsQuery({
    season_id: season_id as string,
    series_id: series_id as string,
  });
  // const [movieCount, setMovieCount] = useState(4);
  // const loadMore = () => {
  //   setMovieCount((prev) => prev + 4);
  // };

  if (loadingSeasonDetail || loadingEpisodeDetail) {
    return<Loader/>
  }

  return (
    <div>
      <div
        className="h-[25vh] bg-no-repeat bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: `linear-gradient(rgba(18, 18, 18,0.8),rgba(18, 18, 18)),url(${
            seasonsDetail?.backdrop_path
              ? API_IMG + seasonsDetail?.backdrop_path
              : fallbackBgImage
          })`,
        }}
      >
        <h2 className=" text-center mt-[8rem] sm:mt-12 text-[2rem] sm:text-[3rem] font-bold">
          {seasonsDetail?.name || seasonsDetail?.name} -{" "}
          {episodesDetail?.season_number === 0
            ? `Specials`
            : `Season ${episodesDetail?.season_number}`}
        </h2>
      </div>

      <div className=" p-6 sm:mx-[8rem] grid gap-10 py-10">
        <div className="flex justify-end">
          <p className="">
            Total episodes : {episodesDetail?.episodes?.length}
          </p>
        </div>
        {episodesDetail?.episodes?.map((episode) => (
          <div className="bg-[#171717]  p-6 sm:p-12 rounded-[15px]" key={episode?.id}>
            <div className="grid sm:grid-cols-[1fr_3fr] gap-x-6">
              <div className="h-[180px]">
                <img
                  src={
                    episode?.still_path
                      ? API_IMG + episode?.still_path
                      : fallbackPoster
                  }
                  alt={episode?.name}
                  loading="lazy" 
                  className="h-full w-full object-cover rounded-[9px]"
                />
              </div>

              <div className="flex flex-col gap-y-3 ">
                <h2 className="font-semibold text-[2.2rem]">{episode?.name}</h2>
                <p className="font-semibold text-xl">
                  Episode {episode?.episode_number}{" "}
                  {episode?.runtime && `(${episode?.runtime} mins)`} 
            
                  {/*  */}
                </p>

                <div className="grid">
                  {/* <p className="text-lg font-semibold text-[1.2rem]">Overview</p> */}
                  <p className=" leading-8">{episode?.overview}</p>
                </div>

                <p className="">
                  Aired on : {format(episode?.air_date, "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            {/* {episode?.guest_stars && episode?.guest_stars.length > 0 && (
              <div className="grid py-8 gap-y-5">
                <p className="text-[1.3rem] font-bold">
                  Guest stars ({episode?.guest_stars?.length})
                </p>

                <div className="grid sm:grid-cols-2 gap-y-8  gap-x-24 ">
                  {episode?.guest_stars.slice(0, movieCount).map((guest) => {
                    const genderImg = guest?.gender === 1 ? female : male;

                    return (
                      <Link to={`/person/${guest?.id}`}>
                        <div className=" grid grid-cols-[1fr_2.5fr] cursor-pointer gap-6 bg-[#171717] shadow-xl shadow-black rounded-[15px]">
                          <div className="h-[100px] rounded-[9px] ">
                            <img
                              src={
                                guest?.profile_path
                                  ? API_IMG_500 + guest?.profile_path
                                  : genderImg
                              }
                              className="h-full w-full object-cover rounded-[9px]"
                              loading="lazy" 
                              alt={guest?.original_name}
                            />
                          </div>

                          <div className="grid gap-y-2 px-5 py-5">
                            <h2 className="font-bold text-[1.4rem]">
                              {guest?.original_name}
                            </h2>

                            <p className="text-[#a6a7a8] ">
                              Department: {guest?.known_for_department}
                            </p>

                            <p className="font-normal">
                              Character: {guest?.character}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {episode?.guest_stars?.length > 2 && (
                  <div className="flex items-center justify-center pt-8">
                    <Button
                      className="!rounded-[24px] !px-7 !py-6"
                      onClick={loadMore}
                      disabled={movieCount >= episode?.guest_stars?.length}
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetails;
