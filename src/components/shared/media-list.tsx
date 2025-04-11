import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Movie, movieType } from "@/services/models/movie.model";
import { useGetMediaListByCategoriesQuery } from "@/services/api/movies-api-slice";
import { API_IMG, MediaType } from "@/services/models/general.model";
import { fallbackPoster } from "@/lib/utils";
import Loader from "./skeleton-loaders/loader";
import { format } from "date-fns";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MediaListProps {
  pageTitle: string;
  mediaType: MediaType;
}
const MediaList = ({ pageTitle, mediaType }: MediaListProps) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [categoryChange, setCategoryChange] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<movieType>(
    movieType.trending
  );

  const handleSelectCategory = (category: movieType) => {
    if (category != selectedCategory) {
      setCategoryChange(true);
      setSelectedCategory(category);
      setPage(1);
      setMovieList([]);
    }
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

  useEffect(() => {
    if (movieData?.results) {
      if (page === 1 || categoryChange) {
        setMovieList(movieData?.results);
        setCategoryChange(false);
      } else {
        setMovieList((prev) => {
          const existingMovieId = new Set(prev.map((movie) => movie.id));
          const uniqueMovies = movieData?.results.filter(
            (movie) => !existingMovieId.has(movie.id)
          );
          return [...prev, ...uniqueMovies];
        });
      }
    }
  }, [movieData?.results, categoryChange, page]);

  return (
    <>
      <div className=" px-4 sm:px-10">
        <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
          <h2 className="uppercase text-center mt-12 text-3xl font-bold">
            {pageTitle}
          </h2>
        </div>

        <div className="grid  grid-cols-2 sm:grid-cols-4  gap-4 items-center px-8 sm:w-[50vw] mx-auto py-6">
          <Button
            className={`${
              selectedCategory === movieType.trending
                ? "bg-[#d90429]"
                : "bg-[#222]"
            } border-none !py-6 px-4 rounded-[.7rem] `}
            onClick={() => handleSelectCategory(movieType.trending)}
          >
            Trending
          </Button>

          <Button
            className={`${
              selectedCategory === movieType.topRated
                ? "bg-[#d90429]"
                : "bg-[#222]"
            } border-none !py-6 px-4 rounded-[.7rem] `}
            onClick={() => handleSelectCategory(movieType.topRated)}
          >
            Top Rated
          </Button>
          <Button
            className={`${
              selectedCategory === movieType.popular
                ? "bg-[#d90429]"
                : "bg-[#222]"
            } border-none !py-6 px-4 rounded-[.7rem] `}
            onClick={() => handleSelectCategory(movieType.popular)}
          >
            Popular
          </Button>
          {mediaType === "movie" ? (
            <Button
              className={`${
                selectedCategory === movieType.nowPlaying
                  ? "bg-[#d90429]"
                  : "bg-[#222]"
              } border-none !py-6 px-4 rounded-[.7rem] `}
              onClick={() => handleSelectCategory(movieType.nowPlaying)}
            >
              Now in cinemas
            </Button>
          ) : mediaType === "tv" ? (
            <Button
              className={`${
                selectedCategory === movieType.airingToday
                  ? "bg-[#d90429]"
                  : "bg-[#222]"
              } border-none !py-6 px-4 rounded-[.7rem] `}
              onClick={() => handleSelectCategory(movieType.airingToday)}
            >
              Airing Today
            </Button>
          ) : (
            ""
          )}
        </div>

        {categoryChange || isLoading || isFetching ? (
          <div className="h-[64vh] flex items-center flex-col gap-y-8 justify-center">
            <Loader />
            {/* <p className="texc">Loading....</p> */}
          </div>
        ) : movieData?.results && movieData?.results.length > 0 ? (
          <div className="grid items-center gap-4 sm:gap-y-8  sm:gap-x-6    md:px-3  grid-cols-2   sm:grid-cols-5">
            {movieList.map((movie) => (
              <Link to={`/${mediaType}/${movie.id}`} key={movie.id}>
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
        ) : (
          <div className="flex items-center justify-center  flex-col gap-y-3 py-6 h-[60vh] text-center">
            <MdOutlinePlaylistRemove size={80} />
            <p className="font-bold text-2xl sm:text-3xl">Empty list</p>
          </div>
        )}
      </div>

      {/* {movieData?.results && movieData?.results.length > 0 && (
        <div className="flex items-center justify-center pt-8 ">
          <Button
            onClick={loadMoreData}
            className="!rounded-3xl !px-6 !py-6"
            disabled={isFetching}
          >
            Load More
          </Button>
        </div>
      )} */}

      <div className="flex items-center justify-between px-6 pt-24 sm:px-10 pb-10">
        <div>
          <p className="text-sm font-semibold text-[#667185]">
            Page {movieData?.page} of {movieData?.total_pages}
          </p>
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel={null}
          previousLabel={null}
          forcePage={page - 1}
          pageCount={movieData?.total_pages || 1}
          renderOnZeroPageCount={null}
          onPageChange={(page) => setPage(page.selected + 1)}
          containerClassName="flex gap-x-2 items-center"
          pageClassName="mx-1 py-0.5 px-2.5 text-[#98A2B3] text-sm"
          breakClassName="mx-1"
          activeClassName="rounded-md bg-[#E3EAFB] text-primary-blue"
          // pageCount={movieData?.page ?? 1}
        />

        <div>
          <div className="inline-flex gap-x-4">
            <Button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={(movieData?.page || 1) <= 1}
              variant="outline"
              className="!text-deep-grey !w-[108px]  border border-table-border hover:border-table-border/75"
            >
              <ArrowLeft />
              Previous
            </Button>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              // disabled={tickets?.hasNext === false}
              className="!text-deep-grey !w-[108px]  border border-table-border hover:border-table-border/75"
              variant="outline"
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaList;
