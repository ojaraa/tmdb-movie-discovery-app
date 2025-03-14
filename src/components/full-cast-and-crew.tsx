import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { API_IMG_500 } from "@/services/models/general.model";
import male from "/assets/male.png";
import female from "/assets/female.png";
import { CastMember } from "@/services/models/movie.model";
import { useState } from "react";

interface CreditsProps {
  title: string;
  type: "cast" | "crew";
  credits: CastMember[];
}

const FullCastAndCrew = ({ title, type, credits }: CreditsProps) => {
    const [visible, setVisible] = useState(10)
    const loadMore = () => {
        setVisible((prev) => prev + 10)
    };

  return (
    <div className=" ">
      <h2 className="pb-6  text-[2rem] font-semibold">
        {title}
        <span> ({credits?.length})</span>
      </h2>
      <div className="grid gap-y-10  ">
        {credits?.slice(0, visible).map((role) => {
          const genderImg = role?.gender === 1 ? female : male;
          return (
            <Link to={`/person/${role?.id}`}>
              <div className=" grid grid-cols-[1fr_2.5fr] cursor-pointer gap-6 bg-[#171717] rounded-[15px]">
                <div className="h-[150px] rounded-[9px] ">
                  <img
                    src={
                      role?.profile_path
                        ? API_IMG_500 + role?.profile_path
                        : genderImg
                    }
                    className="h-full w-full object-cover rounded-[9px]"
                    alt={role?.original_name}
                  />
                </div>

                <div className="grid gap-y-2 px-5 py-5">
                  <h2 className="font-bold text-[1.4rem]">
                    {role?.original_name}
                  </h2>
               
                    <p className="text-[#a6a7a8] ">
                      Department:{" "}
                      {type === "cast"
                        ? `${role?.known_for_department}`
                        : `${role?.department}`}
                    </p>
     

                  <p className="font-normal">
                    {type === "cast"
                      ? `Character: ${role?.character}`
                      : `Job: ${role?.job}`}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {credits && credits?.length > 4 && (
        <div className="flex items-center justify-center my-10">
          <Button className="!rounded-[24px] !px-7 !py-6" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default FullCastAndCrew;
