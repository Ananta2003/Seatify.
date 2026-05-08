import { useState } from "react";
import Card from "./Card";
import { Button } from "./component-ui";
import type { movieProps } from "../pages/Dashboard";
import { useShow } from "../hooks/useMovies";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type SelectType = "admin" | "user"

interface Selectprops {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;
    type: SelectType
    movie: movieProps
}

export default function SelectedMovie({ setSelect, type, movie }: Selectprops) {
    const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
    const seats = useShow(selectedShowId || "");
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const navigate = useNavigate()


    const handleSeatClick = (seat: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((s) => s !== seat) // remove if already selected
                : [...prev, seat] // add if not selected
        );
    };
    console.log("SELECTED SHOW:", selectedShowId);

    async function bookSeat() {
        console.log(selectedSeats)
        try {
            const Backend_Url = import.meta.env.VITE_BACKEND_URL;
            const token = localStorage.getItem("token");

            await axios.put(
                `${Backend_Url}/user/book-seat`,
                {
                    movieId: movie._id,
                    showId: selectedShowId,
                    seat_number: selectedSeats
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            const selectedShow = movie.shows.find(
                (s) => s._id === selectedShowId
            );

            if (!selectedShow) {
                console.error("Show not found");
                return;
            }

            alert("Seats booked successfully!");
            navigate('/checkout', {
                state: {
                    movieName: movie.movie,
                    movieImg: movie.movieImg,
                    selectedSeats: selectedSeats,
                    showTime: selectedShow.startTime
                }
            })

        } catch (err) {
            console.log(err);
        }
    }

    async function deleteMovie() {
        console.log(movie._id)
        try {
            const Backend_Url = import.meta.env.VITE_BACKEND_URL;
            const token = localStorage.getItem("token");

            await axios.delete(`${Backend_Url}/admin/delete-movie`, {
                headers: {
                    Authorization: token
                },
                data: {
                    movieId: movie._id
                }
            })

            window.location.reload()
            alert("Movie deleted successfully!");
        } catch (err) {
            console.log(movie._id)
            console.log(err)
        }
    }



    return (
        <div className="fixed inset-0 z-50">

            {/* 🔲 Background overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></div>

            {/* 📦 Foreground content */}
            <div className="absolute inset-0 flex items-center justify-center ">
                {
                    type === "user" &&
                    <div className="bg-[#121214] w-full sm:w-11/12 md:w-4/5 lg:w-1/2 mx-auto p-4 sm:p-6 rounded-xl text-white shadow-xl border-dashed border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-[#92260d]">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-2">
                            <h1 className="text-xl sm:text-2xl font-bold">Movie Details</h1>

                            <Button label="Close" onClick={() => setSelect(false)} />
                        </div>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Click Seat Button to Book Seat....
                        </p>

                        {/* Main content */}
                        <div className="flex flex-col lg:flex-row gap-4 mt-3">

                            {/* Movie card */}
                            <div className="w-full lg:w-1/3">
                                <Card movie={movie} type={type} />
                            </div>

                            {/* Show + Seats */}
                            <div className="w-full lg:w-2/3">

                                {/* Shows */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {movie.shows.map((show) => (
                                        <div
                                            key={show._id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-[#1a1a1c] p-2 rounded-md"
                                        >
                                            <h1 className="px-2 sm:px-3 py-1 bg-gray-700 rounded text-xs sm:text-sm hover:bg-gray-600">
                                                {new Date(show.startTime).toLocaleTimeString()} -{" "}
                                                {new Date(show.endTime).toLocaleTimeString()}
                                            </h1>

                                            <Button
                                                onClick={() => setSelectedShowId(show._id)}
                                                label="Seats"
                                                style="animate-pulse"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Seats */}
                                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                    {selectedShowId && seats.map((seat) => {
                                        const isSelected = selectedSeats.includes(seat.seat_number);
                                        const isBooked = seat.status === "unavailable";

                                        return (
                                            <div
                                                key={seat.seat_number}
                                                onClick={() => !isBooked && handleSeatClick(seat.seat_number)}
                                                className={`p-2 rounded-md text-center text-xs sm:text-sm transition-all
                ${isBooked
                                                        ? "bg-red-500 cursor-not-allowed"
                                                        : isSelected
                                                            ? "bg-green-500 text-white"
                                                            : "bg-blue-200 text-black cursor-pointer"
                                                    }`}
                                            >
                                                {seat.seat_number}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4">
                            <h1 className="text-sm sm:text-lg font-semibold">
                                Selected Seats:{" "}
                                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                            </h1>

                            <button
                                disabled={selectedSeats.length === 0}
                                className="mt-2 w-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded disabled:opacity-50 cursor-pointer text-sm sm:text-base"
                                onClick={bookSeat}
                            >
                                Book Now
                            </button>
                        </div>

                    </div>
                }
                {type === "admin" &&
                    <div className="w-full sm:w-11/12 md:w-4/5 lg:w-1/2 mx-auto bg-black rounded-md p-4 sm:p-6 border-dashed border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-[#92260d]">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center p-2">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Edit Movie Details:
                            </h1>

                            <Button label="Close" onClick={() => setSelect(false)} />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col lg:flex-row gap-4 mt-3">

                            {/* Card */}
                            <div className="w-full lg:w-1/2">
                                <Card movie={movie} type="admin" />
                            </div>

                            {/* Details */}
                            <div className="w-full lg:w-1/2">

                                <h1 className="text-2xl sm:text-4xl font-bold p-2 sm:p-4">
                                    MOVIE
                                </h1>

                                <h1 className="p-2 sm:p-4 text-sm sm:text-base">
                                    Shows:
                                    <ul className="mt-2 list-disc list-inside text-gray-300">
                                        <li>12:00</li>
                                        <li>3:00</li>
                                    </ul>
                                </h1>

                            </div>
                        </div>

                        {/* Delete button */}
                        <div className="mt-4">
                            <Button onClick={deleteMovie} label="Delete Movie" />
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}