import { GenreList } from "@/services/models/movie.model";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button";

interface GenreProps {
  genreList: GenreList;
  title: string;
}

const GenreListComponent = ({ genreList, title }: GenreProps) => {
  return (
    <div className="px-4  sm:px-[3rem] grid gap-y-6 py-6"> 
    <p className="text-2xl font-semibold">{title} Genres</p>
    <div className="flex items-center flex-wrap gap-x-3 gap-y-4  sm:gap-5 ">
      {genreList?.genres.map((list) => (
        <Link to={`/genre/${title}/${list.id}/${list?.name}`} key={list.id}>
          <div
            // variant={"secondary"}
            className="bg-[#171717] text-white py-[.5rem] px-[1rem] rounded-[999px]"
          >
            {list?.name}
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default GenreListComponent;
