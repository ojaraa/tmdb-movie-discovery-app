import { Video } from "@/services/models/movie.model";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface VideoProps {
  videos: Video[];
}

const RelatedVideos = ({ videos }: VideoProps) => {
  return (
    <div className="py-8">
      <h2  className="pb-6 uppercase text-[2.5rem] font-bold"> related Videos</h2>
      <div className="grid  grid-cols-2 gap-x-4 sm:grid-cols-3 gap-y-8 sm:gap-x-8 ">
        {videos.slice(0, 6).map((video) => (
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

      {videos?.length != 0 && (
        <div className="flex items-center justify-center my-10">
          <Link to={`all-videos`}>
            <Button className="!rounded-[24px] !px-7 !py-6">
              See all videos
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RelatedVideos;
