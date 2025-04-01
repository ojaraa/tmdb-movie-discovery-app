import { useParams } from "react-router-dom";
import { useGetActorDetailsQuery } from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import male from "/assets/male.png";
import female from "/assets/female.png";
import { useState } from "react";
import {format} from 'date-fns'
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiTiktokFill,
  RiTwitterFill,
  RiYoutubeFill,
} from "react-icons/ri";

import RolesList from "./shared/roles-list";
import Loader from "./shared/skeleton-loaders/loader";

const ActorDetails = () => {
  const { person_id } = useParams<string>();
  const personId = person_id ?? "";
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const { data: actorDetail , isLoading } = useGetActorDetailsQuery({
    person_id: personId,
  });


  const genderImg = actorDetail?.gender === 1 ? female : male;

  if (isLoading) {
    return<Loader/>
  }

  return (
    <div className=" grid gap-y-16 mx-6 sm:mx-[6rem] pb-10">
      <div className="grid sm:grid-cols-[1fr_3fr] sm:bg-[#171717] p-4 sm:p-10 gap-16 mt-16 rounded-2xl">
        <div className="h-[360px] sm:w-[280px]">
          <img
            src={
              actorDetail?.profile_path
                ? API_IMG + actorDetail?.profile_path
                : genderImg
            }
            alt={actorDetail?.name}
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        <div className="actor-biography-text">
          <h2 className="text-5xl font-bold mb-6">{actorDetail?.name}</h2>
          <h4 className="my-3 text-2xl font-semibold">Biography</h4>
          {actorDetail?.biography ? (
            <div className="">
              <p className="leading-[30px] text-xl transition-all duration-700">
                {expanded
                  ? actorDetail?.biography
                  : `${actorDetail?.biography.slice(0, 500)}.....`}

                {actorDetail?.biography.length > 500 && (
                  <button
                    onClick={toggleExpand}
                    className="text-slate-400  transition-opacity duration-300 hover:opacity-70"
                  >
                    {/* ... */}
                    {expanded ? "show less" : "read more"}
                  </button>
                )}
              </p>
            </div>
          ) : (
            <p className=" mt-5 opacity-80 text-sm">No biography available</p>
          )}
        </div>
      </div>

      <div className=" ">
        <div className="">
          <h2 className="pb-6 uppercase text-[1.8rem] font-bold">
            Personal Info
          </h2>
          <div className="grid gap-y-8 items-center">
            <div className="">
              <div className="flex items-center gap-6">
                {actorDetail?.external_ids?.instagram_id && (
                  <div className="social-link">
                    <a
                      href={`https://www.instagram.com/${actorDetail?.external_ids?.instagram_id}`}
                      target="_blank"
                    >
                      {" "}
                      <RiInstagramLine size={25} />
                    </a>
                  </div>
                )}
                {actorDetail?.external_ids?.twitter_id && (
                  <div className="social-link">
                    <a
                      href={`https://www.twitter.com/${actorDetail?.external_ids?.twitter_id}`}
                      target="_blank"
                    >
                      <RiTwitterFill size={25} />
                    </a>
                  </div>
                )}

                {actorDetail?.external_ids?.facebook_id && (
                  <div className="social-link">
                    <a
                      href={`https://www.facebook.com/${actorDetail?.external_ids?.facebook_id}`}
                      target="_blank"
                    >
                      <RiFacebookCircleFill size={25} />
                    </a>
                  </div>
                )}

                {actorDetail?.external_ids?.tiktok_id && (
                  <div className="social-link">
                    <a
                      href={`https://www.tiktok.com/${actorDetail?.external_ids?.tiktok_id}`}
                      target="_blank"
                    >
                      <RiTiktokFill size={25} />
                    </a>
                  </div>
                )}

                {actorDetail?.external_ids?.youtube_id && (
                  <div className="social-link">
                    <a
                      href={`https://www.youtube.com/${actorDetail?.external_ids?.youtube_id}`}
                      target="_blank"
                    >
                      <RiYoutubeFill size={25} />
                    </a>
                  </div>
                )}

                <div className="social-link"></div>
              </div>
            </div>
            <div className="sm:flex grid grid-cols-2 gap-12 gap-y-6">
              {actorDetail?.known_for_department && (
                <div>
                  <h6 className="text-xl mb-1 font-semibold">Role</h6>
                  <p className="text-base  font-normal text-[#f8fafc]">
                    {actorDetail?.known_for_department}
                  </p>
                </div>
              )}

              {actorDetail?.gender && (
                <div>
                  <h6 className="text-xl mb-1 font-semibold">Gender</h6>
                  <p className="text-base  font-normal text-[#f8fafc]">
                    {actorDetail?.gender === 1 ? "Female" : "Male"}
                  </p>
                </div>
              )}

              {actorDetail?.birthday && (
                <div>
                  <h6 className="text-xl mb-1 font-bold">Birthday</h6>
                  <p className="text-base  font-normal text-[#f8fafc]">
                    {format(actorDetail?.birthday, 'MMMM d, yyyy')}
                    {/* {actorDetail?.birthday} */}
                  </p>
                </div>
              )}

              {actorDetail?.place_of_birth && (
                <div>
                  <h6 className="text-xl mb-1 font-semibold">Place of Birth</h6>
                  <p className="text-base  font-normal text-[#f8fafc]">
                    {actorDetail?.place_of_birth}
                  </p>
                </div>
              )}

              {actorDetail?.deathday && (
                <div>
                  <h6 className="text-xl mb-1 font-semibold">Died on</h6>
                  <p className="text-base  font-normal text-[#f8fafc]">
                    {actorDetail?.deathday}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-y-16">
        {actorDetail?.movie_credits?.cast && actorDetail?.movie_credits?.cast.length > 0  && (
          <RolesList
            title=" Acting in Movies"
            roles={actorDetail?.movie_credits?.cast}
            type="cast"
            mediaType="movie"
          />
        )}

        {actorDetail?.movie_credits?.crew && actorDetail?.movie_credits.crew.length > 0 && (
          <RolesList
            title="Movie Production Roles"
            roles={actorDetail?.movie_credits?.crew}
            type="crew"
            mediaType="movie"
          />
        )}

        {actorDetail?.tv_credits?.cast && actorDetail?.tv_credits?.cast.length && (
          <RolesList
            title=" Acting in TvShows"
            roles={actorDetail?.tv_credits?.cast}
            type="cast"
            mediaType="tv"
          />
        )}

        { actorDetail?.tv_credits?.crew && actorDetail?.tv_credits?.crew.length  > 0 && (
          <RolesList
            title="Tv Shows Production Roles"
            roles={actorDetail?.tv_credits?.crew}
            type="crew"
            mediaType="tv"
          />
        )}
      </div>
    </div>
  );
};

export default ActorDetails;
