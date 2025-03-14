import { fallbackPoster } from "@/lib/utils";
import { API_IMG_500 } from "@/services/models/general.model";
import { Episode } from "@/services/models/tv.model";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface SeasonProps {
  currentSeason: Episode;
}
const CurrentSeason = ({ currentSeason }: SeasonProps) => {
  return (
    <div className="grid gap-y-5 py-[4rem]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[2rem] ">Latest season  </h2>
        <Link to={`/tv/all-seasons/${currentSeason?.show_id}`} className="text:hover-">
          View all seasons
        </Link>
      </div>

      {/* <Link to={`/${mediaType}/${ currentSeason?.id}`}> */}
      <div className=" grid grid-cols-[1fr_5fr] cursor-pointer p-5 gap-6 bg-[#171717] rounded-[15px]">
        <div className="h-[150px]  rounded-[9px] ">
          <img
            src={
              currentSeason?.still_path
                ? API_IMG_500 + currentSeason?.still_path
                : fallbackPoster
            }
            className="h-full w-full object-cover rounded-[9px]"
            //   alt={ currentSeason?.season_number}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="font-semibold text-[1.4rem] ">
            Season {currentSeason?.season_number} - ({currentSeason?.name})
          </h2>

          <p className="text-base leading-7">{currentSeason?.overview}</p>

          {currentSeason?.air_date && (
            <p className=" ">
              Air Date: {format(currentSeason?.air_date, "MMMM d, yyyy")}
            </p>
          )}

          <p className="">Total Episodes: {currentSeason?.episode_number}</p>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default CurrentSeason;
