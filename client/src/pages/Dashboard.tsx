import { useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import SelectedMovie from "../Components/SelectedMovie";
import { MainSlider } from "../Components/component-ui";
import { useMovies } from "../hooks/useMovies";
import axios from "axios";
import { motion } from "framer-motion";

export interface Show {
    _id: string;
    startTime: string;
    endTime: string;
}

export interface movieProps {
    _id: string,
    movie: string,
    movieImg: string,
    addedby: string,
    shows: Show[]
}

export default function Dashboard() {

    const aboutRef = useRef<HTMLDivElement | null>(null);
    const [select, setSelect] = useState(false);

    const movies: movieProps[] = useMovies();
    const [selectedMovie, setSelectedMovie] = useState<movieProps | null>(null);

    const [totalbooking, setTotalbooking] = useState(0);

    useEffect(() => {

        const Backend_Url = import.meta.env.VITE_BACKEND_URL;

        const token = localStorage.getItem('token');

        try {

            axios.get(`${Backend_Url}/user/total-booked-seats`, {
                headers: {
                    Authorization: token
                }
            }).then((response) => {

                setTotalbooking(response.data.totalBookedSeats);

            });

        } catch (err) {

            console.log(err);

        }

    }, []);

    return (
        <>
            {select && selectedMovie && (
                <SelectedMovie
                    movie={selectedMovie}
                    type="user"
                    setSelect={setSelect}
                />
            )}

            <div className="min-h-screen bg-black text-white overflow-hidden relative">

                {/* subtle glow */}
                <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-500/10 blur-3xl rounded-full"></div>

                {/* Navbar */}
                <Navbar aboutRef={aboutRef} />

                {/* Slider */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="px-2 sm:px-4"
                >
                    <MainSlider
                        totalbooking={totalbooking}
                        aboutRef={aboutRef}
                    />
                </motion.div>

                {/* movie section */}
                <div className="relative z-10 px-2 sm:px-4">

                    {/* heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="font-bold p-3 sm:p-4 bg-[#121214] rounded-md m-2 text-lg sm:text-xl tracking-wide">
                            MOVIES:
                        </h1>
                    </motion.div>

                    {/* cards */}
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
                        {movies.map((movie, index) => (
                            <motion.div
                                key={movie._id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05
                                }}
                                whileHover={{
                                    y: -6,
                                    scale: 1.02
                                }}
                            >
                                <Card
                                    movie={movie}
                                    type="user"
                                    onClick={() => {
                                        setSelectedMovie(movie);
                                        setSelect(true);
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}