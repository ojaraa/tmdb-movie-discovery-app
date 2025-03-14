import MediaCard from "./media-card";
import { Swiper,SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TrendingApiResponse } from "@/services/models/general.model";
import { fallbackPoster } from "@/lib/utils";

interface SliderProps {
  title: string;
  media: TrendingApiResponse;
  mediaType: 'movie' | 'tv'
}

const MediaSlider = ({
  media, 
  title,
  mediaType,
}: SliderProps) => {
  const mediaData = media as TrendingApiResponse
  return ( 
    <>
    <div className="p-6 sm:p-10">
        <h2 className="pb-6 uppercase text-[1.4rem] font-bold">{title}</h2>
        <div className="movie-grid">
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={5}
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
                slidesPerView: 5.3,
                spaceBetween: 15,
                navigation: true,
              },
            }}
          >
            {/* {media? } */}
            {mediaData?.results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MediaCard
                  name={movie.original_title ?? movie.title ?? ''} 
                  img={movie.poster_path || fallbackPoster}
                  id={movie.id}
                  mediaType={mediaType}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>

  );
};

export default MediaSlider;
