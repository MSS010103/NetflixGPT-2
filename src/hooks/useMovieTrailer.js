import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constans";

const useMovieTrailer=(movieId)=>{
    const dispatch = useDispatch();
    const trailerVideo=useSelector((store)=>store.movies.trailerVideo)
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);
      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer)); //instead of maintaining a state variable to update/keep track of trailer, use redux store[nice alternative]
      //console.log(trailer);
    };
    useEffect(() => {
     !trailerVideo&& getMovieVideos();
    }, []);

}
export default useMovieTrailer;