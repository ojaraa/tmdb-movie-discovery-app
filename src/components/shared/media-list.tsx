import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { movieType } from "@/services/models/movie.model";
import { useGetMediaListByCategoriesQuery } from "@/services/api/movies-api-slice";
import { API_IMG, MediaType } from "@/services/models/general.model";
import { fallbackPoster } from "@/lib/utils";

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
  const { data: movieData, isLoading } = useGetMediaListByCategoriesQuery({
    categoryType: selectedCategory,
    page,
    mediaType,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="px-10">
        <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
          <h2 className="uppercase text-center mt-12 text-3xl font-bold">
            {pageTitle}
          </h2>
        </div>

        <div className="flex gap-6 justify-center items-center">
          <Button className="border-none py-1 px-4 rounded-[.7rem] bg-[rgb(47,46,46)]" 
            onClick={() => handleSelectCategory(movieType.trending)}>
            Trending
          </Button>


          <Button
            className="border-none py-1.5 px-4 rounded-[.7rem] bg-[rgb(47,46,46)] "
            onClick={() => handleSelectCategory(movieType.topRated)}
          >
            Top Rated
          </Button>
          <Button
            className="border-none py-1.5 px-4 rounded-[.7rem] bg-[rgb(47,46,46)]"
            onClick={() => handleSelectCategory(movieType.popular)}
          >
            Popular
          </Button>
          <Button
            className="border-none py-1.5 px-4 rounded-[.7rem] bg-[rgb(47,46,46)]"
            onClick={() => handleSelectCategory(movieType.nowPlaying)}
          >
            Now in cinemas
          </Button>
        </div>

        <div className="grid items-center gap-8 py-6 px-7 grid-cols-4">
          {movieData?.results?.map((movie) => (
            <Link to={`/${mediaType}/${movie.id}`}>
              <div className="relative" key={movie.id}>
                <div className="h-[320px] w-full">
                  <img
                    src={
                      movie?.poster_path
                        ? API_IMG + movie?.poster_path
                        : fallbackPoster
                    }
                    alt=""
                    className="w-full h-full object-cover rounded-[5px]"
                  />
                </div>

                <div className="absolute bottom-6 px-5 py-5 backdrop-blur-[54px] left-6 right-6 rounded-[8px]">
                  <h4 className="text-[1.2rem] font-semibold">
                    {movie?.original_title || movie?.original_name}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-base font-normal text-[rgb(207, 206, 206)]">
                      {movie?.release_date || movie?.first_air_date}
                    </p>
                    <p>
                      {8.5}{" "}
                      <span>
                        <img src="" alt="" />
                      </span>
                    </p>
                  </div>
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
