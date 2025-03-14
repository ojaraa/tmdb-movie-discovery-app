import { API_IMG } from "@/services/models/general.model";
import { Link } from "react-router-dom";

interface MediaCardProps {
  id: number;
  name: string;
  img: string;
  mediaType: "tv" | 'movie'
}

const MediaCard = ({ id, name, img, mediaType }: MediaCardProps) => {
  return (
    <Link to={`${mediaType}/${id}`}>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <img
            src={API_IMG + img}
            alt="movie-poster"
            className="w-full h-[280px] object-cover rounded-[5px]"
          />
        </div>

        <div className="mt-2 font-normal text-base text-center">
          <h4>{name}</h4>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
