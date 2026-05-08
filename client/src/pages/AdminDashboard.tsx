import { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import SelectedMovie from "../Components/SelectedMovie";
import { Button } from "../Components/component-ui";
import { useAdminMovies } from "../hooks/useMovies";
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
        <div className="bg-black w-full min-h-screen text-white relative overflow-hidden">

            {/* Modals */}
            {select && selectedMovie && (
                <SelectedMovie
                    movie={selectedMovie}
                    type="admin"
                    setSelect={setSelect}
                />
            )}

            {addmovie && (
                <AddMovie setSelect={setAddmovie} />
            )}

            {/* Navbar */}
            <Navbar aboutRef={aboutRef} />

            {/* Header Section */}
            <div className="m-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#121214] p-4 rounded-md">

                <h1 className="font-bold text-lg sm:text-xl">
                    YOUR MOVIES:
                </h1>

                <Button
                    label="Add Movie"
                    onClick={() => setAddmovie(true)}
                />
            </div>

            {/* Movies Grid */}
            <div
                id="about"
                ref={aboutRef}
                className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-5 
      xl:grid-cols-6 
      gap-3 
      p-2
    "
            >
                {movies.map((movie) => (
                    <Card
                        key={movie._id}
                        movie={movie}
                        type="user"
                        onClick={() => {
                            setSelectedMovie(movie);
                            setSelect(true);
                        }}
                    />
                ))}
            </div>

        </div>
    )
}