import { Button } from "@/components/ui/button";
import { fallbackPoster, WatchList } from "@/lib/utils";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const getWatchlist = () =>
    JSON.parse(localStorage.getItem("watchlist") || "[]");
  const watchListData = getWatchlist();

  return (
    <div className="px-4">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          WatchList
        </h2>
      </div>

      <div className="grid grid-cols-2   gap-4 items-center px-8 sm:w-[30vw] mx-auto py-6">
        <Button className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222]">
          Movies
        </Button>

        <Button className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222] ">
          Tv Shows
        </Button>
      </div>
      <div className="grid items-center gap-4 sm:gap-y-8  sm:gap-x-6   sm:px-7 grid-cols-2 sm:grid-cols-5">
        {watchListData.map((movie: WatchList) => (
          <Link to={`/${movie?.type}/${movie.id}`}>
            <div className="relative group" key={movie.id}>
              <div className="h-[270px] w-full">
                <img
                  src={
                    movie?.poster_path
                      ? API_IMG + movie?.poster_path
                      : fallbackPoster
                  }
                  alt={movie?.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[5px]"
                />
              </div>

              <div className="absolute top-0 bottom-0 left-0 right-0  
          inset-0 bg-black/80 hidden group-hover:flex items-center justify-center
             ">
                <Trash />
              </div>

            </div>
            <div className="py-3 flex items-center justify-center">
              <h4 className=" text-base sm:text-[1.2rem] font-medium text-center pt-2 ">
                {movie?.name} {""}
                {movie?.release_date && (
                  <span>({format(movie?.release_date, "yyyy")})</span>
                )}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
