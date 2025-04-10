import { API_IMG } from "@/services/models/general.model";
import { CollectionData } from "@/services/models/movie.model";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface CollectionProps {
  collection: CollectionData;
  tagline: string;
}

const Collection = ({ collection, tagline }: CollectionProps) => {
  return (
 
      <div
        className="h-[300px] rounded-[25px] flex items-center justify-center my-8 py-6 px  text-center flex-col"
        style={{
          background: ` linear-gradient(rgba(23, 22, 22, 0.8), rgba(6, 6, 6, 0.8)),url(${
            API_IMG + collection?.backdrop_path
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <>
          <h1 className=" text-[1.9rem] sm:text-[3.5rem] font-extrabold mb-4 ">
            {collection?.name}
          </h1>
          <p className="mb-4 italic text-[1.2rem]"> {tagline}</p>
          <Link to={`/collection/${collection?.id}`}>
            {" "}
            <Button className="rounded-[30px] py-6 px-7 text-lg my-5">
              Full Collection
            </Button>
          </Link>
        </>
      </div>
 
  );
};

export default Collection;
