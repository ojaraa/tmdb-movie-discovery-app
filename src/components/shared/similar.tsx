
import { fallbackPoster } from "@/lib/utils";
import { API_IMG } from "@/services/models/general.model";
import { SimilarMovieResult } from "@/services/models/movie.model";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
;

interface SimilarProps {
  media: SimilarMovieResult[]
    mediaType: 'tv' | 'movie'
}

const Similar = ({media, mediaType} : SimilarProps) => {
  return (
   <div className="py-8">
        <h2 className="pb-6 uppercase text-[1.8rem] sm:text-[2.5rem] font-bold">Similar Videos </h2>
        <div className="cast-movies">
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

            {media?.map((movie) => {
          
              return (
                <SwiperSlide key={movie?.id}>
                  <Link to={`/${mediaType}/${movie?.id}`}>
                    <div className="flex flex-col cursor-pointer">
                      <div className="h-[220px]  sm:h-[300px] w-full hover:opacity-70 transition ease-in duration-300 rounded-lg ">
                        <img
                          src={
                     movie?.poster_path ?
                        API_IMG + movie?.poster_path : fallbackPoster
                       
                          }
                          className="h-full w-full rounded-[8px] object-cover"
                          loading="lazy" 
                          alt={movie?.original_title}
                        />
                      </div>

                      <div className="text-center my-2">
                        <div className="font-bold text-lg sm:text-[1.4rem]">
                          {movie?.original_title || movie?.name || movie?.original_name}
                        </div>
                        {/* <div className="font-medium text-[1.1rem]">{movie?.character}</div> */}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
   </div>
  )
}

export default Similar