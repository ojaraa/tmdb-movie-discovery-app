import { GenreList } from "@/services/models/movie.model"


interface GenreProps{
    genreList: GenreList;

}
const GenreListComponent = ({genreList} : GenreProps) => {
    console.log(genreList)
  return (
    
    <div className="flex flex-wrap  gap-5 items-center justify-center">

    {/* {genreList?.genres.map((list) => (
      <Link to={`/genre/${list.id}`} key={list.id}>
        <Button variant={"secondary"} className="bg-[#171717] text-white py-10 px-16 rounded-[10px]">{list?.name}</Button>
      </Link>
    ))} */}
  </div>
  )
}

export default GenreListComponent