import { fallbackBgImage } from "@/lib/utils";
import { useGetAllVideosQuery } from "@/services/api/movies-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

const AllVideos = () => {
    const {movie_id} = useParams<string>()
    const {data: allVideos} = useGetAllVideosQuery({movie_id: movie_id as string})
      const [visible, setVisible] = useState(10)
        const loadMore = () => {
            setVisible((prev) => prev + 10)
        };
  return (
    <div className="">
      <div
        className="h-[25vh] bg-no-repeat bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: `linear-gradient(rgba(18, 18, 18,0.8),rgba(18, 18, 18)),url(${
            allVideos?.backdrop_path
              ? API_IMG + allVideos?.backdrop_path
              : fallbackBgImage
          })`,
        }}
      >
        <h2 className=" text-center mt-12 text-[3rem] font-bold">
          {allVideos?.original_title} - Related Videos
        </h2>
      </div>


      <div className="grid  grid-cols-3 gap-y-8 gap-x-8  mx-[8rem] pb-[4rem]">
        {allVideos?.videos.results. slice(0,visible).map((video) => (
          <div className="video" key={video.id}>
            <iframe
              key={video.id}
              width="100%"
              title={video.name}
              src={`https://www.youtube.com/embed/${video?.key}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&controls=0&disablekb=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[280px] rounded-[8px]"
            ></iframe>
            <h3 className="mt-4 text-[1.3rem] font-semibold"> {video.name}</h3>
          </div>
        ))}
      </div>

      {allVideos?.videos?.results && allVideos?.videos?.results.length > visible &&
      <div className="flex items-center justify-center my-10">
      <Button className="!rounded-[24px] !px-7 !py-6" onClick={loadMore}>
        Load more
      </Button>
    </div>
   }

      

    </div>
  );
};

export default AllVideos;
