import Loader from "@/components/shared/skeleton-loaders/loader";
import { Button } from "@/components/ui/button";
import { fallbackPoster } from "@/lib/utils";
import {
  useGetGenreDetailsQuery,
  useGetTvGenreDetailsQuery,
} from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";

const GenreDetails = () => {
  const { genre_id, genre_name, mediaType } = useParams();
    const [page, setPage] = useState<number>(1);
  const { data, isLoading: loadingDetails } = useGetGenreDetailsQuery({
    genre_id: genre_id ?? "",
    page
  });
  const { data: tvGenreData, isLoading } = useGetTvGenreDetailsQuery({
    genre_id: genre_id ?? "",
    page
  });
  const genreData = mediaType === "Movie" ? data : tvGenreData;

  if (loadingDetails || isLoading) {
    return <Loader />;
  }

  return (
    <div className=" px-4 sm:px-10">
      <div className="movies-page-header h-[25vh] bg-[linear-gradient(rgba(18,18,18,0.8),rgb(18,18,18)),url('/assets/bg.jpg')] bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
        <h2 className="uppercase text-center mt-12 text-3xl font-bold">
          Genre - {genre_name} {mediaType === "Movie" ? "Movies" : "TV Shows"}
        </h2>
      </div>
      {loadingDetails || isLoading ? (
        <div className="h-[64vh] flex items-center flex-col gap-y-8 justify-center">
          <Loader />
          {/* <p className="texc">Loading....</p> */}
        </div>
      ) : (
        <div className="grid items-center gap-4 sm:gap-8 py-6 px-0 sm:px-6 grid-cols-2 sm:grid-cols-5">
          {genreData?.results?.map((movie) => (
            <Link to={`/${mediaType}/${movie.id}`} key={movie.id}>
              <div className="relative">
                <div className=" h-[260px] sm:h-[320px] w-full">
                  <img
                    src={
                      movie?.poster_path
                        ? API_IMG + movie?.poster_path
                        : fallbackPoster
                    }
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-[5px]"
                  />
                </div>

                <div className="py-3 flex items-center justify-center">
                  <h4 className=" text-base sm:text-[1.2rem] font-medium text-center pt-2 ">
                    {movie?.original_name ||
                      movie?.name ||
                      movie?.original_title}{" "}
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
      )}

        <div className="flex items-center flex-col gap-y-5 sm:flex-row justify-between px-6 pt-24 sm:px-10 pb-10  ">
              <div>
                <p className="text-sm font-semibold text-[#667185]">
                  Page {genreData?.page} of {genreData?.total_pages}
                </p>
              </div>
      
              <ReactPaginate
                breakLabel="..."
                nextLabel={null}
                previousLabel={null}
                forcePage={page - 1}
                pageCount={genreData?.total_pages || 1}
                renderOnZeroPageCount={null}
                onPageChange={(page) => setPage(page.selected + 1)}
                containerClassName="flex gap-x-2 items-center"
                pageClassName="mx-1 py-0.5 px-2.5 text-[#98A2B3] text-sm"
                breakClassName="mx-1"
                activeClassName="rounded-md bg-[#E3EAFB] text-primary-blue"
              />
      
              <div>
                <div className="inline-flex gap-x-4">
                  <Button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={(genreData?.page || 1) <= 1}
                    variant="outline"
                    className="!text-deep-grey !w-[108px] rounded-[17px]  border border-table-border hover:border-table-border/75"
                  >
                    <ArrowLeft />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage((prev) => prev + 1)}
                    // disabled={tickets?.hasNext === false}
                    disabled={page === genreData?.total_pages}
                    className="!text-deep-grey !w-[108px]  border rounded-[17px]   border-table-border hover:border-table-border/75"
                    variant="outline"
                  >
                    Next
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>


    </div>
  );
};

export default GenreDetails;
