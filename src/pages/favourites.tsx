import Loader from "@/components/shared/skeleton-loaders/loader";
import { Button } from "@/components/ui/button";
import { fallbackPoster, WatchList } from "@/lib/utils";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const Favourites = () => {
  const [watchListData, setWatchListData] = useState<WatchList[]>([]);
  const [activeType , setActiveType] = useState('all')
  const [loading, setLoading] = useState(true);
// const getWatchList = () => {
//   const storedList = JSON.parse(localStorage.getItem("watchlist") || "[]");
// }
  const removeFromWatchlist = (id: number) => {
    setLoading(true);
    const storedList = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const updatedList = storedList.filter(
      (movie: WatchList) => movie.id !== id
    );
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    setWatchListData(updatedList);
    toast.success("Movie removed from watchlist");
    setLoading(false);
  };

  useEffect(() => {
    const loadTime = setTimeout(() => {
      const storedList = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setWatchListData(storedList);
      setLoading(false);
    }, 500);

    return () => clearTimeout(loadTime);
  }, []);

  const filterByType = (movieType: string) => {
    setActiveType(movieType);
    const fullList = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const filtered = movieType === "all" ? fullList : fullList.filter((movie: WatchList) => movie.type === movieType);
    setWatchListData(filtered);
  }

  if (loading) {
    return <Loader />;
  }
  console.log(watchListData)

  return (
    <div className="px-4">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          WatchList
        </h2>
      </div>

      <div className="grid grid-cols-3   gap-4 items-center px-8 sm:w-[30vw] mx-auto py-6">
      <Button className ={ `border-none !py-6 px-4 rounded-[.7rem] bg-[#222]  ${
              activeType === "all"
                ? "bg-[#d90429]"
                : "bg-[#222]"
            }` }onClick={() => filterByType("all")}  >
         All
        </Button>

        <Button  className ={ `border-none !py-6 px-4 rounded-[.7rem] bg-[#222]  ${
              activeType === "movie"
                ? "bg-[#d90429]"
                : "bg-[#222]"
            }` } onClick={() => filterByType('movie')}>
          Movies
        </Button>

        <Button  className ={ `border-none !py-6 px-4 rounded-[.7rem] bg-[#222]  ${
              activeType === "tv"
                ? "bg-[#d90429]"
                : "bg-[#222]"
            }` } onClick={() => filterByType('tv')}>
          Tv Shows
        </Button>
      </div>

      <div className="">

      <div className="px-6 flex justify-end font-semibold">
        <p>Total :  {watchListData?.length || 0}</p>
      </div>

      {loading ? (
        <p>Loading.....</p>
      ) : watchListData.length > 0 ? (
        <div className="grid items-center gap-4 sm:gap-8 py-6 px-0 sm:px-6 grid-cols-2 sm:grid-cols-5">
          {watchListData.map((movie: WatchList) => (
            <Link to={`/${movie?.type}/${movie.id}`} key={movie?.id}>
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

                <div
                  className="absolute top-0 bottom-0 left-0 right-0  
    inset-0 bg-black/80 hidden group-hover:flex items-center justify-center
       "
                >
                  <button
                    className="bg-none outline-none border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      removeFromWatchlist(movie?.id);
                    }}
                  >
                    <Trash />
                  </button>
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
      ) : (
        <div className="flex items-center justify-center  flex-col gap-y-3 py-6 h-[60vh] text-center">
          <MdOutlinePlaylistRemove size={80}  />
          <p className="font-bold text-2xl sm:text-3xl">Your watchlist is empty.</p>
          <p className=""> Start adding  your favourite movies or shows to build your watchlist.</p>      
          <Link to={`/`}>
            <Button className="!rounded-[10px] mt-4 ">Browse Movies</Button>
          </Link>
        </div>
      )}

      </div>
    

    
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="dark"
        transition={Slide}
        closeOnClick={true}
        pauseOnHover
      />
    </div>
  );
};

export default Favourites;
