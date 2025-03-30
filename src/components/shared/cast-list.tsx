import { API_IMG } from "@/services/models/general.model";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import male from "/assets/male.png";
import female from "/assets/female.png";
import { CastMember } from "@/services/models/movie.model";
import { Button } from "../ui/button";

interface CreditsProps {
  cast: CastMember[];
}

const CastList = ({ cast }: CreditsProps) => {
  return (
    <div className="py-8">
      <h2 className="pb-6 uppercase text-[2.5rem] font-bold">TOP CAST </h2>
      <div className="cast-members">
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={5}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
              navigation: true,
            },
          }}
        >
          {cast.length == 0
            ? "No Cast data  available"
            : cast?.map((member) => {
                const genderImg = member.gender === 1 ? female : male;
                return (
                  <SwiperSlide key={member?.cast_id}>
                    <Link to={`/person/${member?.id}`}>
                      <div className="flex flex-col cursor-pointer">
                        <div className="h-[300px] w-full hover:opacity-70 transition ease-in duration-300 rounded-lg ">
                          <img
                            src={
                              member?.profile_path
                                ? API_IMG + member?.profile_path
                                : genderImg
                            }
                            className="h-full w-full rounded-[8px] object-cover"
                            alt={member?.original_name}
                          />
                        </div>

                        <div className="text-center my-2">
                          <div className="font-bold text-[1.4rem]">
                            {member?.name ||member?.original_name}
                          </div>
                          <div className="font-medium text-[1.1rem]">
                            {member?.character}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>

      {cast?.length != 0 && (
        <div className="flex items-center justify-center my-10">
          <Link to={`full-cast-crew`}>
            <Button className="!rounded-[24px] !px-7 !py-7">
              Full cast and crew
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CastList;
