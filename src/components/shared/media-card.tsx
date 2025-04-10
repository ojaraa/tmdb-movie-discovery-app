import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface MediaCardProps {
  id: number;
  name: string;
  img: string;
  mediaType: "tv" | 'movie';
  releaseDate : string;
}

const MediaCard = ({ id, name, img, mediaType, releaseDate }: MediaCardProps) => {
  return (
    <Link to={`${mediaType}/${id}`}>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <img
            src={API_IMG + img}
            alt="movie-poster"
            loading="lazy" 
            className="w-full h-[270px] object-cover rounded-[5px]"
          />
        </div>

        <div className="mt-2 font-normal text-base text-center">
          <h4>{name} {""} ({format(releaseDate, "yyyy")})</h4>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
