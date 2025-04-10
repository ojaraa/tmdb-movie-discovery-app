import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export interface WatchList {
  id: number;
  name: string;
  type: string;
  poster_path: string;
  release_date: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fallbackBgImage = "/assets/bg.jpg";
export const fallbackPoster = "/assets/poster.png";

export const addToWatchList = (movie: WatchList) => {
  const storedList: WatchList[] = JSON.parse( localStorage.getItem("watchlist") || "[]");
  const movieData = {
    id: movie.id,
    title:movie.name ,
    poster_path: movie.poster_path,
    release_date: movie.release_date ,
  };

  const existingWtachList = storedList.some((item) => item?.id === movieData.id);

  if (!existingWtachList) {
    const updatedList = [...storedList, movie];
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    toast.success( `${movieData.title} has been added to your Watchlist`)
  }else{
    toast.info(`${movieData.title} is already in Watchlist`);
    console.log(`${movieData.title} is already in Watchlist`)
  }
};
