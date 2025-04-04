import { GenreList } from "@/services/models/movie.model";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface GenreProps {
  genreList: GenreList;
  title: string;
}
const GenreListComponent = ({ genreList, title }: GenreProps) => {
  return (
    <>
    <p className="text-2xl font-semibold">{title} Genres</p>
    <div className="flex items-center flex-wrap justify-center gap-5 ">
      {genreList?.genres.map((list) => (
        <Link to={`/genre/${title}/${list.id}/${list?.name}`} key={list.id}>
          <Button
            variant={"secondary"}
            className="bg-[#171717] text-white py-6 px-10 rounded-[10px]"
          >
            {list?.name}
          </Button>
        </Link>
      ))}
    </div>
    </>
  );
};

export default GenreListComponent;
