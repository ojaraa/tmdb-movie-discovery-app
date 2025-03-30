import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLazySearchForMoviesTvPeopleQuery } from "@/services/api/general-api-slice";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { fallbackPoster } from "@/lib/utils";
import { Link } from "react-router-dom";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import male from "/assets/male.png";
import female from "/assets/female.png";
// import MediaListSkeleton from "@/components/shared/skeleton-loaders/media-list-skeleton";
import Loader from "@/components/shared/skeleton-loaders/loader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [trigger, { data , isLoading}] = useLazySearchForMoviesTvPeopleQuery();
  // const isLoading = true;
  console.log(data);

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      console.log("Debounced Search Query:", value);
    }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      trigger({ query: value });
    }
    debouncedOnChange(value);
  };

  return (
    <>

    <div className="px-[10rem]">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          Search
        </h2>
      </div>

      <div className="grid grid-cols-[5fr_1fr] gap-x-5 px-[13rem]">
        <div className="flex bg-[#1c1c1c] border border-transparent rounded-full pl-10  items-center">
          <SearchIcon />
          <Input
            className="pr-3 py-6 border border-transparent rounded-full leading-5 bg-[#1c1c1c]"
            placeholder="Search for movies, tv shows and people...."
            onChange={handleChange}
            value={query}
          />
        </div>

        <Button className="py-6 rounded-full">Search</Button>
      </div>

      <div className="grid items-center gap-8 py-6 grid-cols-4 ">
        {isLoading ? (
          <Loader/>
        ) : (
          data?.results?.map((movie) => {
            const mediaType = movie?.media_type;
            const genderImg = movie?.gender === 1 ? female : male;
            return (
              <Link to={`/${mediaType}/${movie.id}`} key={movie.id}>
                <div className="relative">
                  <div className="h-[320px] w-full">
                    {mediaType === "person" && (
                      <img
                        src={
                          movie?.profile_path
                            ? API_IMG + movie?.profile_path
                            : genderImg
                        }
                        alt={movie?.name}
                        className="w-full h-full object-cover rounded-[5px]"
                      />
                    )}
                    {mediaType === "movie" ||
                      (mediaType === "TV" && (
                        <img
                          src={
                            movie?.poster_path
                              ? API_IMG + movie?.poster_path
                              : fallbackPoster
                          }
                          alt=""
                          className="w-full h-full object-cover rounded-[5px]"
                        />
                      ))}
                  </div>
                </div>

                <div className="py-2">
                  <h4 className="text-[1.2rem] font-semibold text-center gap-x-2 flex items-center justify-center ">
                    {movie?.original_title ||
                      movie?.original_title ||
                      movie?.title ||
                      movie?.name}
                    {movie?.release_date && (
                      <span>({format(movie?.release_date, "yyyy")})</span>
                    )}
                  </h4>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
    </>
  );
};

export default Search;
