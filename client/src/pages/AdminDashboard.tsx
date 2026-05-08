import { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import SelectedMovie from "../Components/SelectedMovie";
import { Button } from "../Components/component-ui";
import { useAdminMovies} from "../hooks/useMovies";
import AddMovie from "../Components/AddMovie";

export interface Show {
    _id: string;
    startTime: string; // API usually sends string, not Date
    endTime: string;
}

export interface movieProps {
    _id: string,
    movie: string,
    movieImg: string,
    addedby: string,
    shows: Show[]
}

export default function AdminDashboard() {
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const movies: movieProps[] = useAdminMovies()
    const [selectedMovie, setSelectedMovie] = useState<movieProps | null>(null);
    const [select, setSelect] = useState(false)
    const [addmovie, setAddmovie] = useState(false)

    return (
        <div className="bg-black w-full h-auto min-h-screen text-white">
            {select && selectedMovie &&(
                <SelectedMovie movie={selectedMovie} type="admin" setSelect={setSelect} />
            )}
            {addmovie && (
                <AddMovie setSelect={setAddmovie} />
            )}
            <Navbar aboutRef={aboutRef}/>
            <div>

            </div>
            <div className="m-2 flex justify-between items-center bg-[#121214] p-4  rounded-md">
                <h1 className=" font-bold ">YOUR MOVIES:</h1>
                <Button label="Add Movie" onClick={() => setAddmovie(true)} />
            </div>
            <div id="about" ref={aboutRef} className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-6 gap-2">
                {
                    movies.map((movie) => {
                        return (
                            <Card movie={movie} type="user" onClick={() => {
                                setSelectedMovie(movie); 
                                setSelect(true);
                            }} key={movie._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}