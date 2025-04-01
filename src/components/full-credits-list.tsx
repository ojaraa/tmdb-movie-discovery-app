import { useGetMovieDetailsQuery } from "@/services/api/movies-api-slice";
import { useParams } from "react-router-dom";
import FullCastAndCrew from "./full-cast-and-crew";
import { API_IMG } from "@/services/models/general.model";
import { fallbackBgImage } from "@/lib/utils";
import Loader from "./shared/skeleton-loaders/loader";

const FullCreditsList = () => {
  const { movie_id } = useParams();
  const movieId = movie_id ?? "default";
  const { data: creditDetail , isLoading } = useGetMovieDetailsQuery({ movie_id: movieId });
  if (isLoading) {
    return<Loader/>
  }
  return (
    <div className="">
      <div
        className="h-[25vh] bg-no-repeat bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: `linear-gradient(rgba(18, 18, 18,0.8),rgba(18, 18, 18)),url(${
            creditDetail?.backdrop_path
              ? API_IMG + creditDetail?.backdrop_path
              : fallbackBgImage
          })`,
        }}
      >
        <h2 className=" text-center mt-12 text-[3rem] font-bold">
          {creditDetail?.original_title} - Cast & Crew
        </h2>
      </div>
      <div className="px-6 sm:mx-[8rem] grid sm:grid-cols-2 gap-10 py-10 ">
        <FullCastAndCrew
          title="Cast"
          type="cast"
          credits={creditDetail?.credits?.cast || []}
        />

        <FullCastAndCrew
          title="Crew"
          type="crew"
          credits={creditDetail?.credits?.crew || []}
        />
      </div>
    </div>
  );
};

export default FullCreditsList;
