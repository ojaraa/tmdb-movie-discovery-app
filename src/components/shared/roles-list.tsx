import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { fallbackPoster } from "@/lib/utils";
import { API_IMG } from "@/services/models/general.model";
import { CastCredit } from "@/services/models/movie.model";
import { format } from "date-fns";

interface RoleListProps {
  title: string;
  type: "cast" | "crew";
  roles: CastCredit[];
  mediaType: "tv" | "movie";
}

const RolesList = ({ title, roles, type, mediaType }: RoleListProps) => {
  const [movieCount, setMovieCount] = useState(4);
  const loadMore = () => {
    setMovieCount((prev) => prev + 4);
  };
  return (
    <div>
      <h2 className="pb-6 uppercase text-[1.8rem] font-bold">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-10  ">
        {roles?.slice(0, movieCount).map((role) => {
          return (
            <Link to={`/${mediaType}/${role?.id}`}>
              <div className=" grid sm:grid-cols-[1fr_2.5fr] place-items-center sm:place-items-start cursor-pointer py-8 px-5 sm:p-8 gap-6 bg-[#171717] rounded-[15px]">
                <div className="h-[180px] rounded-[9px] w-[180px] ">
                  <img
                    src={
                      role?.poster_path
                        ? API_IMG + role?.poster_path
                        : fallbackPoster
                    }
                    className="h-full w-full object-cover rounded-[9px]"
                    loading="lazy" 
                    alt={role?.original_title}
                  />
                </div>

                <div className="grid gap-y-2 place-items-center sm:place-items-start">
              
                  <h2 className="font-semibold text-lg sm:text-[1.2rem] gap-2">
                    {`${
                        role?.original_name ||
                      role?.original_title ||
                      role?.name ||
                    
                      role?.title
                    }${
                      (role?.release_date || role?.first_air_date)
                        ? ` (${format(role?.release_date || role?.first_air_date, "yyyy")})`
                        : ""
                    }`}
                  </h2>
                  <div className="flex items-center">
                    <p className="text-gray-500 ">
                      Release date :{" "}
                      {(role?.release_date &&
                        format(role?.release_date, "MMMM d, yyyy")) ||
                        "Not available"}
                    </p>
                    {/* <p className=""></p> */}
                  </div>
                  {role?.overview ? (
                    <p className="text-sm sm:leading-[24px] text-center sm:text-left sm:text-sm">
                      {role?.overview.slice(0, 250)}...
                    </p>
                  ) : (
                    "Overview not available"
                  )}

                  {role?.character || role?.job ? (
                    <p className="font-light">
                      {type === "cast"
                        ? `Character: ${role?.character}`
                        : `Job: ${role?.job}`}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {roles.length > 4 && (
        <div className="flex items-center justify-center my-10">
          <Button className="!rounded-[24px] !px-7 !py-6" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default RolesList;
