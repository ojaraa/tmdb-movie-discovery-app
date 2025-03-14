import { fallbackBgImage, fallbackPoster } from "@/lib/utils";
import { useGetSeriesDetailsQuery } from "@/services/api/tv-api-slice";
import { API_IMG, API_IMG_500 } from "@/services/models/general.model";
import { Link, useParams } from "react-router-dom";

const AllSeasons = () => {
  const { series_id } = useParams();
  const { data: seasonDetail } = useGetSeriesDetailsQuery({
    series_id: series_id as string,
  });
  return (
    <div className="">
      <div
        className="h-[25vh] bg-no-repeat bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: `linear-gradient(rgba(18, 18, 18,0.8),rgba(18, 18, 18)),url(${
            seasonDetail?.backdrop_path
              ? API_IMG + seasonDetail?.backdrop_path
              : fallbackBgImage
          })`,
        }}
      >
        <h2 className=" text-center mt-12 text-[3rem] font-bold">
          {seasonDetail?.original_name || seasonDetail?.name} - All Seasons
        </h2>
      </div>

      <div className="mx-[8rem] grid grid-cols-2 gap-10 py-10">
        {seasonDetail?.seasons?.map((season) => (
          <Link to={`/tv/season/${series_id}/${season?.season_number}`}>
            <div className=" grid grid-cols-[1fr_2.5fr] cursor-pointer gap-2 bg-[#171717] rounded-[15px]">
              <div className="h-[170px] rounded-[9px] ">
                <img
                  src={
                    season?.poster_path
                      ? API_IMG_500 + season?.poster_path
                      : fallbackPoster
                  }
                  className="h-full w-full object-cover rounded-[9px]"
                  alt={season?.name}
                />
              </div>

              <div className="grid gap-y-2 px-5 py-5">
                <h2 className="font-bold text-[1.4rem]">{season?.name}</h2>

                <p className="text-[#a6a7a8] ">
                  {season?.overview.slice(0, 250) || "No Overview Available"}..
                </p>

                <div className=" flex items-center gap-x-6">
                  <p className=""> Air Date : {season?.air_date}</p>
                  Total Episodes : {season?.episode_count}
                  <p className=""> </p>{" "}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllSeasons;
