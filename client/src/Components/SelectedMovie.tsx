import {  useState } from "react";
import Card from "./Card";
import { Button} from "./component-ui";
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
                    <div className="bg-[#121214] w-1/2 p-6 rounded-xl text-white shadow-xl border-dashed border-t-15  border-b-15 border-[#92260d]">
                        <div className="flex justify-between p-2 items-center">
                            <h1 className="text-2xl font-bold">Movie Details</h1>
                            <Button label="Close" onClick={() => setSelect(false)} />

                        </div>
                        <p className="text-gray-400 mt-2">Click Seat Button to Book Seat....</p>
                        <div className="flex gap-2">
                            <Card movie={movie} type={type} />
                            <div>
                                <div className="flex gap-2 mb-2 ">
                                    {movie.shows.map((show) => (
                                        <div className="flex items-center  gap-2">
                                            <h1

                                                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                                            >
                                                {new Date(show.startTime).toLocaleTimeString()} -{" "}
                                                {new Date(show.endTime).toLocaleTimeString()}

                                            </h1>

                                            <Button key={show._id}
                                                onClick={() => setSelectedShowId(show._id)} label="Seats"  style="animate-pulse"/>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-10 gap-2  ">
                                    {selectedShowId && seats.map((seat) => {
                                        const isSelected = selectedSeats.includes(seat.seat_number);
                                        const isBooked = seat.status === "unavailable";

                                        return (
                                            <div
                                                key={seat.seat_number}
                                                onClick={() => !isBooked && handleSeatClick(seat.seat_number)}
                                                className={`p-2 rounded-md text-center transition-all
        ${isBooked ? "bg-red-500 cursor-not-allowed" :
                                                        isSelected ? "bg-green-500 text-white" :
                                                            "bg-blue-200 text-black cursor-pointer"}
      `}
                                            >
                                                {seat.seat_number}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-lg font-semibold">
                                Selected Seats:{" "}
                                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                            </h1>

                            <button
                                disabled={selectedSeats.length === 0}
                                className="mt-2 w-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
                                onClick={bookSeat}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                }
                {type === "admin" &&
                    <div className="w-1/2 bg-black rounded-md p-4 border-dashed border-t-15  border-b-15 border-[#92260d]">
                        <div className="flex justify-between p-2 items-center">
                            <h1 className="text-2xl font-bold">Edit Movie Details:</h1>
                            <Button label="Close" onClick={() => setSelect(false)} />
                        </div>

                        <div className="flex gap-2">
                            <Card movie={movie} type="admin" />
                            <div>
                                <h1 className="text-4xl p-4">MOVIE</h1>
                                <h1 className="p-4">Shows:
                                    <ul>
                                        <li>12.00</li>
                                        <li>3.00</li>
                                    </ul>
                                </h1>
                            </div>
                        </div>
                        <Button onClick={deleteMovie} label="Delete Movie" />

                    </div>
                }
            </div>
        </div>
    )
}