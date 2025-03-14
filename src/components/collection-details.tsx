import { fallbackBgImage, fallbackPoster } from "@/lib/utils";
import { useGetCollectionDetailsQuery } from "@/services/api/general-api-slice";
import { API_IMG } from "@/services/models/general.model";
import { Link, useParams } from "react-router-dom";

const CollectionDetails = () => {
  const { collection_id } = useParams<string>();
  const { data: collectionData } = useGetCollectionDetailsQuery({
    collection_id: collection_id as string,
  });

  return (
    <div>
      <div
        className="movie-hero-bg bg-black bg-opacity-10 bg-center bg-no-repeat bg-cover min-h-[100vh] pt-[8rem]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7),#121212), url(${
            collectionData?.backdrop_path
              ? API_IMG + collectionData.backdrop_path
              : fallbackBgImage
          })`,
        }}
      >
        <h2 className=" text-center text-[2.5rem] sm:text-[4.5rem] font-bold">
          {collectionData?.name}
        </h2>
        <div className="grid items-center gap-4 sm:gap-10 py-[4rem] sm:px-[8rem] px-6 grid-cols-2 sm:grid-cols-4">
            {collectionData?.parts?.map((movie) => (
                <Link to={`/movie/${movie.id}`}>
                <div className="relative" key={movie.id}>
                  <div className=" h-[250px] sm:h-[320px] w-full">
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
  
                
                </div>

                <div className="py-2">
                    <h4 className="text-[1.2rem] font-semibold text-center gap-x-2 flex items-center justify-center ">
                      {movie?.original_title || movie?.original_name} 
                      <span>({movie?.release_date.slice(0,4)})</span>
                    </h4>
                    
                  </div>
              </Link>
            ))}

        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
