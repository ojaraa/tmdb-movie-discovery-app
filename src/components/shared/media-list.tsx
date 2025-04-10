import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { movieType } from "@/services/models/movie.model";
import { useGetMediaListByCategoriesQuery } from "@/services/api/movies-api-slice";
import { API_IMG, MediaType } from "@/services/models/general.model";
import { fallbackPoster } from "@/lib/utils";
import Loader from "./skeleton-loaders/loader";
import { format } from "date-fns";

interface MediaListProps {
  pageTitle: string;
  mediaType: MediaType;
}
const MediaList = ({ pageTitle, mediaType }: MediaListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<movieType>(
    movieType.topRated
  );
  const handleSelectCategory = (category: movieType) => {
    setSelectedCategory(category);
  };
  const [page, setPage] = useState<number>(1);
  const {
    data: movieData,
    isLoading,
    isFetching,
  } = useGetMediaListByCategoriesQuery({
    categoryType: selectedCategory,
    page,
    mediaType,
  });
  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <>
      <div className=" px-4 sm:px-10">
        <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
          <h2 className="uppercase text-center mt-12 text-3xl font-bold">
            {pageTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4  gap-4 items-center px-8 sm:w-[50vw] mx-auto py-6">
          <Button
            className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222]"
            onClick={() => handleSelectCategory(movieType.trending)}
          >
            Trending
          </Button>

          <Button
            className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222] "
            onClick={() => handleSelectCategory(movieType.topRated)}
          >
            Top Rated
          </Button>
          <Button
            className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222]"
            onClick={() => handleSelectCategory(movieType.popular)}
          >
            Popular
          </Button>
          <Button
            className="border-none !py-6 px-4 rounded-[.7rem] bg-[#222]"
            onClick={() => handleSelectCategory(movieType.nowPlaying)}
          >
            Now in cinemas
          </Button>
        </div>

        <div className="grid items-center gap-4 sm:gap-y-8  sm:gap-x-6   sm:px-7 grid-cols-2 sm:grid-cols-5">
          {movieData?.results?.map((movie) => (
            <Link to={`/${mediaType}/${movie.id}`}>
              <div className="relative" key={movie.id}>
                <div className="h-[270px] w-full">
                  <img
                    src={
                      movie?.poster_path
                        ? API_IMG + movie?.poster_path
                        : fallbackPoster
                    }
                    alt={movie?.original_name || movie?.original_title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-[5px]"
                  />
                </div>
                <div className="py-3 flex items-center justify-center">
                  <h4 className=" text-base sm:text-[1.2rem] font-medium text-center pt-2 ">
                    {movie?.name ||
                      movie?.original_title ||
                      movie?.original_name}{" "}
                    {""}
                   
                    {(movie?.release_date || movie?.first_air_date) && (
                      <span>
                        (
                        {format(
                          movie?.release_date || movie?.first_air_date,
                          "yyyy"
                        )}
                        )
                      </span>
                    )}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center pt-8 ">
        <Button onClick={() => setPage((prev) => prev + 1)} className="">
          Load More
        </Button>
      </div>

      
    </>
  );
};

export default MediaList;
