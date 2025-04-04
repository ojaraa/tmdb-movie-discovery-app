import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useFetchAllTrendingMediaQuery } from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { Link } from "react-router-dom";
// import { RiPlayCircleFill } from "react-icons/ri";
import { MdMovie } from "react-icons/md";
import Loader from "@/components/shared/skeleton-loaders/loader";
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

const Popular = () => {
  const { data: trendingMedia, isLoading } = useFetchAllTrendingMediaQuery();
  const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  if (isLoading) {
    return<Loader/>
  }
  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 90000 }}
        loop={true}
        slidesPerView={1}
      >
        {trendingMedia?.results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="w-full h-full  pl-[2rem]  pt-[12rem] sm:pt-[5rem] sm:pl-12 "
              style={{
                background: ` linear-gradient(90deg,rgba(0,0,0,.9) 10%,transparent 90%),linear-gradient(1turn,rgba(0,0,0,.9),transparent 50%),url(${
                  API_IMG + movie.backdrop_path
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: " cover",
                height: "500px",
                backgroundPosition: "center",
              }}
            >
              <div className="flex items-center gap-2">
                <img src="" alt={movie.name} className="w-4 h-4 " loading="lazy"  />
                <p className="text-base font-extrabold">
                  {movie.vote_average * 10}
                </p>
              </div>

              <Link to={`${movie.media_type}/${movie?.id}`}>
                <h1 className="sm:pb-8 text-[2.5rem] sm:text-[3.5rem] mb-2 font-bold">
                  {movie?.name} {movie?.title}
                </h1>
              </Link>

              <p className="w-full sm:w-[55%]">{truncateString(movie?.overview, 180)}</p>
              {movie.release_date && (
                <p className="mt-8 font-bold ">
                  Release Date: {movie?.release_date}
                </p>
              )}

              <div className="flex items-center gap-4 mt-10">
                {/* <button className=" flex items-center gap-1.5 bg-[#d90429] text-white rounded-[20px] py-[5px] px-4 border-0 outline-none">
                  <RiPlayCircleFill
                    style={{ color: "#fff", fontSize: "2rem" }}
                  />
                  <span> Watch</span>
                </button> */}

                <button className="flex items-center gap-1.5 bg-[#d90429] text-white rounded-[20px] py-[5px] px-4 border-0 outline-none">
                  <MdMovie />
                  {movie.media_type}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Popular;
